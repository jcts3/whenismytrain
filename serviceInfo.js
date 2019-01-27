const request = require('request');
const moment = require('moment');
const debug = require('debug')('serviceInfo');
const info = require('./info.json');

const creds = info.credentials;
const apiEP = info.Endpoint;

const faveService = info.FaveServices[1];

// exports.getDayObject = (date, month, year) => {
//   if (parseInt(date, 10) < 10) date = `0${parseInt(day, 10)}`;
//   if (parseInt(month, 10) < 10) month = `0${parseInt(month, 10)}`;
//   const dayObj = {
//     date,
//     month,
//     year,
//   }
//   return dayObj;
// };

exports.getTodayObject = () => exports.getDayObject(Date.now());

exports.getDayObject = date => moment(date).format('YYYY/MM/DD');

const getService = (service, date = Date.now()) => new Promise((resolve, reject) => {
  const d = exports.getDayObject(date);
  const address = `https://${apiEP}/json/service/${service.serviceUid}/${d}`;
  request.get(address, (err, response, textBody) => {
    if (err) {
      debug(err.message);
      reject(err);
    }
    const body = JSON.parse(textBody);
    // debug(JSON.parse(body));
    if (body.error) {
      debug(body.error);
      if (body.error === 'No schedule found') {
        // getService(service, date.setTime(date.getTime() + 1 * 86400000));
        resolve(getService(service, date + 1 * 86400000));
      } else {
        reject(body.error);
      }
    } else {
      resolve(body);
    }
  }).auth(creds.Username, creds.Password, true);
});

exports.getServiceAll = (service, cb) => {
  const promise = getService(service);
  promise.then((body) => {
    cb(body);
  });
};
