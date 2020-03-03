npm run build
cp index.html ../output

mkdir -p ../output/codebase
mkdir -p ../output/static/

cp -a codebase/* ../output/codebase
cp -a static/* ../output/static
