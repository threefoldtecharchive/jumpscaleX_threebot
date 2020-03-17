rm -rf __target__
transcrypt -n hello.py && cp __target__/* src/hello -a
npm run export
rm -rf ../frontend/*
cp __sapper__/export/jumpscale/svelte/* ../frontend/ -R
