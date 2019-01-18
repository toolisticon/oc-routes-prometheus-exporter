# Monitor OpenShift Routes in Prometheus

[![License](https://img.shields.io/github/license/mashape/apistatus.svg)](LICENSE)
[![Build Status](https://travis-ci.org/toolisticon/oc-routes-prometheus-exporter.svg?branch=master)](https://travis-ci.org/toolisticon/oc-routes-prometheus-exporter)
[![Build Status](https://jenkins.holisticon.de/buildStatus/icon?job=toolisticon/oc-routes-prometheus-exporter/master)](https://jenkins.holisticon.de/blue/organizations/jenkins/toolisticon%2Foc-routes-prometheus-exporter/branches/)
[![Docker Build Status](https://img.shields.io/docker/build/toolisticon/oc-routes-prometheus-exporter.svg)](https://hub.docker.com/r/toolisticon/oc-routes-prometheus-exporter/)
[![npm version](https://badge.fury.io/js/%40toolisticon%2Foc-routes-prometheus-exporter.svg)](https://badge.fury.io/js/%40toolisticon%2Foc-routes-prometheus-exporter)
[![Docker Stars](https://img.shields.io/docker/stars/toolisticon/oc-routes-prometheus-exporter.svg)](https://hub.docker.com/r/toolisticon/oc-routes-prometheus-exporter/)
[![Docker Pulls](https://img.shields.io/docker/pulls/toolisticon/oc-routes-prometheus-exporter.svg)](https://hub.docker.com/r/toolisticon/oc-routes-prometheus-exporter/)

> Still **WIP**


## Usage

This nodejs application assumes that the container in which the application is running has already a valid OpenShift session.

## Development

### Debug

To debug run the following command:
```
node --inspect-brk index.js
```

To debug unit tests:

```
npm run test:debug
```
