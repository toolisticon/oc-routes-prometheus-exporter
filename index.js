const CronJob = require('cron').CronJob;
const config = require('@toolisticon/ssl-hostinfo-prometheus-exporter').config;
const log = require('@toolisticon/ssl-hostinfo-prometheus-exporter').logger;
const resetRouteInfo = require('@toolisticon/ssl-hostinfo-prometheus-exporter').resetRouteInfo;
const updateRouteInfo = require('@toolisticon/ssl-hostinfo-prometheus-exporter').updateRouteInfo;
const startPrometheusListener = require('@toolisticon/ssl-hostinfo-prometheus-exporter').startPrometheusListener;
const routes = require('./lib/routes');

async function triggerUpdate () {
  log.info('Start reading route information.');
  // read hosts from route info
  routes.list().then((routeList) => {
    // reset data on route update
    resetRouteInfo();
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
