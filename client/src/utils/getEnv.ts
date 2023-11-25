export const getEnvs = (key: string): string => {
  const env = process.env[key];
  if (!env) {
    console.error(`Environment variable ${key} is not defined`);
    process.exit(1);
  }
  return env;
};
