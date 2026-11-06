import { IExchangeConfig } from "../interfaces/IExchangeConfig.js";

export const exchanges: IExchangeConfig[] = [
   {
    exchange: 'dlx',
    type: 'direct',
    arguments:{
      durable:true
    },
    queues:[
      {
        name: 'dlq-retry',
        routingKey: 'dlq.retry',
        arguments:{
          durrable:true
        }
      }]
  },
  {
    exchange: 'nodemailer',
    type: 'direct',
    arguments: {
      durable:true,
      alternateExchange: 'dlx'
    },
    queues: [
      {
        name: 'register-queue',
        routingKey: 'mail.confirmation',
        arguments:{
          durable: true,
          deadLetterExchange:'dlx',
          deadLetterRoutingKey:'dlq.retry'
        }
      },
      {
        name: 'restore-password-queue',
        routingKey: 'mail.restore-password',
        arguments:{
          durable: true,
          deadLetterExchange:'dlx',
          deadLetterRoutingKey:'dlq.retry'
        }
      }]
  }
];
