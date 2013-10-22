define(function (require) {
  var BackBone = require('backbone'),
    _ = require('underscore'),
    $ = require('jquery'),
    routes = require('./routes'),
    ModuleObject = {};
  ModuleObject.initialize = function () {
    "initialize this thing";
    // do NOT do this without discussing WHY
    require(['someDependency'], function (dependency) {
      dependency.doSomething();
    });
  };
  return ModuleObject;
});
