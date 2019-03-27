'use strict';

const fs = require('fs');
const csvParse = require('csv-parse');

class Data {
  constructor(app) {
    this.app = app;
    this.list = [];
  }

  async getCityCode(city) {
    if (this.list.length === 0) {
      this.list = await this.getCityList();
    }
    for (let index = 0; index < this.list.length; index++) {
      const element = this.list[index];
      if (element[0].indexOf(city) !== -1) {
        return element[1];
      }
    }
  }

  async getCityList() {
    const path = './data/adcode_citycode.csv';
    const output = [];
    const csvStr = String(fs.readFileSync(path));
    return new Promise(resolve => {
      csvParse(csvStr, {
        trim: true,
        skip_empty_lines: true,
      })
        .on('readable', function() {
          let record;
          // eslint-disable-next-line no-cond-assign
          while (record = this.read()) {
            output.push(record);
          }
        })
        .on('end', function() {
          return resolve(output);
        });
    });
  }
}

module.exports = Data;
