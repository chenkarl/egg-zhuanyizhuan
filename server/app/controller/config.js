'use strict';

const Controller = require('egg').Controller;
const Amap = require('../../lib/amap');
const Data = require('../../lib/data');
class ConfigController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.amap = new Amap(this.app);
    this.data = new Data(this.app);
  }
  async district() {
    const place = this.ctx.query.place;
    const distance = this.ctx.query.distance;
    const info = await this.amap.getDistrict(place);
    const center = info[0].center.split(',');
    const location = this.amap.getLocation(parseFloat(center[0]), parseFloat(center[1]), parseFloat(distance));
    const citys = await this.amap.getPolygon(location);
    const data = [];
    for (let index = 0; index < citys.length; index++) {
      const code = await this.data.getCityCode(citys[index].name);
      const weatherInfo = await this.amap.getWeatherInfo(code);
      data.push(weatherInfo);
    }
    this.ctx.body = {
      code: 0,
      data,
    };
  }
}

module.exports = ConfigController;
