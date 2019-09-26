local lapis = require("lapis")
local lfs = require("lfs")
local root = "applications"
local all_apps = { }
for entity in lfs.dir(root) do
  if entity ~= "." and entity ~= ".." and string.sub(entity, -4) == ".lua" then
    local app = string.sub(entity, 0, -5)
    all_apps[#all_apps + 1] = app
  end
end
do
  local _class_0
  local _parent_0 = lapis.Application
  local _base_0 = {
    [{
      index = "/"
    }] = function(self)
      return {
        render = "home"
      }
    end
  }
  _base_0.__index = _base_0
  setmetatable(_base_0, _parent_0.__base)
  _class_0 = setmetatable({
    __init = function(self, ...)
      return _class_0.__parent.__init(self, ...)
    end,
    __base = _base_0,
    __name = nil,
    __parent = _parent_0
  }, {
    __index = function(cls, name)
      local val = rawget(_base_0, name)
      if val == nil then
        local parent = rawget(cls, "__parent")
        if parent then
          return parent[name]
        end
      else
        return val
      end
    end,
    __call = function(cls, ...)
      local _self_0 = setmetatable({}, _base_0)
      cls.__init(_self_0, ...)
      return _self_0
    end
  })
  _base_0.__class = _class_0
  local self = _class_0
  self:enable("etlua")
  for _, app in pairs(all_apps) do
    self:include(root .. "." .. app)
  end
  if _parent_0.__inherited then
    _parent_0.__inherited(_parent_0, _class_0)
  end
  return _class_0
end
