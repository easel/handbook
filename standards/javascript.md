# Javascript Standards
## Introduction
- Focus on readability and maintainability. The code's should be easy to understand, or obvious, to a junior-level developer.
- Write tests. Every project should have a functional test runner, and be - configured to run the tests via CI.
- Use bower for your frontend components. Check in the artifacts to components AND keep bower.json up to date.
- Use npm for backend components, and grunt to automate the toolchain. Check in the artifacts in node_modules and keep package.json up to date.
Base your project on "backpain" and stay up to date with it.

## Coding Style

### JSHint Settings
	options: {
	    bitwise: true,
	    browser: true,
	    curly: true,
	    eqeqeq: true,
	    immed: true,
	    jquery: true,
	    latedef: true,
	    newcap: true,
	    noarg: true,
	    node: true,
	    nonew: false,
	    plusplus: true,
	    regexp: true,
	    trailing: true,
	    undef: true,
	    globals: {
	        define: true,
	        require: true
	    }
	}
	
## Libraries
Use the following. Don't use other stuff without a good reason and a conversation.

- require.js
  - require-handlebars (.hbs)
- JQuery
- Underscore
- BackBone.js
- handlebars
- Chiropracter

## Best Practices
### File Layout
- Create requireJS modules
- No capital letters in filenames.
- Use underscores in module names
- modules should follow the "standard" backbone layout
  - module_name
    - views
    - add.js
    - edit.js
    - delete.js
  - models
    - module_data.js
  - templates
    - add.hbs
    - edit.hbs
    - delete.hbs
    
### Require.js
- Keep the optimizer configured, and run it regularly. If code doesn't work optimized, it doesn't work.
  - Include all dependencies at the module level, not dynamically inside functions and such.
- Require modules should define dependencies and return a module object. They should be idempotent and not dependent on global state.

		define(function(require) {
		  var BackBone = require('backbone'),
		    _ = require('underscore'),
		    $ = require('jquery'),
		    routes = require('./routes'),
		    ModuleObject = {};
		  ModuleObject.initialize = function() {
		    "initialize this thing"; 
		    # do NOT do this without discussing WHY
		 require(['someDependency'], function(dependency) {
		 dependency.doSomething();
		 } 
		  };
		  return ModuleObject;
		});
		
### BackBone.js
- Follow backbone naming conventions
- Use backbone modules
  - make sure to include jquery-cors for cross-domain API access support
		
		