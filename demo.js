const rtt = require('./index');

const info = require('./info.json');

const faveService = info.FaveServices[1];
const prefStations = info['Preferred Stations'];
const prefStation = prefStations[1];
const destStation = prefStations[2];

rtt.routeInfo.getRouteNextService(prefStation, destStation, (res) => {
  console.log(res);
});