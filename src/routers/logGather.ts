import router from "./mod.ts";
// 路由
router
  //hello world

  // 错误上传
  .post("/error", (context) => {
    //标签，请求的接口，页面url， log日志，时间
    // const{tag,request,url,log,time} = context.request.body;

    context.response.body = "error"
  })
  .delete("/error",(context)=>{
    //error 根据 id 删除
    // const{id} = context.request.body;
  })
  //通过时间查询
  .get("/error/:time", (context) => {
    context.response.body = "error/:time"
  });