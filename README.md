# Uptime
[![Under Development](https://img.shields.io/badge/under-development-orange.svg)]()
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
[![Travis](https://img.shields.io/travis/reustonium/uptime.svg)](https://travis-ci.org/reustonium/uptime)
[![Coverage Status](https://coveralls.io/repos/github/reustonium/uptime/badge.svg?branch=master)](https://coveralls.io/github/reustonium/uptime?branch=master)

> Website uptime monitor

Uptime is an open-sourced and free website uptime monitor.  It runs on the docker engine for easy deployment.

This repository contains:

1. The front-end client application created with Vuejs.
2. The backend API created with Express.
3. A mongodb database for storing monitor data.

## Table of Contents

- [Background](#background)
- [Prerequisites](#Prerequisites)
- [Running Uptime](#running-uptime)
- [Usage](#usage)
  - [Adding a Monitor](#adding-a-monitor)
- [Contribute](#contribute)
- [Change Log](#changelog)
- [License](#license)

## Background

Uptime's purpose is to provide a light-weight application for monitoring all of your web applications and services.  Uptime was born from the need for monitoring applications living **behind the firewall**, **in the DMZ**, or generally anywhere else that [Uptime Robot](https://uptimerobot.com) can't reach.

## Prerequisites

* Docker
* Docker-Compose

## Running Uptime

1. Begin by cloning the repository  
`git clone https://github.com/reustonium/uptime.git`

2. Start Uptime by calling the Docker Compose Up command.  
`docker-compose up`

3. Point your browser to `localhost:8080`

## Usage

### Adding a Monitor

## Contributing

Please read [CONTRIBUTING.md](.github/CONTRIBUTING.md) for more details.

> TLDR

1. `Fork` this repository
2. Create a `branch`
3. `Commit` your changes
4. `Push` your `commits` to the `branch`
5. Submit a `pull request`

Check also the [list of contributors](CONTRIBUTORS.md) who helped on this project.

## Changelog

## License

Uptime is licensed under the [MIT license.](LICENSE.md)
