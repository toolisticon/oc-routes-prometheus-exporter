const CronJob = require('cron').CronJob;
const http = require('http');
const request = require('request-promise-native');
const sslChecker = require('ssl-checker');
const log = require('./lib/logger');
const routes = require('./lib/routes');
const prometheus = require('./lib/prometheus');

const baseUrl = 'https://http-observatory.security.mozilla.org/api/v1/analyze';

let hosts = [];

async function triggerScan (hostname) {
  const options = {
    method: 'POST',
    uri: `${baseUrl}?host=${hostname}&rescan=true&hidden=true`
  };

  log.info(`Triggering scan for ${hostname}`);
  request(options);
}

async function receiveScanResult (hostname) {
  const options = {
    method: 'GET',
    uri: `${baseUrl}?host=${hostname}`,
    json: true
  };

  const response = await request(options);
  response.url = hostname;
  response.quantile = response.score;
  prometheus.addMozillaMetric(response);
  // add cert metric
  sslChecker(hostname).then((result) => {
    result.url = hostname;
    result.status = 200;
    result.quantile = result.status;
    prometheus.addExpireMetric(result);
  }).catch((err) => {
    const result = {
      url: hostname,
      valid: false
    };
    if (err.code === 'ENOTFOUND') {
      result.status = 404;
      result.quantile = result.status;
      prometheus.addExpireMetric(result);
    } else {
      result.status = 400;
      result.quantile = result.status;
      prometheus.addExpireMetric(result);
    }
  });
}

async function triggerUpdate (hostname) {
  log.info('Start reading route information.');
  // read routes
  routes.list().then(routes => {
    // reset hosts
    hosts = [];
    log.info('Start triggering scan.');
    // reread hosts from route info
    routes.forEach((route) => {
      const hostname = route.spec.host;
      hosts.push(hostname);
      log.info(`Triggering scan for ${hostname}`);
      triggerScan(hostname);

      // defer read results
      setTimeout(() => {
        log.info(`Receiving results for ${hosts.length} configured hosts.`);
        hosts.forEach((hostname) => {
          log.info(`Reading scan results for ${hostname}`);
          receiveScanResult(hostname);
        });
      }, 200);
    });
  }, log.error);
}

// start http server
function exporter () {
  const server = http.createServer((req, res) => {
    switch (req.url) {
      case '/':
        return res.end(prometheus.renderMetrics());
      default:
        return res.end('404');
    }
  });

  const port = 9000; // TODO move to config
  server.listen(port);
  log.info(`prometheus-exporter listening at ${port}`);
}

/* eslint no-new: "off" */
// TODO move to config
new CronJob('0 * * * * *', () => {
  log.info(`Triggering check`);
  triggerUpdate();
}, null, true, 'UTC');

exporter();
