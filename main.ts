import { Application } from "oak/mod.ts";
import { ErrorInterceptor } from "@/middleware/mod.ts";
import router from "@/routers/mod.ts";
import config from "./config/mod.ts";
import logger from "oak_logger/mod.ts";
import session from "@/helper/session/mod.ts";

const app = new Application();
app.keys = config.keys;
app.use(
  session({
    // @ts-ignore
    // store: redisStore(config.redis),
    cookie:{
      path: '/',
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000, //one day in ms,
      signed: true,
    }
  })
)
app.addEventListener("listen", ({ hostname, port, secure }) => {
  Deno.readTextFile("./src/banner.txt").then((response: any) =>
    console.info(
      response,
      config.version,
      `Listening on: ${secure ? "https://" : "http://"}${hostname ??
        "localhost"}:${port}`,
    )
  );
});

app.use(logger.logger);
app.use(logger.responseTime);

const errorInsterceptor = new ErrorInterceptor();
app.use(router.routes());
app.use(router.allowedMethods());
app.use(errorInsterceptor.httpErrorInterceptor());

await app.listen({
  port: config.serve.port,
});
