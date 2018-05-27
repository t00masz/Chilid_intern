#!/bin/bash

npm run frontendCreate &
wait &
npm run frontendStart &
wait 