const CronJob = require('cron').CronJob;
const config = require('@toolisticon/ssl-hostinfo-prometheus-exporter').config;
const log = require('@toolisticon/ssl-hostinfo-prometheus-exporter').logger;
const updateHosts = require('@toolisticon/ssl-hostinfo-prometheus-exporter').updateHosts;
const updateRouteInfo = require('@toolisticon/ssl-hostinfo-prometheus-exporter').updateRouteInfo;
const startPrometheusListener = require('@toolisticon/ssl-hostinfo-prometheus-exporter').startPrometheusListener;
const routes = require('./lib/routes');

async function triggerUpdate () {
  log.info('Start reading route information.');
  // read hosts from route info
  routes.list().then((routeList) => {
    const hostnames = [];
    // reconstruct hostname data on route update
    routeList.forEach((route) => hostnames.push(route.spec.host), log.error);
    updateHosts(hostnames);
    routeList.forEach((route) => updateRouteInfo(route.spec.host, route.metadata), log.error);
  }, log.error);
}

/* eslint no-new: "off" */
new CronJob(config.cron, () => {
  log.info(`Triggering check`);
  triggerUpdate();
}, null, true, 'UTC');

// trigger one update immediatly
triggerUpdate();

startPrometheusListener();
