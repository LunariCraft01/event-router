export interface IQueueConfig {
    name: string;
    routingKey: string;
    arguments?: Record<string, any>;
}