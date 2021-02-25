/**!
 * koa-generic-session - lib/memory_store.js
 * Copyright(c) 2014
 * MIT Licensed
 *
 * Authors:
 *   dead_horse <dead_horse@qq.com> (http://deadhorse.me)
 */


/**
 * Module dependencies.
 */


//代码修改自：https://github.com/koajs/generic-session/blob/master/src/memory_store.js
import logger from "@/helper/logger/mod.ts";

class MemoryStore {
  private sessions: Record<string, any>;
  constructor() {
    this.sessions = {};
  }

  get(sid: string) {
    logger.debug('get value %j with key %s', this.sessions[sid], sid)
    return this.sessions[sid];
  }

  set(sid: string, val: any) {
    logger.debug('set value %j for key %s', val, sid)
    this.sessions[sid] = val;
  }

  destroy(sid: string) {
    delete this.sessions[sid];
  }
}
export default MemoryStore;