/**!
 * koa-generic-session - lib/store.js
 * Copyright(c) 2014
 * MIT Licensed
 *
 * Authors:
 *   dead_horse <dead_horse@qq.com> (http://deadhorse.me)
 */



/**
 * Module dependencies.
 */
// import _ from "lodash/lodash.ts";
import EventEmitter from 'node/events.ts';
import logger from "@/helper/logger/mod.ts";
// const EventEmitter = require("events").EventEmitter;
// const logger.debug = require('logger.debug')('koa-generic-session:store')

const defaultOptions = {
  prefix: "oak:sess:",
};

class Store extends EventEmitter{
  private client: any;
  private options: any;
//   emit: any;
  constructor(client: any, options: any) {
    super();
    this.client = client;
    this.options = options;
    Object.assign(this.options, options, defaultOptions);
    // copy(options).and(defaultOptions).to(this.options)

    // delegate client connect / disconnect event
    if (typeof client.on === "function") {
      client.on("disconnect", this.emit.bind(this, "disconnect"));
      client.on("connect", this.emit.bind(this, "connect"));
    }
  }

  async get(sid: any) {
    sid = this.options.prefix + sid;
    logger.debug("GET %s", sid);
    const data = await this.client.get(sid);
    if (!data) {
      logger.debug("GET empty");
      return null;
    }
    if (data && data.cookie && typeof data.cookie.expires === "string") {
      // make sure data.cookie.expires is a Date
      data.cookie.expires = new Date(data.cookie.expires);
    }
    logger.debug("GOT %j", data);
    return data;
  }

  async set(sid: any, sess: { cookie: any; }) {
    let ttl = this.options.ttl;
    if (!ttl) {
      const maxAge = sess.cookie && sess.cookie.maxAge;
      if (typeof maxAge === "number") {
        ttl = maxAge;
      }
      // if has cookie.expires, ignore cookie.maxAge
      if (sess.cookie && sess.cookie.expires) {
        ttl = Math.ceil(sess.cookie.expires.getTime() - Date.now());
      }
    }

    sid = this.options.prefix + sid;
    logger.debug("SET key: %s, value: %s, ttl: %d", sid, sess, ttl);
    await this.client.set(sid, sess, ttl);
    logger.debug("SET complete");
  }

  async destroy(sid: any) {
    sid = this.options.prefix + sid;
    logger.debug("DEL %s", sid);
    await this.client.destroy(sid);
    logger.debug("DEL %s complete", sid);
  }
}

export default Store;
