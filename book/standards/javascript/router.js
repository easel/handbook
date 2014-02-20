     // Navigates to a page and adds the view to be removed later
    navigatePage: function (view) {
      that.closeViews();
      that.views.push(view);
      $("#page-layout").html(view.render().el);

    },
    closeViews: function () {
      // Call remove on the views currently loaded to clean up
      if (this.views.length > 0) {
        _(this.views).each(function (view) {
          view.remove();
        });
        this.views = [];
      }
    }