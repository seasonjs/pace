import { isHttpError, Status } from "oak/mod.ts";
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
              // handle other statuses
          }
        } else {
          // rethrow if you can't handle the error
          throw err;
        }
      }
    };
  }
}
export default ErrorInterceptor;
