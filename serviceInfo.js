const request = require('request');
const moment = require('moment');
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

const getService = service => new Promise((resolve, reject) => {
  const d = exports.getDayObject(Date.now());
  const address = `https://${apiEP}/json/service/${service.SUID}/${d.year}/${d.month}/${d.date}`;
  request.get(address, (err, response, body) => {
    if (err) {
      console.log(err.message);
      reject(err);
    }
    // console.log(JSON.parse(body));
    resolve(JSON.parse(body));
  }).auth(creds.Username, creds.Password, true);
});

exports.getServiceAll = (service, cb) => {
  const promise = getService(service);
  promise.then((body) => {
    cb(body);
  });
};

exports.getServiceAll(faveService, (res) => {
  console.log(res);
  res;
});