# Merchant Transactions Service

Simple service that exposes CRUD endpoints for both merchants and thier transactions. Sending daily mailes to merchants containing details about thier daily transactions.

# Service Structure

Simple NestJS application containing two major modules Merchants and transactions. Endpoints are swagger ducomented. Using `class-validator` for validation. Integration with MongoDB using `mongoose`.

# Online Demo

[Merchant Transactions](https://omarelmassri.github.io/companies-portal/)

Service hosted on heroku. Database hosted on MongoDB Atlas. It may gives you at first error fetching or some delay because the heroku dyno on heroku sleeps after some time because it's free and this delay because it starting.

# Usage

## Using Docker

first you need to build the docker file

```bash
docker build -t merchant-payments:latest .
```

then run the images (in detached mode)

```bash
docker-compose up -d
```

## Normal Run

first install the dependencies

```bash
npm install
```

run the app locally in develop mode (watch-mode)

```bash
npm run start:dev
```
