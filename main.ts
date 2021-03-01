import { Application, helpers } from "oak/mod.ts";
import { ErrorInterceptor } from "@/middleware/mod.ts";
import router from "@/routers/mod.ts";
import config from "./config/mod.ts";
// import logger from "oak_logger/mod.ts";
import session from "@/helper/session/mod.ts";
import logger from "@/helper/logger/mod.ts";

const app = new Application();
logger.debug("pace logger start working...");
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
    cookie: {
      path: "/",
      httpOnly: false,
      maxAge: 24 * 60 * 60 * 1000, //one day in ms,
      signed: true,
    },
  }),
);
app.use(async (ctx: Record<string, any>, next) => {
  await next();
  if (
    typeof ctx.request.body === "object" &&
    ctx.request.body()?.data !== undefined
  ) {
    ctx.response.type = "json";
    ctx.response.body = JSON.stringify(ctx.response.body, undefined, 2);
  }
});
//增加query对象
app.use(async (ctx, next) => {
  const query = helpers.getQuery(ctx, { mergeParams: true });
  Object.defineProperties(ctx.request, {
    "query": {
      value: query,
      writable: false,
    },
  });
  Object.defineProperties(ctx,{
    "query":{
      value: query,
      writable: false,
    }
  })
  await next();
});
//jsonp
app.use(async (ctx: Record<string, any>, next) => {
  logger.debug(`当前ctx为${JSON.stringify(ctx.request)}`);
  await next();
  logger.debug(`当前ctx为${JSON.stringify(ctx.request)}`);
  if (ctx.request.query?.callback) {
    let body = typeof ctx.response.body === "object"
      ? JSON.stringify(ctx.body, undefined, 2)
      : ctx.response.body;
    ctx.response.body = ctx.request.query.callback + "(" + body + ")";
    ctx.response.type = "application/x-javascript";
  }
});

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({
  port: config.serve.port,
});
