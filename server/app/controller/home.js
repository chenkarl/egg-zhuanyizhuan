'use strict';

const Controller = require('egg').Controller;
const Amap = require('../../lib/amap');

class HomeController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.amap = new Amap(this.app);
  }
  async index() {
    this.ctx.body = 'hi, egg';
    const place = this.ctx.query.place;
    const info = await this.amap.getDistrict(place);
    this.app.logger.info(info);
  }
}

module.exports = HomeController;
