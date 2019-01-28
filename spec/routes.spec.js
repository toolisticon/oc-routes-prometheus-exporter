const routes = require('../lib/routes');

describe('prometheus', () => {
  /* eslint no-debugger: "off" */
  debugger;
  beforeEach(() => {
  });

  it('should fail without login', (done) => {
    routes.list().then((routeList) => {
      routeList.forEach(() => fail(), () => fail());
    }, () => done());
  });
});
