(function() {
    "use strict";
    angular.module("betterr.editor", ["ngRoute", 'ui.ace']).config([
        "$routeProvider", "$compileProvider", function($routeProvider, $compileProvider) {
            $routeProvider.when("/editor", {
                templateUrl: "app/editor/editor.html",
                controller: "editorCtrl"
            });
            return $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript):/);
        }
    ]).controller("editorCtrl", [
        "$scope", "$http", function($scope, $http) {
            function uglify (js) {
                var ast, stream, uglified;
                ast = UglifyJS.parse(js);
                stream = UglifyJS.OutputStream();
                ast.print(stream);
                uglified = stream.toString();
                return uglified;
            };

            (function() {
                $http.get("app/editor/default.js").success(function(d) {
                    $scope.default = d;
                    (function() {
                        $http.get("//cdnjs.cloudflare.com/ajax/libs/Han/3.2.5/han.css").success(function (d) {
                            $scope.hancss = d;
                            $scope.compile();
                        });
                    }).call(this);
                });
            }).call(this);



            $scope.compile = function() {
                try {
                    var css = new S($scope.hancss),
                        jsstrips = new S($scope.default),
                        CSS = css.replaceAll("'", '"'),
                        options = {
                                keepSpecialComments: 0
                            },
                        C = new CleanCSS(options),
                        miniCSS = C.minify(CSS),
                        jsstrips_add_css = jsstrips.replaceAll('CSSsource', "'\n" + miniCSS + "'"),
                        uglified = uglify(jsstrips_add_css.s),
                        final = new S(uglified).replaceAll(/\s/g, "%20");

                        $scope.bookmarkletUrl = "javascript:%20".concat(final.s);
                } catch (e) {
                    $scope.err = e;
                }
            };
        }
    ])
}).call(this);
