
import dotenv from 'dotenv';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as rabbit from 'amqplib';
import { LoggerUtils } from '../utils/logger/logger.utils.js';
import { InternalServiceMessage } from '../utils/messages/InternalService.enum.js';
import type { IExchangeConfig } from '../interfaces/IExchangeConfig.js';

const envPath = resolve(dirname(fileURLToPath(import.meta.url)), '../../.env');
const envConfig = dotenv.config({ path: envPath });

const connectString = process.env.CONNECTION_URI_RABITMQ || envConfig.parsed?.CONNECTION_URI_RABITMQ;
let connection: rabbit.ChannelModel | null = null;
let channel: rabbit.Channel | null = null;

const rabbitMQService = {
    service: 'RabbitMQ',
    status: 'Service is unavailable. The RabbitMQ connection or its channel may be closed or not yet established.'
};

/**
 * Initialize RabbitMQ connection and channel
 */
async function CreateRabbitMQConnection(): Promise<boolean> {
   try{
    if (connectString) {
        connection = await rabbit.connect(connectString);
        channel = await connection.createChannel();
        return true;
    }else{
        LoggerUtils.ShowError(`${InternalServiceMessage.RabbitMQModuleTitle}: ${InternalServiceMessage.RabbitMQErrorDefinedString}`,rabbitMQService);
        return false;
    } 
   }catch(err:unknown){
        LoggerUtils.generateException(`${InternalServiceMessage.RabbitMQCreateChannelError} ${String(err)}`,rabbitMQService);
        return false;
   }
}

/**
 * init RabbitMQ connection and channel and log the result
 * Establish RabbitMQ connection
 */
export async function initRabbitMQConnection(): Promise<boolean> {
    const connected = await CreateRabbitMQConnection();
          connected ? LoggerUtils.ShowInfo(InternalServiceMessage.RabbitMQConnectionSuccess)
                    : LoggerUtils.ShowError(InternalServiceMessage.RabbitMQConnectionError, rabbitMQService);
    return connected;
}

/**
 * @param config -- Exchange configuration object with exchange name, type, arguments, and queues
 */
export async function CreateExchange(config: IExchangeConfig[]): Promise<void> {
    try {
      if (Array.isArray(config) && channel){

        await Promise.all(config.map(async ({ exchange, type, arguments: args, queues }) => {
            await channel!.assertExchange(exchange, type, args);
            await Promise.all(queues.map(async (queue) => {
                await channel!.assertQueue(queue.name, queue.arguments);
                await channel!.bindQueue(queue.name, exchange, queue.routingKey);
            }));
        }));
      }else{
        LoggerUtils.ShowError(`${InternalServiceMessage.RabbitMQEmptyArguments}`);
      }
    } catch (err: unknown) {
        LoggerUtils.generateException(`${InternalServiceMessage.RabbitMQException} ${String(err)}`,rabbitMQService);
    }
}
