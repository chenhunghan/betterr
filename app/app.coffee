"use strict"

# Declare app level module which depends on views, and components
angular.module("betterr", [
  "ngRoute"
  "betterr.editor"
  "myApp.view2"
  "myApp.version"
]).config [
  "$routeProvider"
  ($routeProvider) ->
    $routeProvider.otherwise redirectTo: "/view1"
    
]