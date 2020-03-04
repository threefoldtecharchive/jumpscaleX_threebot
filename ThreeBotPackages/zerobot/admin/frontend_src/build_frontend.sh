#!/bin/bash

if [ "$1" != "" ]; then
    npm run build-$1
else
    npm run build
fi

cp index.html ../output

mkdir -p ../output/codebase
mkdir -p ../output/static/

cp -a codebase/* ../output/codebase
cp -a static/* ../output/static
