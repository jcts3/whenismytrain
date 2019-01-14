const request = require('request');
const moment = require('moment');
const info = require('./info.json');

const creds = info.credentials;
const apiEP = info.Endpoint;

const faveService = info.FaveServices[1];

exports.getDayObject = () => {
  const day = {
    year: '2019',
    month: '01',
    date: '15',
  };
  return day;
};

const getService = service => new Promise((resolve, reject) => {
  const d = exports.getDayObject();
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
