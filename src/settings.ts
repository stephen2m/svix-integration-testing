import * as process from "process";

export type Settings = {
  port: number;
  isDevelopment: boolean;
  svixApiKey?: string;
  svixOpsWebhookSecret?: string;
  logTailToken?: string;
  metricsEndpoint?: string;
};

let settings: Settings | null = null;

export function getSettings(): Settings {
  if (settings !== null) {
    return settings;
  }
  const port = Number(process.env.PORT) ?? 3000;

  settings = {
    port,
    isDevelopment: !!process.env.DEVELOPMENT,
    svixApiKey: process.env.SVIX_API_KEY,
    svixOpsWebhookSecret: process.env.SVIX_OPS_WEBHOOKS_SECRET,
    logTailToken: process.env.LOGTAIL_TOKEN,
    metricsEndpoint: process.env.METRICS_ENDPOINT,
  };

  return settings;
}
