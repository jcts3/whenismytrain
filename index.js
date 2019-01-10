const url = require('url');
const request = require('request');
const info = require('./info.json');

const prefStations = info['Preferred Stations'];

const prefStation = prefStations[0];

const creds = info.credentials;


const apiEP = info.Endpoint;

exports.getStation = (station) => {
  const address = `https://${apiEP}/json/search/${station.CRS}`;
  request.get(address, (err, response, body) => {
    if (err) {
      console.log(err.message);
    }
    body = JSON.parse(body);
    console.log(body);
    return JSON.parse(body);
    // Gets here too late - need to promisify!!!
  }).auth(creds.Username, creds.Password, true);
};

exports.getStationInfo = station => exports.getStation(station).location;

exports.getStationNextTrains = station => exports.getStation(station).services;

exports.getStationTrainNum = (station, num) => exports.getStationNextTrains(station)[num];

exports.getStationNextTrain = station => exports.getStationTrainNum(station, 0);


console.log(a);
// module.exports = {
//   getStation: getStation(),
// };
