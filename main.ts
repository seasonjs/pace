import { Application } from "oak/mod.ts";
import { ErrorInterceptor } from "@/middleware/mod.ts";
import router from "@/routers/mod.ts";
import config from "./config/mod.ts";
// import logger from "oak_logger/mod.ts";
import session from "@/helper/session/mod.ts";
import logger from "@/helper/logger/mod.ts";

const app = new Application();
logger.debug("pace logger start working...")
app.keys = config.keys;
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
const errorInsterceptor = new ErrorInterceptor();
app.use(errorInsterceptor.httpErrorInterceptor());
app.use(
  session({
    // store: redisStore(config.redis),
    cookie:{
      path: '/',
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000, //one day in ms,
      signed: true,
    }
  })
)
// app.use(logger.logger);
// app.use(logger.responseTime);


app.use(router.routes());
app.use(router.allowedMethods());


await app.listen({
  port: config.serve.port,
});
