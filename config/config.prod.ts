import { IConfigOptions } from './mod.ts'

// 先从环境变量取配置
let config: IConfigOptions = {
  version: 'v0.1.0',
  serve: {
    port: (Deno.env.get("SERVE_PORT") && parseInt(Deno.env.get("SERVE_PORT")??"8080"))||8080,
    path: Deno.env.get('SERVE_PATH') || '',
  },
  keys: ["some secret hurr"],
  session: {
    key: 'season-pace:sess',
  },
  db: {
    dialect: 'mysql',
    host: Deno.env.get('MYSQL_URL') || 'localhost',
    port: (Deno.env.get('MYSQL_PORT') && parseInt(Deno.env.get('MYSQL_PORT')??"3306")) || 3306,
    username: Deno.env.get('MYSQL_USERNAME') || 'root',
    password: Deno.env.get('MYSQL_PASSWD') || '',
    database: Deno.env.get('MYSQL_SCHEMA') || 'pace',
    pool: {
      max: 80,
      min: 0,
      idle: 20000,
      acquire: 20000,
    },
    logging: false,
  },
  redis: {
    host: Deno.env.get('REDIS_URL') || 'localhost',
    port: (Deno.env.get('REDIS_PORT') && parseInt(Deno.env.get('REDIS_PORT')??"6379")) || 6379,
    password:Deno.env.get('REDIS_PASSWORD') ||''
  },
}

export default config
