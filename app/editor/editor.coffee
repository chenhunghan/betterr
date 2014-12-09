"use strict"

angular.module("betterr.editor", ["ngRoute"]).config([
  "$routeProvider"
  "$compileProvider"
  ($routeProvider, $compileProvider) ->
    $routeProvider.when "/editor",
      templateUrl: "editor/editor.html"
      controller: "editorCtrl"
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript):/)
]).controller "editorCtrl", [ 
	"$scope"
	"$http"
	($scope, $http) ->
		compile = (data) ->
			cf_setting = 
				bare: false
				'no-header': true
			compiled = CoffeeScript.compile(data, cf_setting)
			ast = UglifyJS.parse compiled
			stream = UglifyJS.OutputStream()
			ast.print stream
			uglified = stream.toString()
			jshead = "javascript: "
			result = jshead.concat uglified
			#console.log result
			$scope.coffee = result

		$http.get("editor/default.coffee").success((data, status, headers, config) ->
			compile data
		).error (data, status, headers, config) ->
			console.log data
]