import { SeverityNumber, type LogAttributes } from '@opentelemetry/api-logs';
//import {trace, context, propagation} from '@opentelemetry/api';
import { loggerProvider } from '../../modules/logger.modules.js';

export namespace LoggerUtils{
 const loggerObject = loggerProvider.getLogger(process.env.OTEL_SERVICE_NAME 
                                              || 'not_defined_name_of_service');

 export function logger(severityNumber: SeverityNumber, severityText: string, 
                 body: string, attributes?: LogAttributes): void {
  loggerObject.emit({ severityNumber, severityText, body, ...(attributes ? { attributes } : {})});
 }

 export function DebugInfo(message: string): void {
    logger(SeverityNumber.DEBUG, 'DEBUG', message);
 }

 export function ShowInfo(message: string): void {
    logger(SeverityNumber.INFO, 'INFO', message);
 }

 function showWarnInfo(message: string): void {
    logger(SeverityNumber.WARN, 'WARN', message);
 }

 export function ShowError(message: string,attributes:LogAttributes={}): void {
    logger(SeverityNumber.ERROR, 'ERROR', message,attributes);
 }

 export function showFatalError(message: string): void {
    logger(SeverityNumber.FATAL, 'EXCEPTION', message);
 }

 export function generateException(message: string, attributes:LogAttributes = {}): void {
      logger(SeverityNumber.FATAL, 'EXCEPTION', message, attributes);
    }
}