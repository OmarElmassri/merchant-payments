import { SchedulerRegistry, Cron } from '@nestjs/schedule';
import { ConfigService } from '@nestjs/config';
import { TransactionService } from './../transaction/transaction.service';
import { TransactionDocument } from './../transaction/transaction.schema';
import { TransactionDto } from './../DTOs/transaction.dto';
import { MerchantDto } from './../DTOs/merchant.dto';
import { MerchantsPaginationDto } from './../DTOs/merchants-pagination.dto';
import { MerchantDocument } from './merchant.schema';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { generateCode } from 'src/utils/helperFunctions';
import Mail from 'nodemailer/lib/mailer';
import { createTransport } from 'nodemailer';

@Injectable()
export class MerchantService {
  private nodemailerTransport: Mail;

  constructor(
    private readonly configService: ConfigService,
    private readonly schedulerRegistry: SchedulerRegistry,
    @InjectModel('Merchant') private merchantModel: Model<MerchantDocument>,
    @InjectModel('Transaction') private transactionModel: Model<TransactionDocument>,
    private transactionService: TransactionService) {
    this.nodemailerTransport = createTransport({
      service: this.configService.get('EMAIL_SERVICE'),
      auth: {
        type: 'OAuth2',
        user: this.configService.get('EMAIL_USER'),
        clientId: this.configService.get('EMAIL_CLIENT_ID'),
        clientSecret: this.configService.get('EMAIL_CLIENT_SECRET'),
      }
    });
  }

  // List Merchants
  async listMerchants(keyword: string): Promise<MerchantsPaginationDto> {
    try {
      // Get merchants
      const merchants: MerchantDto[] = await this.merchantModel.find({ name: new RegExp(keyword, "i") });

      return {
        count: merchants.length,
        data: merchants
      };
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Get Merchant
  async getMerchant(merchantCode: string): Promise<MerchantDto> {
    try {
      // Find merchant
      return await this.merchantModel.findOne({ code: merchantCode });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Create Merchant
  async createMerchant(merchantObject: MerchantDto): Promise<MerchantDto> {
    try {
      // Validate merchant
      merchantObject = await this.validateMerchantModel(merchantObject, false);

      // Check merchant email uniqueness
      let isMerchantExists = await this.merchantModel.findOne({ email: merchantObject.email });
      if (isMerchantExists) throw new HttpException('Merchant already exists, change merchant email', HttpStatus.BAD_REQUEST);

      // Destruct merchant data
      const { email, name } = merchantObject;

      // Create merchant instance
      const merchantInstance: MerchantDocument = new this.merchantModel({ code: generateCode('MR'), name, email });


      // Created merchant
      const createdMerchant: MerchantDto = await merchantInstance.save();

      // Schedule transaction email
      // await this.scheduleEmail(createdMerchant.code);

      return createdMerchant;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Update Merchant
  async updateMerchant(merchantCode: string, merchantObject: Partial<MerchantDto>): Promise<MerchantDto> {
    try {
      // Validate merchant
      merchantObject = await this.validateMerchantModel(merchantObject, true);

      // Check merchant email uniqueness
      let isMerchantExists = await this.merchantModel.findOne({ email: merchantObject.email });
      if (isMerchantExists && isMerchantExists.code !== merchantCode) throw new HttpException('Merchant already exists, change merchant email', HttpStatus.BAD_REQUEST);

      // Destruct merchant data
      const { email, name } = merchantObject;

      // Update merchant data
      return await this.merchantModel.findOneAndUpdate({ code: merchantCode }, { name, email }, { new: true });
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Delete Merchant
  async deleteMerchant(merchantCode: string): Promise<MerchantDto> {
    try {
      // Get merchant and delete it
      const merchant: MerchantDto = await this.merchantModel.findOneAndDelete({ code: merchantCode });

      // Find merchant transactions
      const merchantTransactions: TransactionDto[] = await this.transactionModel.find({ merchantId: merchant._id });

      // Delete transactions
      for (let i = 0; i < merchantTransactions.length; i++) {
        await this.transactionService.deleteTransaction(merchantTransactions[i].code)
      }

      return merchant
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Validate merchant model
  async validateMerchantModel(merchantObject: MerchantDto | Partial<MerchantDto>, skipMissingProperties: boolean): Promise<MerchantDto> {
    // Convert object to dto class
    merchantObject = plainToClass(MerchantDto, merchantObject);

    // Validate company
    await validateOrReject(merchantObject, {
      skipMissingProperties
    });

    return merchantObject as MerchantDto;
  }

  // Schedule email
  // @Cron('* * 22 * * *') // this will be run everyday at 11 PM if enabled to send mails
  async scheduleEmail() {
    // Email content
    let emailContent: string = '';

    // Get merchants
    const merchants: MerchantDto[] = await this.merchantModel.find();

    // Maps to emalinig merchants
    for (let i = 0; i < merchants.length; i++) {
      const merchant: MerchantDto = merchants[i];

      // Get merchant transactions
      const transactions: TransactionDto[] = await this.transactionModel.find({ merchantId: merchant._id });

      // Add transactions content
      transactions.forEach(({ amount, currency, operation }: TransactionDto) => {
        emailContent = `${emailContent} ${amount} ${currency} - ${operation}\n`;
      })

      // Schedule transaction email
      this.sendMail({
        to: merchant.email,
        subject: 'Transactions',
        text: emailContent
      })
    }
  }

  // Send email
  sendMail(options: Mail.Options) {
    return this.nodemailerTransport.sendMail(options);
  }
}
