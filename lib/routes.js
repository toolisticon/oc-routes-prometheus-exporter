const openshiftRestClient = require('openshift-rest-client');

// FIXME remove hack if this PR is resolved: https://github.com/nodeshift/openshift-rest-client/pull/107
const privates = require('../node_modules/openshift-rest-client/lib/private-map');

/**
 * External API
 */
const routes = {
  list: () => {
    return new Promise((resolve, reject) => {
      openshiftRestClient().then((client) => {
        const promises = [];
        // Use the client object to find a list of projects
        client.projects.findAll().then((projects) => {
          projects.items.forEach((project) => {
            promises.push(new Promise((resolve) => {
              // FIXME remove hack
              // switch namespace
              privates.get(client).config.context.namespace = project.metadata.name;
              return client.routes.findAll().then((result) => resolve(result), () => resolve([]));
            }));
          });
          Promise.all(promises).then((listOfRouteArrays) => {
            const routes = {};
            listOfRouteArrays.forEach((routeObjects) => {
              if (routeObjects && routeObjects.items) {
                routeObjects.items.forEach((routeEntry) => {
                  routes[routeEntry.metadata.name] = routeEntry;
                });
              }
            });
            // return unique list
            resolve(Object.keys(routes).map((k) => routes[k]));
          }, reject);
        }, reject).catch(reject);
      }, reject).catch(reject);
    });
  }
};

module.exports = exports = routes;
