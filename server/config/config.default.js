'use strict';

module.exports = appInfo => {
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1536859564199_3953';

  // add your config here
  config.middleware = [];

  config.security = {
    csrf: {
      ignoreJSON: false,
    },
  };

  config.cluster = {
    listen: {
      port: 7001,
      hostname: 'localhost',
    },
  };

  config.proxy = true;

  config.mysql = {
    client: {
      host: '127.0.0.1',
      port: '3306',
      user: 'admin',
      password: 'B6VtQSRl', // admin用户的初始密码请到云服务详情页的“数据库”标签页查看
      database: 'sample',
    },
    app: true,
    agent: false,
  };

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/sample',
      options: {
        user: 'admin',
        pass: 'B6VtQSRl', // admin用户的初始密码请到云服务详情页的“数据库”标签页查看
        useNewUrlParser: true,
      },
    },
  };

  // GaodeKey 高德用户Key
  config.gaodeKey = '3359a3c371657d9589299e3c35a37dbd';
  // 高德ApiHost
  config.amapApiHost = 'https://restapi.amap.com';
  // 获取天气信息
  config.weatherInfoURL = '/v3/weather/weatherInfo?';
  // 获取区域内城市列表
  config.polygonURL = '/v3/place/polygon?';
  // 获取某个城市信息
  config.districtURL = '/v3/config/district?';
  return config;
};
