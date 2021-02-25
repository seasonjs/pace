import * as log from "log/mod.ts";

// // Simple default logger out of the box. You can customize it
// // by overriding logger and handler named "default", or providing
// // additional logger configurations. You can log any data type.
// log.debug("Hello world");
// log.info(123456);
// log.warning(true);
// log.error({ foo: "bar", fizz: "bazz" });
// log.critical("500 Internal server error");

// custom configuration with 2 loggers (the default and `tasks` loggers).
await log.setup({
  handlers: {
    console: new log.handlers.ConsoleHandler("DEBUG"),

    file: new log.handlers.FileHandler("WARNING", {
      filename: "./log.txt",
      // you can change format of output message using any keys in `LogRecord`.
      formatter: "{levelName} {msg}",
    }),
  },

  loggers: {
    // configure default logger available via short-hand methods above.
    dev: {
      level: "DEBUG",
      handlers: ["console"],
    },

    production: {
      level: "DEBUG",
      handlers: ["console","file"],
    },
  },
});


// get default logger. = log.getLogger();
// logger.debug("fizz"); // logs to `console`, because `file` handler requires "WARNING" level.
// logger.warning(41256); // logs to both `console` and `file` handlers.

// get custom logger
let logger = Deno.env.get("Deno_ENV") === "production"? log.getLogger("production"):log.getLogger("dev");
// logger.debug("fizz"); // won't get output because this logger has "ERROR" level.
// logger.error({ productType: "book", value: "126.11" }); // log to `console`.

// if you try to use a logger that hasn't been configured
// you're good to go, it gets created automatically with level set to 0
// so no message is logged.
// const unknownLogger = log.getLogger("mystery");
// unknownLogger.info("foobar"); // no-op
const {debug,info,error}=logger;
export {
    debug,
    info,
    error,
};
export default logger ;
