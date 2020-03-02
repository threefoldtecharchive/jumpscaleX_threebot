from Jumpscale import j


class Package(j.baseclasses.threebot_package):
    def start(self):
        """
        called when the 3bot starts
        :return:
        """
        server = self.openresty
        server.configure()

        for port in (443, 80):
            website = server.get_from_port(port=port)
            locations = website.locations.get(f"codeserver_{port}")

            auth_location = locations.get_location_custom("codeserver")
            auth_location.config = """
            location /codeserver/ {
                # use access_by_lua_block for authentication

                access_by_lua_block {
                    local res = ngx.location.capture("/auth")

                    if res.status == ngx.HTTP_OK then
                        return
                    end

                    if res.status == ngx.HTTP_FORBIDDEN then
                        return ngx.redirect("/auth/login?provider=3bot&next_url=/codeserver")
                    end

                    ngx.exit(ngx.HTTP_INTERNAL_SERVER_ERROR)
                }

                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "Upgrade";
                proxy_set_header HOST $host;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

                proxy_pass http://127.0.0.1:8080/;
            }

            location = /auth {
                # a seprate location for auth server, where we do not set Upgrade header like:
                # proxy_set_header Upgrade $http_upgrade
                # because this would make the subrequest of /auth fails (with websockets too)
                # as it causes multiple connection upgrades

                internal;
                proxy_pass              http://127.0.0.1:9999/auth/authenticated;
                proxy_pass_request_body off;
                proxy_set_header        Content-Length "";
                proxy_set_header        X-Original-URI $request_uri;
            }
            """

        # Start code server
        cmd_start = "./code-server --auth none --host 127.0.0.1"
        self.startupcmd = j.servers.startupcmd.get("codeserver", cmd_start=cmd_start, path="/sandbox/bin", ports=8080)
        if not j.sal.fs.exists("/sandbox/bin/code-server"):
            j.builders.apps.codeserver.install()

        self.startupcmd.start()

    def stop(self):
        # Stop code server
        if not j.sal.fs.exists("/sandbox/bin/code-server"):
            j.builders.apps.codeserver.install()
        self.startupcmd.stop()
