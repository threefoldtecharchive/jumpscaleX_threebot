#!/bin/bash

mkdir -p /sandbox/code/github/threefoldtech && cd /sandbox/code/github
rm -rf threefoldtech && mkdir -p threefoldtech
cd threefoldtech
git clone --depth 1 https://github.com/threefoldtech/home
git clone --depth 1 https://github.com/threefoldtech/jumpscaleX_builders
git clone --depth 1 https://github.com/threefoldtech/jumpscaleX_core
git clone --depth 1 https://github.com/threefoldtech/jumpscaleX_libs
git clone --depth 1 https://github.com/threefoldtech/jumpscaleX_libs_extra
git clone --depth 1 https://github.com/threefoldtech/jumpscaleX_threebot
git clone --depth 1 https://github.com/threefoldtech/jumpscaleX_weblibs

path="/sandbox/code/github/threefoldtech"
for repo in $(ls $path)
do
    cd "$path/$repo"
    git fetch
    git reset --hard origin/development || git reset --hard origin/master
done

cd ~

ssh-keygen -t rsa -N "" -f /root/.ssh/id_rsa
echo "127.0.0.1       localhost" > /etc/hosts
eval `ssh-agent -s` && ssh-add /root/.ssh/id_rsa

source /sandbox/env.sh

jsx configure -s
jsx secret 123
jsx generate

echo "PermitRootLogin yes" >> /etc/ssh/sshd_config
chmod -R 500 /etc/ssh
service ssh restart

echo $pub_key > /root/.ssh/authorized_keys
kosmos -p "j.tools.tfgrid_simulator.start()"

if [ -n "$TRC_SECRET" ]; then
    /sandbox/bin/trc -local "$TRC_LOCAL" -remote "$TRC_REMOTE"
else
    sleep 1000d
fi
