# Backend APIs

## Database
- Its a mysql database
- take database dump and import

## Prepare the property file or environment

```sh
URL=https://www.sipnscreen.com
NODE_ENV=production
DATABASE_CLIENT=mysql

DATABASE_HOST=
DATABASE_PORT=3306
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_NAME=sipnscreen

ADMIN_JWT_SECRET=
API_TOKEN_SALT=
TRANSFER_TOKEN_SALT=
APP_KEYS=
JWT_SECRET=

EMAIL_DEFAULT_FROM=admin@sipnscreen.com
EMAIL_REPLY_TO=admin@sipnscreen.com

AWS_SES_KEY=
AWS_SES_SECRET=
AWS_REGION=us-east-1

ADMIN_EMAIL=admin@sipnscreen.com

RAZORPAY_SECRET=
RAZORPAY_KEY_ID=
RZ_WEBHOOK_SECRET=
WHATSAPP_TOKEN=abc

```

## Steps to run
```sh
export NODE_ENV=production
npm install --only=production
npm run build
npm run start
```

## Important
When you run it, make sure it is accessible on `https://www.sipnscreen.com/gapi`, so that UI project can talk to this.

