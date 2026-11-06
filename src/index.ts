import { LoggerUtils } from './utils/logger/logger.utils.js';
import { CreateExchange, initRabbitMQConnection } from './modules/rabbitmq.modules.js';
import { exchanges } from './schema/schema.js';
import { InternalServiceMessage } from './utils/messages/InternalService.enum.js';


try {
  if (await initRabbitMQConnection()) {
      LoggerUtils.ShowInfo(InternalServiceMessage.EventRouteServiceStarted);
      await CreateExchange(exchanges);
  }
} catch (err: unknown) {
      LoggerUtils.generateException(`${InternalServiceMessage.RabbitMQException, err}`);
}
