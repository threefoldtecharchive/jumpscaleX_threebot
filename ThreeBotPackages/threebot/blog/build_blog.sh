cd sapper-blog
    export dev=0
    npm install
    npm run export
cd ..
mkdir -p html/
cp sapper-blog/__sapper__/export/blog/* html/ -R
echo "BUILD DONE!"
