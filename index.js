const info = require('./info.json');

const prefStations = info['Preferred Stations'];
const prefStation = prefStations[1];
const destStation = prefStations[2];
const creds = info.credentials;
exports.creds = creds;
const apiEP = info.Endpoint;
exports.apiEP = apiEP;

const stationInfo = require('./stationInfo');
const routeInfo = require('./routeInfo');
// TESTING AREA

// exports.getStationNextTrain(prefStation, (train) => {
//   // console.log(train);
//   console.log(exports.getTrainLocationDetail(train));
// });
routeInfo.getRouteNextService(prefStation, destStation, (res) => {
  console.log(res);
});

exports = {
  stationInfo,
  routeInfo
};
