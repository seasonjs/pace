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

// const debug = require('debug')('koa-generic-session:memory_store')
//代码修改自：https://github.com/koajs/generic-session/blob/master/src/memory_store.js
class MemoryStore {
  private sessions: Record<string, any>;
  constructor() {
    this.sessions = {};
  }

  get(sid: string) {
    // debug('get value %j with key %s', this.sessions[sid], sid)
    return this.sessions[sid];
  }

  set(sid: string, val: any) {
    // debug('set value %j for key %s', val, sid)
    this.sessions[sid] = val;
  }

  destroy(sid: string) {
    delete this.sessions[sid];
  }
}
export default MemoryStore;