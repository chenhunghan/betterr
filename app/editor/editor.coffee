"use strict"

angular.module("betterr.editor", ["ngRoute", 'ui.ace']).config([
  "$routeProvider"
  "$compileProvider"
  ($routeProvider, $compileProvider) ->
    $routeProvider.when "/editor",
      templateUrl: "editor/editor.html"
      controller: "editorCtrl"
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript):/)
]).controller("editorCtrl", [ 
	"$scope"
	"$http"
	($scope, $http) ->
		compile = (coffee, css) ->
			COFFEE = new S coffee

			#replace all ' to "
			CSS = new S css
			CSS = CSS.replaceAll("'",'"')
			#add !import to all CSS styles
			#CSS = CSS.replaceAll('!important', '')
			#CSS = CSS.replaceAll(';', ' !important;').s
			#purify CSS
			options =
				keepSpecialComments: 0
			C = new CleanCSS(options)
			CSS = C.minify(CSS)

			COFFE_PLUS_CSS = COFFEE.replaceAll 'CSSsource', "'\n#{CSS}'"
			data = COFFE_PLUS_CSS.s
			cf_setting = 
				bare: false
				'no-header': true
			try
				compiled = CoffeeScript.compile(data, cf_setting)

				$http.get('//cdnjs.cloudflare.com/ajax/libs/Han/3.0.2/han.min.js').success((data, status, headers, config) ->
					data = data.concat('\n\n')
					data = data.concat compiled
					ast = UglifyJS.parse data
					stream = UglifyJS.OutputStream()
					ast.print stream
					uglified = stream.toString()
					jshead = "javascript: "
					result = jshead.concat uglified
					
					$scope.bookmarkletUrl = result
					#console.log result
				).error (data, status, headers, config) ->
					console.log dara
			catch e
				$scope.err = e
		$http.get("editor/default.coffee").success((data, status, headers, config) ->
			$scope.coffee = data
			$http.get("//cdnjs.cloudflare.com/ajax/libs/Han/3.0.2/han.css").success((data, status, headers, config) ->
					$scope.css = data
					compile $scope.coffee, $scope.css
			).error (data, status, headers, config) ->
				console.log data
		).error (data, status, headers, config) ->
			console.log data
		$scope.onEditorChange = () ->
			compile $scope.coffee, $scope.css
]).directive "prism", [
  "$compile"
  ($compile) ->
    return (
      restrict: "A"
      transclude: true
      scope:
        source: "@"
      link: (scope, element, attrs, controller, transclude) ->
        scope.$watch "source", (v) ->
          element.find("code").html v
          Prism.highlightElement element.find("code")[0]
          return
        transclude (clone) ->
          if clone.html() isnt `undefined`
            element.find("code").html clone.html()
            $compile(element.contents()) scope.$parent
          return
        return
      template: "<code></code>"
      #this direstive is forked from http://stackoverflow.com/questions/22742899/using-prismjs-in-angular-app
    )
]