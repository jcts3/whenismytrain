const debug = require('debug')('demo');

const rtt = require('./index');

const info = require('./info.json');

const faveService = info.FaveServices[1];
const prefStations = info['Preferred Stations'];
const prefStation = prefStations[1];
const destStation = prefStations[2];

// Returns basic info on next service between 2 stations
rtt.routeInfo.getRouteNextService(prefStation, destStation, (res) => {
  // sdebug(res);
});
// Returns detailed info on next service of particular service
rtt.serviceInfo.getServiceAll(faveService, (res) => {
  // debug(res);
});
// Returns info of next train at station
rtt.stationInfo.getStationNextTrain(prefStation, (res) => {
  // debug(res);
});


// when is my train
// takes input of starterStation, enderStation, 
// (v2) uses to find out next 5 trains.
// (v2) works out quickest train/earliest arriver
// (v1) finds next train
// gets serviceId of (best) train
// use serviceId to get details
// key details: 
//     DEPT TIMES: departure time, arrival time (dept stat), delay?, delay length,
//     ARRIV TIMES: arrival time (dest stat), delay?, delay length
//     ROUTE INFO: dept platform #, origin, final destination, dest platfrom #
