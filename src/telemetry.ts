import { WinstonInstrumentation } from '@opentelemetry/instrumentation-winston';
import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-grpc';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { NestInstrumentation } from '@opentelemetry/instrumentation-nestjs-core';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import {
  BatchSpanProcessor,
  NodeTracerProvider,
} from '@opentelemetry/sdk-trace-node';
import {
  LoggerProvider,
  SimpleLogRecordProcessor,
  ConsoleLogRecordExporter,
  BatchLogRecordProcessor,
} from '@opentelemetry/sdk-logs';

import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { logs } from '@opentelemetry/api-logs';
import { diag, DiagConsoleLogger, DiagLogLevel } from '@opentelemetry/api';

import { SEMRESATTRS_SERVICE_NAME } from '@opentelemetry/semantic-conventions';
import { Resource } from '@opentelemetry/resources';

diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.ALL);

const logExporter = new OTLPLogExporter({
  url: 'http://localhost:4317',
});

const traceExporter = new OTLPTraceExporter({
  url: 'http://localhost:4317',
});

const resource = new Resource({
  [SEMRESATTRS_SERVICE_NAME]: 'api-service',
});

function telemetry() {
  const tracerProvider = new NodeTracerProvider({
    resource: resource,
  });

  tracerProvider.addSpanProcessor(new BatchSpanProcessor(traceExporter));
  tracerProvider.register();

  const loggerProvider = new LoggerProvider({
    resource: resource,
  });

  loggerProvider.addLogRecordProcessor(
    new BatchLogRecordProcessor(new ConsoleLogRecordExporter()),
  );
  logs.setGlobalLoggerProvider(loggerProvider);
  loggerProvider.addLogRecordProcessor(
    new SimpleLogRecordProcessor(logExporter),
  );

  registerInstrumentations({
    instrumentations: [
      new WinstonInstrumentation({
        enabled: true,
      }),
      new HttpInstrumentation(),
      new NestInstrumentation(),
    ],
  });
}

export default telemetry;
