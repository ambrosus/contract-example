#!/bin/bash

docker-compose down --rmi local;

yarn dev:docker:parity;
yarn dev:deploy;
