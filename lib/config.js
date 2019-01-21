let config = {};

function init () {
  config = {
    port: process.env.SERVER_PORT || 9000,
    cron: process.env.CRON || '0 0 * * * *',
    logLevel: process.env.LOG_LEVEL || 'ERROR'
  };
}

init();

module.exports = exports = config;
