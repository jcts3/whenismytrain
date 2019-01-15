const stationInfo = require('./stationInfo');
const routeInfo = require('./routeInfo');
const serviceInfo = require('./serviceInfo');

const info = require('./info.json');

const prefStations = info['Preferred Stations'];
const prefStation = prefStations[1];
const destStation = prefStations[2];
const creds = info.credentials;
const apiEP = info.Endpoint;

// TESTING AREA

// exports.getStationNextTrain(prefStation, (train) => {
//   // console.log(train);
//   console.log(exports.getTrainLocationDetail(train));
// });
routeInfo.getRouteNextService(prefStation, destStation, (res) => {
  console.log(res);
});

exports = {
  creds,
  apiEP,
  stationInfo,
  routeInfo,
  serviceInfo,
};
