const request = require('request');
const {
  apiEP,
  creds,
} = require('./index');

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