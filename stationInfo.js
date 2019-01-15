const request = require('request');
const info = require('./info.json');

const apiEP = info.Endpoint;
const creds = info.credentials;

const getStation = station => new Promise((resolve, reject) => {
  const address = `https://${apiEP}/json/search/${station.CRS}`;
  request.get(address, (err, response, body) => {
    if (err) {
      console.log(err.message);
      reject(err);
    }
    // console.log(JSON.parse(body));
    resolve(JSON.parse(body));
    // Gets here too late - need to promisify!!!
  }).auth(creds.Username, creds.Password, true);
});

exports.getStationOnly = (station, cb) => {
  const promise = getStation(station);
  promise.then((body) => {
    cb(body);
  });
};

exports.getStationInfo = (station, cb) => {
  const promise = getStation(station);
  promise.then((body) => {
    cb(body.location);
  });
};

exports.getStationNextTrains = (station, num = -1, cb) => {
  const promise = getStation(station);
  promise.then((body) => {
    if (num > -1) {
      cb(body.services[num]);
    } else {
      cb(body.services);
    }
  });
};

exports.getStationTrainNum = (station, num, cb) => exports.getStationNextTrains(station, num, cb);
exports.getStationNextTrain = (station, cb) => exports.getStationNextTrains(station, 0, cb);
exports.getTrainLocationDetail = train => train.locationDetail;