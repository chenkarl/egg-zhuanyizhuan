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

  /**
   * @description 获取天气信息
   * @param {String} place 地点code
   *  @return {*} 天气信息
   */
  async getWeatherInfo(place) {
    const url = `${this.amapApiHost}${this.weatherInfoURL}key=${this.gaodeKey}&city=${encodeURI(place)}`;
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

  /**
   * @description 获取地点信息
   * @param {String} keywords 地点关键词
   * @return {*} 行政区划
   */
  async getDistrict(keywords) {
    const url = `${this.amapApiHost}${this.districtURL}key=${this.gaodeKey}&keywords=${encodeURI(keywords)}&subdistrict=1&extensions=base`;
    this.app.logger.info(url);
    const res = await this.app.curl(url, {
      method: 'GET',
      dataType: 'json',
    });
    const data = res.data;
    if (data.status !== '1') {
      this.app.logger.info(`【获取城市信息失败】${data.info}`);
    }
    return data.districts;
  }

  /**
   * @description 获取区域内城市
   * @param {String} polygon 经纬度
   * @return {*} 返回
   */
  async getPolygon(polygon) {
    const url = `${this.amapApiHost}${this.polygonURL}key=${this.gaodeKey}&polygon=${encodeURI(polygon)}&types=190103|190104&extensions=base`;
    this.app.logger.info(url);
    const res = await this.app.curl(url, {
      method: 'GET',
      dataType: 'json',
    });
    const data = res.data;
    if (data.status !== '1') {
      this.app.logger.info(`【获取区域内城市】${data.info}`);
    }
    return data.pois;
  }

  /**
   * 获取区域经纬度
   * @param {float} lon 经度
   * @param {float} lat 纬度
   * @param {float} dis 距离
   * @return {*} 返回
   */
  getLocation(lon, lat, dis) {
    const EELon = String(lon + dis / 100);
    const EELat = String(lat);
    const EE = EELon + ',' + EELat;
    const ESLon = String(lon + dis / 200);
    const ESLat = String(lat - dis / 115.6);
    const ES = ESLon + ',' + ESLat;
    const WSLon = String(lon - dis / 200);
    const WSLat = String(lat - dis / 115.6);
    const WS = WSLon + ',' + WSLat;
    const WWLon = String(lon - dis / 100);
    const WWLat = String(lat);
    const WW = WWLon + ',' + WWLat;
    const ENLon = String(lon + dis / 200);
    const ENLat = String(lat + dis / 115.6);
    const EN = ENLon + ',' + ENLat;
    const WNLon = String(lon - dis / 200);
    const WNLat = String(lat + dis / 115.6);
    const WN = WNLon + ',' + WNLat;

    return EE + '|' + ES + '|' + WS + '|' + WW + '|' + WN + '|' + EN;
  }
}

module.exports = Amap;
