const openshiftRestClient = require('openshift-rest-client').OpenshiftClient;

// FIXME remove hack if this PR is resolved: https://github.com/nodeshift/openshift-rest-client/pull/107
// const privates = require('../node_modules/openshift-rest-client/lib/private-map');

/**
 * External API
 */
const routes = {
  list: () => {
    return new Promise((resolve, reject) => {
      openshiftRestClient().then((client) => {
        const promises = [];
        // Use the client object to find a list of projects
        client.apis['project.openshift.io'].v1.projects.get().then((response) => {
          const routes = {};
          response.body.items.forEach((project) => {
            promises.push(new Promise((resolve) => {
              // switch namespace
              return client.apis['route.openshift.io'].v1.namespaces(project.metadata.name).routes.get().then((result) => {
                result.body.items.forEach((routeEntry) => {
                  routes[routeEntry.metadata.name] = routeEntry;
                });
                return resolve();
              }, () => resolve());
            }));
          });
          Promise.all(promises).then(() => {
            // return unique list
            resolve(Object.keys(routes).map((k) => routes[k]));
          }, reject);
        }, reject).catch(reject);
      }, reject).catch(reject);
    });
  }
};

module.exports = exports = routes;
