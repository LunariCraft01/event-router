# Event Router

Event Router connects to RabbitMQ and declares the exchanges and queues used to route application events. It also exports service logs through OpenTelemetry.

## Configuration

Create a `.env` file in the `event-router` project root. Add the following environment variables and set their values for your environment:

```env
OTEL_SERVICE_NAME=<service-name>
OTEL_EXPORTER_OTLP_ENDPOINT=<otlp-collector-url>
OTEL_EXPORTER_OTLP_LOGS_ENDPOINT=<otlp-logs-endpoint-url>
CONNECTION_URI_RABITMQ=<rabbitmq-connection-uri>
```

`CONNECTION_URI_RABITMQ` must be a valid RabbitMQ connection URI, for example `amqp://<username>:<password>@<host>:5672`. Keep credentials private and do not commit your `.env` file.

## Run locally

Install dependencies and start the development server:

```bash
yarn install
yarn dev
```

To compile the TypeScript project and run the compiled application:

```bash
yarn build
yarn production
```
