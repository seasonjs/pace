import dev from "./config.dev.ts";
import prod from "./config.prod.ts";
// export type RedisAndClusterOptions extends RedisOptions {
//   isRedisCluster?: boolean
//   nodes?: object[]
//   redisOptions?: any
// }

export type IConfigOptions = {
  version: string;
  serve: {
    port: number;
    path: any; // Context Path
  };
  keys: string[];
  session: {
    key: string;
  };
  keycenter?: string | boolean;
  db: any;
  redis: any;
  // mail: SMTPTransport,
  // mailSender: string,
};
let configObj: IConfigOptions = Deno.env.get("Deno_ENV") === "production"
  ? prod
  : dev;
export default configObj;
