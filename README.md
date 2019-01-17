# Monitor OpenShift Routes in Prometheus

[![Build Status](https://travis-ci.org/toolisticon/oc-routes-prometheus-exporter.svg?branch=master)](https://travis-ci.org/toolisticon/oc-routes-prometheus-exporter)
[![Docker Build Status](https://img.shields.io/docker/build/toolisticon/oc-routes-prometheus-exporter.svg)](https://hub.docker.com/r/toolisticon/oc-routes-prometheus-exporter/)
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