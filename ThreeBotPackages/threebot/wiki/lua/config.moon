-- config.moon

-- default threebot gedis config  
config = require "lapis.config"

config "development", ->
  gedis_port 8901
  gedis_host "127.0.0.1"
  
config "production", ->
  gedis_port 8901
  gedis_host "127.0.0.1"