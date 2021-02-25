import { isHttpError, Status } from "oak/mod.ts";
import logger from "@/helper/logger/mod.ts";
class ErrorInterceptor {
  httpErrorInterceptor() {
    return async (context: Record<string, any>, next: any) => {
      try {
        await next();
      } catch (err) {
        if (isHttpError(err)) {
          switch (err.status) {
            case Status.NotFound:
              // handle NotFound
              break;
            default:
              logger.error(err);
              throw err;
              
              // handle other statuses
          }
        } else {
          // rethrow if you can't handle the error
          logger.error(err)
          throw err;
        }
      }
    };
  }
}
export default ErrorInterceptor;
