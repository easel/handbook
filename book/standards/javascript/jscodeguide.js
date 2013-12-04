'use strict';

var BaseSrv = require('./BaseService'),
  Q = require('q'),
  async = require('async'),
  crypto = require('crypto'),
  fs = require('fs'),
  ejs = require('ejs');

module.exports = function(db, models) {
  var PackageSrv = BaseSrv.extend({
    
    // Create a New Package
    create: function(data) {
      var deferred = Q.defer(),
        self = this;

      if (!data.settings) {
        deferred.reject('No settings provided');
      } else {
        // We need data.settings to be a string, but we accept a string or an object
        if (typeof data.settings === 'object') {
          data.settings = JSON.stringify(data.settings);
        }

        // Check if a similar package exists (with the same configs) and return it if so
        this.find({
            where: {
              settings: data.settings
            }
          }).
          then(function(results) {

            // No similar packages found, go ahead and create a new one
            if (results.length === 0) {
              data.slug = self.getUSlug();

              // Force views to be 0
              data.views = 0;

              models.Package.create(data).
                success(deferred.resolve).
                error(deferred.reject);
            } else {
              // We found a similar package, so let's return that
              deferred.resolve(results[0]);
            }

          }).
          fail(function(err) {
            deferred.reject(err);
          });
      }

      return deferred.promise;
    }
  });

  PackageSrv.Model = models.Package;

  return new PackageSrv(db);
};

module.exports = function(PackageSrv, SettSrv) {

  return (require('./../classes/Controller.js')).extend({
      service: PackageSrv
    },
    {
      // Get a package by id
      get: function() {
        var self = this,
          globalPckg = {};

        PackageSrv.findId(this.req.params.id).
          then(function(thePackage) {
            // Update views when fetching
            if (thePackage && thePackage.id) {
              globalPckg = thePackage;
              ++globalPckg.views;

              // Update in the database
              PackageSrv.update(globalPckg.id, globalPckg).
                then(function() {
                  // Convert the settings before sending them over
                  return SettSrv.convertSettings(globalPckg.settings);
                }).
                then(function(newSettings) {
                  globalPckg.settings = newSettings;

                  // Get the sample code
                  return PackageSrv.getCode(newSettings);
                }).
                then( function( sampleCode ) {
                  // We need to copy globalPckg because otherwise this non-existing attribute (in the model) is not passed on
                  var tmpPackage = JSON.parse(JSON.stringify(globalPckg));
                  
                  tmpPackage.sampleCode = sampleCode;

                  self.send(tmpPackage);
                }).
                fail(self.proxy('handleException'));
            } else {
              self.send(404, 'Package not found.');
            }
          }).
          fail(this.proxy('handleException'));
      },

      // Create a package
      post: function() {
        var data = this.req.body;

        if (data.id) {
          return this.put();
        }

        PackageSrv.create( data ).
          then(this.proxy('send')).
          fail(this.proxy('handleException'));
      },

      // Delete a package
      destroy: function() {
        this.send(403, 'Deletions are not allowed');
      }
    });
};

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Package', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    settings: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    views: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    paranoid: true
  });
};

define([
    'app',
    'jquery'
  ],
  function(app, $) {
    'use strict';
    
    app.controller('Menu', [
      '$scope',
      '$rootScope',
      '$location',
      '$anchorScroll',
      '$routeParams',
      '$timeout',
      function($scope, $rootScope, $location, $routeParams, $timeout) {
        // Init $scope properties
        // $scope action methods
        $scope.actions = {
          // Apparently AngularJS freaks out about anchors, so we need to create this
          goTo: function(id) {
            var doScroll;

            doScroll = function() {
              var $element = $('#' + id);

              if ($element.length) {
                $location.search({
                  goTo: id
                });

                // If we're trying to get to generate, we need to show the form first (and it'll scroll automatically)
                if (id === 'generate') {
                  setTimeout(function() {
                    $('.start-button').trigger('click');
                  }, 10);
                } else {
                  $('html, body').animate({
                    scrollTop: ($element.offset().top - 50)
                  }, 500);
                }
              }
            };

            if ($location.path() !== '/') {
              $location.path('/').search({
                goTo: id
              });
            } else {
              doScroll();
            }
          }
        };

        $rootScope.$on('$routeChangeSuccess', function(angularEvent, newRoute, oldRoute) {
          // On the first load, $routeParams has nothing, but $location.search() does
          var goTo;

          if ($routeParams.goTo) {
            goTo = $routeParams.goTo;
          } else if ($location.search() && $location.search().goTo) {
            goTo = $location.search().goTo;
          } else {
            goTo = '';
          }

          // Only trigger this on the homepage
          if (goTo && newRoute.loadedTemplateUrl.indexOf('home.html') !== -1) {
            $scope.actions.goTo(goTo, true);
          }
        });
      }
    ]);
  }
);