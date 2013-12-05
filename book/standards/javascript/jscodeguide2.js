// We like
/*global define*/
define(function (require) {
  "use strict";

  var _ = require('underscore'),
    BaseSubRouter = require('nagini/subroutes/base'),
    templateConditionIssue = require('hbs!../../templates/condition/index'), //This can be used without requring the "new" operator
    Conditions = require('nagini/collections/conditions'), //This requires the "new" operator
    Model = require('nagini/models/condition'), //This requires the "new" operator
    Navscrollspy = require('nagini/navscrollspy'),
    modelExample;

  return BaseSubRouter.extend({
    list: function (topic, id, anchor) {
      var conditions = new Conditions(),
        modelexample, // lowercase so we distinguish between top level modelExample
        that = this;
      modelexample = new Model({});

      this.slideRight(modelexample,{ slide: right }, "something", "12345");

      model.fetch().done(function () {
        that.router.appendTemplateWithAnimation('#main',
          model: model,
          id: id,
          anchor: anchor
        });
      });
    },
    slideRight: function (model,options,templatename,templateid) {
    }
  });
});

