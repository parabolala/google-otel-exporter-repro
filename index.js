const {
  TraceExporter,
} = require("@google-cloud/opentelemetry-cloud-trace-exporter");
const { NodeTracerProvider } = require("@opentelemetry/sdk-trace-node");
const opentelemetry = require("@opentelemetry/api");
const {
  SimpleSpanProcessor,
  ConsoleSpanExporter,
} = require("@opentelemetry/sdk-trace-base");
const { Resource } = require("@opentelemetry/resources");
const {
  SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions");

const provider = new NodeTracerProvider({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: "foo",
  }),
});

provider.register();

const exporter = new TraceExporter({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});
provider.addSpanProcessor(new SimpleSpanProcessor(exporter));

const consoleExporter = new ConsoleSpanExporter();
provider.addSpanProcessor(new SimpleSpanProcessor(consoleExporter));

const tracer = opentelemetry.trace.getTracer("example-basic-tracer-node");

const parentSpan = tracer.startSpan("main");
parentSpan.end();
