const request = require('request');
const info = require('./info.json');

const prefStations = info['Preferred Stations'];
const prefStation = prefStations[1];
const destStation = prefStations[2];
const creds = info.credentials;
const apiEP = info.Endpoint;

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
// const stationPromise = (exports.getStationNextTrain(prefStation.CR));

/* ROUTES */

const getRoute = (origin, destination) => new Promise((resolve, reject) => {
  const address = `https://${apiEP}json/search/${origin.CRS}/to/${destination.CRS}`;
  request.get(address, (err, response, body) => {
    if (err) {
      console.log(err.message);
      reject(err);
    }
    console.log(JSON.parse(body));
    resolve(JSON.parse(body));
  }).auth(creds.Username, creds.Password, true);
});

exports.getRouteOnly = (origin, destination, cb) => {
  const promise = getRoute(origin, destination);
  promise.then((result) => {
    cb(result);
  });
};

exports.getRouteNextServices = (origin, destination, num = -1, cb) => {
  const promise = getRoute(origin, destination);
  promise.then((body) => {
    if (num > -1) {
      cb(body.services[num]);
    } else {
      cb(body.services);
    }
  });
};

exports.getRouteNumService = (origin, destination, num, cb) => exports.getRouteNextServices(origin, destination, num, cb);


exports.getRouteNextService = (origin, destination, cb) => {
  exports.getRouteNextServices(origin, destination, 0, cb);
};

// TESTING AREA

// exports.getStationNextTrain(prefStation, (train) => {
//   // console.log(train);
//   console.log(exports.getTrainLocationDetail(train));
// });
exports.getRouteNextService(prefStation, destStation, (res) => {
  console.log(res);
});
