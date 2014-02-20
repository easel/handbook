// Good example

/*global define*/
define(function (require) {
  'use strict';

  var Template = require('hbs!../../templates/static/contact_us'),
    Base = require("nagini/views/base"),
    _ = require('underscore');

  return Base.extend({
    template: Template,
    events: {
      'click button': 'sendQuestion'
    },
    initialize: function () {
      var args = _.clone(arguments);
      this.listenTo(this, 'sendZendeskTicket', this.sendZendeskTicket);
      Base.prototype.initialize.apply(this, arguments);
    },
    sendQuestion: function (e) {
      var ticketParams = this.getZendeskParams();
      ticketParams.tag = 'contact-us';
      e.preventDefault();
      this.trigger('sendZendeskTicket', ticketParams);
    }
  });
});

// Bad example

/*global define*/
define(function (require) {
'use strict';

var Template = require('hbs!../../templates/static/contact_us'),
  Base = require("nagini/views/base"),
  _ = require('underscore');

  return Base.extend({
    el: $('body'), // Don't reference the el object in a view like this
    tagName: 'header',
    initialize: function () {
      this.render(); // Don't call render within initialize if you have to do this the view is setup wrong.
    },
    render: function () {
      // Don't add a require statement within render and any function which overrides a base class
      // needs to make sure it calls its parent class always.
      // Base.prototype.render.apply(this, arguments);
      this.$el.append(require('hbs!templates/header'));
    }
  });
});
