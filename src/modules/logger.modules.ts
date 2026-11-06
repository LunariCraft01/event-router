import { LoggerProvider, BatchLogRecordProcessor } from "@opentelemetry/sdk-logs";
import dotenv from "dotenv";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const envPath = resolve(dirname(fileURLToPath(import.meta.url)), '../../.env');
dotenv.config({ path: envPath });

const resource = resourceFromAttributes({
  [ATTR_SERVICE_NAME]: String(process.env.OTEL_SERVICE_NAME),
});

const logExporter = new OTLPLogExporter({
  url: String(process.env.OTEL_EXPORTER_OTLP_LOGS_ENDPOINT),
});
 

export const loggerProvider = new LoggerProvider({ resource, processors: [new BatchLogRecordProcessor({exporter: logExporter})],  
});
 
