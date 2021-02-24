import { Router } from "oak/mod.ts";
import config from "../../config/mod.ts";
const router = new Router({prefix: config.serve.path});
// env
router
.get("/", (context) => {
  context.response.body = "Hello world!";
})
.get('/env', (context) => {
  context.response.body = Deno.env.toObject();
})
.get('/env.Deno_ENV',(context)=>{
  context.response.body=Deno.env.get("Deno_ENV")??"undefined";
})
// fix preload
.get('/check.deno', (context) => {
  context.response.body = 'success'
})
.get('/status.pace', (context) => {
  context.response.body = 'ok'
})
.get('/test/test.status', (context) => {
  context.response.body = 'success'
})

export default router;
