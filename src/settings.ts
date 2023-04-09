export type Settings = {
  port: number;
  isDevelopment: boolean;
  svixApiKey?: string;
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
    svixApiKey: process.env.SVIX_API_KEY
  };

  return settings;
}
