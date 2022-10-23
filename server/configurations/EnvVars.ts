/* eslint-disable node/no-process-env */
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  nodeEnv: (process.env.NODE_ENV ?? ''),
  port: (process.env.PORT ?? 0),
  jwt: {
    secret: (process.env.JWT_SECRET ??  ''),
    exp: (process.env.COOKIE_EXP ?? ''), // exp at the same time as the cookie
  },
} as const;


/** howdy */