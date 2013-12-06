/*global define*/
define(function (require) {
  "use strict";

  var _ = require('underscore'),
    BaseSubRouter = require('nagini/subroutes/base'),
    modelCondition = require('nagini/models/condition');
    // This can pass jshint check because it is not capitalized
    // where ModelCondition will ensure that people do model = new ModelCondition({});
    // so jshint will do the checking for classes which require "new" to be used.

  return BaseSubRouter.extend({
    list: function (topic, id, anchor) {
      var modelCondition;
      // Issue 2: When referring or creating modelCondition the usual practice
      // is to do modelCondition = new ModelCondition({})
      // However we now are confusing with modelCondition declared at the top.
      // If  we use lowercase
      // var modelcondition
      // modelcondition = new modelCondition({});
      // this is easier to differentiate

      this.slideRight(modelCondition);

    },
    slideRight: function (modelCondition) {
      // Also same issue here for passthrough variables.
      // pass-through variables and local variables differentiation
      // between the camelCase top level variables

    }
  });
});
