cd sapper-blog
    export dev=0
    npm install
    npm run export
cd ..
mkdir -p frontend/
cp sapper-blog/__sapper__/export/blog/* frontend/ -R
echo "BUILD DONE!"
