import { IQueueConfig } from "./IQueueConfig.js";

export interface IExchangeConfig {
    exchange: string;
    type: 'direct' | 'fanout' | 'topic' | 'headers';
    arguments?: Record<string, any>;
    queues: IQueueConfig[];
}