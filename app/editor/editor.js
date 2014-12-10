// Generated by CoffeeScript 1.8.0
(function() {
  "use strict";
  angular.module("betterr.editor", ["ngRoute", 'ui.ace']).config([
    "$routeProvider", "$compileProvider", function($routeProvider, $compileProvider) {
      $routeProvider.when("/editor", {
        templateUrl: "editor/editor.html",
        controller: "editorCtrl"
      });
      return $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript):/);
    }
  ]).controller("editorCtrl", [
    "$scope", "$http", function($scope, $http) {
      var compile;
      compile = function(coffee, css) {
        var C, COFFEE, COFFE_PLUS_CSS, CSS, cf_setting, compiled, data, e, options;
        COFFEE = new S(coffee);
        CSS = new S(css);
        CSS = CSS.replaceAll("'", '"');
        options = {
          keepSpecialComments: 0
        };
        C = new CleanCSS(options);
        CSS = C.minify(CSS);
        COFFE_PLUS_CSS = COFFEE.replaceAll('CSSsource', "'\n" + CSS + "'");
        data = COFFE_PLUS_CSS.s;
        cf_setting = {
          bare: false,
          'no-header': true
        };
        try {
          compiled = CoffeeScript.compile(data, cf_setting);
          return $http.get('//cdnjs.cloudflare.com/ajax/libs/Han/3.0.2/han.min.js').success(function(data, status, headers, config) {
            var ast, jshead, result, stream, uglified;
            data = data.concat('\n\n');
            data = data.concat(compiled);
            ast = UglifyJS.parse(data);
            stream = UglifyJS.OutputStream();
            ast.print(stream);
            uglified = stream.toString();
            jshead = "javascript: ";
            result = jshead.concat(uglified);
            return $scope.bookmarkletUrl = result;
          }).error(function(data, status, headers, config) {
            return console.log(dara);
          });
        } catch (_error) {
          e = _error;
          return $scope.err = e;
        }
      };
      $http.get("editor/default.coffee").success(function(data, status, headers, config) {
        $scope.coffee = data;
        return $http.get("//cdnjs.cloudflare.com/ajax/libs/Han/3.0.2/han.css").success(function(data, status, headers, config) {
          $scope.css = data;
          return compile($scope.coffee, $scope.css);
        }).error(function(data, status, headers, config) {
          return console.log(data);
        });
      }).error(function(data, status, headers, config) {
        return console.log(data);
      });
      return $scope.onEditorChange = function() {
        return compile($scope.coffee, $scope.css);
      };
    }
  ]).directive("prism", [
    "$compile", function($compile) {
      return {
        restrict: "A",
        transclude: true,
        scope: {
          source: "@"
        },
        link: function(scope, element, attrs, controller, transclude) {
          scope.$watch("source", function(v) {
            element.find("code").html(v);
            Prism.highlightElement(element.find("code")[0]);
          });
          transclude(function(clone) {
            if (clone.html() !== undefined) {
              element.find("code").html(clone.html());
              $compile(element.contents())(scope.$parent);
            }
          });
        },
        template: "<code></code>"
      };
    }
  ]);

}).call(this);