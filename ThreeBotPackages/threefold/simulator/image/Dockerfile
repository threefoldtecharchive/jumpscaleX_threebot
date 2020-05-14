FROM threefoldtech/3bot2
RUN mkdir -p /sandbox/code/github/threefoldtech && cd /sandbox/code/github
    && rm -rf threefoldtech && mkdir -p threefoldtech && \
    cd threefoldtech && \
    git clone https://github.com/threefoldtech/home && \
    git clone https://github.com/threefoldtech/jumpscaleX_builders && \
    git clone https://github.com/threefoldtech/jumpscaleX_core && \
    git clone https://github.com/threefoldtech/jumpscaleX_libs && \
    git clone https://github.com/threefoldtech/jumpscaleX_libs_extra && \
    git clone https://github.com/threefoldtech/jumpscaleX_threebot && \
    git clone https://github.com/threefoldtech/jumpscaleX_weblibs
COPY startup.sh /
