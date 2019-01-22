const request = require('request');
const debug = require('debug')('routeInfo');
const info = require('./info.json');

const apiEP = info.Endpoint;
const creds = info.credentials;

/* ROUTES */
const getRoute = (origin, destination) => new Promise((resolve, reject) => {
  // const address = `https://${apiEP}json/search/${origin.CRS}/to/${destination.CRS}`;
  const address = `https://${apiEP}json/search/${origin}/to/${destination}`;
  request.get(address, (err, response, body) => {
    if (err) {
      debug(err.message);
      reject(err);
    }
    // debug(JSON.parse(body));
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
// exports.getRouteNumService = (origin, destination, num, cb) => exports.getRouteNextServices(origin, destination, num, cb);

exports.getRouteNextService = (origin, destination, cb) => {
  exports.getRouteNextServices(origin, destination, 0, cb);
};

exports.getRouteNextServiceID = (origin, destination, cb) => {
  exports.getRouteNextServices(origin, destination, 0, (service) => {
    cb(service.serviceUid);
  });
};
