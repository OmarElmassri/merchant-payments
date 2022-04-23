import { customAlphabet } from 'nanoid';
const usedCharacters = '0123456789';

export function generateCode(prefix: string): string {
  const nanoid = customAlphabet(usedCharacters, 8);
  return `${prefix}_${nanoid()}`;
}