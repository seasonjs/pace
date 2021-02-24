import type { IConfigOptions } from './mod.ts'

const config: IConfigOptions = {
  version: 'v0.1.0',
  serve: {
    port: (Deno.env.get("SERVE_PORT") && parseInt(Deno.env.get("SERVE_PORT")??"8080")) || 8080,
    path: Deno.env.get('SERVE_PATH') ||'',
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
      max: 10,
      min: 0,
      idle: 10000,
    },
    logging: false,
    dialectOptions: {
      connectTimeout: 20000
    }
  },
  redis: {},
}

export default config
