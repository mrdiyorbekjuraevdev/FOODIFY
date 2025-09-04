import { keys as core } from '@foodify/next-config/keys'; 
import { createEnv } from '@t3-oss/env-nextjs';

export const env = createEnv({
  extends: [
    core(),
    core(),
  ],
  server: {},
  client: {},
  runtimeEnv: {},
});
