  // Correct way to handle multiple async calls
  var deferreds = [];
  _.each(promises,function(promise) {
    deferreds.push(promise.save().done(function() {
    }));
  });
  $.when.apply(null, deferreds).then(function() {
     // The end of all the sync calls
  }, function(e) {
      console.log("fail", this);
  });

  // Dont do
  model1.save().done(function() {
    model2.save().done(function() {
      model3.save().done(function() {
      });
    });
  });