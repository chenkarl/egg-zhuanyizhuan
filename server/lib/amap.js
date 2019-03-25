'use strict';

class Amap {
  constructor(app) {
    this.app = app;

    this.gaodeKey = app.config.gaodeKey;
    this.amapApiHost = app.config.amapApiHost;
    this.weatherInfoURL = app.config.weatherInfoURL;
    this.polygonURL = app.config.polygonURL;
    this.districtURL = app.config.districtURL;
  }

  async getWeatherInfo(place) {
    const url = `${this.amapApiHost}${this.weatherInfoURL}key=${this.gaodeKey}&city=${place}`;
    this.app.logger.info(url);
    const res = await this.app.curl(url, {
      method: 'GET',
      dataType: 'json',
      gzip: true,
    });
    const data = res.data;
    if (data.status !== '1') {
      this.app.logger.info(`【获取天气信息失败】${data.info}`);
    }
    return data.lives;
  }
  async getDistrict(keywords) {
    const url = `${this.amapApiHost}${this.districtURL}key=${this.gaodeKey}&keywords=${keywords}&subdistrict=1&extensions=base`;
    this.app.logger.info(url);
    const res = await this.app.curl(url, {
      method: 'GET',
      dataType: 'json',
      gzip: true,
    });
    const data = res.data;
    if (data.status !== '1') {
      this.app.logger.info(`【获取城市信息失败】${data.info}`);
    }
    return data.districts;
  }
}

module.exports = Amap;
