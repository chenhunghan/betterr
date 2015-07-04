(function() {
  "use strict";
  angular.module("betterr", ["ngRoute", "betterr.editor"]).config([
    "$routeProvider", function($routeProvider) {
      return $routeProvider.otherwise({
        redirectTo: "/editor"
      });
    }
  ]);
}).call(this);
