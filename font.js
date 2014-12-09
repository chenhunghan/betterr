javascript: ;
(function() {
  var R, newSS, remove_style, styles;
  remove_style = function(ele) {
    if (ele.hasAttribute('style')) {
      return ele.removeAttribute('style');
    }
  };
  (function() {
    var i, _i, _len, _ref, _results;
    _ref = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      _results.push((function(i) {
        var ele, _j, _len1, _ref1, _results1;
        _ref1 = document.getElementsByTagName(i);
        _results1 = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          ele = _ref1[_j];
          if (ele.hasAttribute('style')) {
            _results1.push(ele.removeAttribute('style'));
          } else {
            _results1.push(void 0);
          }
        }
        return _results1;
      })(i));
    }
    return _results;
  })();
  (function() {
    var i, _i, _len, _ref, _results;
    _ref = ['span', 'article', 'p', 'div'];
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      i = _ref[_i];
      _results.push((function(i) {
        var ele, _j, _len1, _ref1, _results1;
        _ref1 = document.getElementsByTagName(i);
        _results1 = [];
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          ele = _ref1[_j];
          _results1.push((function(ele) {
            var child, grandgrandson, grandson, text;
            text = ele.innerText.match(/\S+/g);
            if (text !== null) {
              switch (i) {
                case 'div':
                  child = ele.firstElementChild || ele.firstChild;
                  grandson = function() {
                    if (child !== null) {
                      return child.firstElementChild || child.firstChild;
                    }
                  };
                  grandgrandson = function() {
                    if (grandson() !== null) {
                      return grandson.firstElementChild || grandson.firstChild;
                    }
                  };
                  if (child === null || grandson() === null || grandgrandson() === null) {
                    remove_style(ele);
                  }
                  if (child === null) {
                    console.log('* in div');
                    console.log(text.toString().split(',').join(" "));
                    return console.log('---------');
                  }
                  break;
                case 'p':
                  console.log('* in p');
                  console.log(text.toString().split(',').join(" "));
                  console.log('---------');
                  return remove_style(ele);
                case 'span':
                  console.log('* in span');
                  console.log(text.toString().split(',').join(" "));
                  console.log('---------');
                  return remove_style(ele);
                case 'li':
                  return remove_style(ele);
                case 'article':
                  return remove_style(ele);
              }
            }
          })(ele));
        }
        return _results1;
      })(i));
    }
    return _results;
  })();
  newSS = void 0;
  styles = "@font-face { font-family: 'TIBch'; src: local('Hiragino Sans GB'), local('STXihei'), local('Hei'), local('WenQuanYi Micro Hei'), local('SimSun'); unicode-range: U+2014, U+00B7, U+2026; } * { font-size: 12pt !important; font-family: 'TIBch', 'Classic Grotesque W01', 'Helvetica Neue', Arial, 'Hiragino Sans GB', 'Microsoft YaHei', 'WenQuanYi Micro Hei', sans-serif; !important -webkit-font-smoothing: subpixel-antialiased !important; background-image: url('./null.png') !important; background: url('./null.png') !important; border: 0px solid transparent !important; outline: none !important; box-shadow: 0px 0px 0px transparent !important; } body { background: #F7F7F7 !important; } p, span, a, :link, :link *{ line-height: 1.4 !important; -webkit-text-shadow: 0px 0px 0 transparent !important; -moz-text-shadow: 0px 0px 0 transparent !important; text-shadow: 0px 0px 0 transparent !important; font-weight: normal !important; } p, span { color: black !important; } ::selection { background: #d32913 !important; color: #ff9486 !important; } h1 { } h2, h3, h4, h5, h6 { } em, b { } a, :link, :link *{ cursor: pointer !important; } a { color: #1E74B1 !important; padding-bottom: 2px !important; border-bottom: 1px dashed #CCE1E1 !important; text-decoration: none !important; } a:hover { color: #268bd2 !important; border-bottom: 1px dashed #DCF5F5 !important; } :visited, :visited * { color: #175A8B !important; } pre code, pre, code { font-family: 'Source Code Pro', Consolas, Monaco, 'Andale Mono', monospace !important; font-size: 14px !important; line-height: 2 !important; } article, #contents, #content, #main, main, .content, .container-fluid, .container, .article, .middle { margin: 0 !important; padding: 0 !important; background: #FBFBFB !important; margin-top: 25px !important; margin-left: 10px !important; } #contents img, #content img, .main img, #main img, .content img, .container-fluid img, .container img, article img, .article img, .middle img { display:block !important; opacity: 0.9 !important; } #contents a, #content a, .main a, #main a, .content a, .container-fluid a, .container a, article a, .article a, .middle a { display:inline !important; } .social_buttons, .social-buttons, .social, .socialshare, .social_share, .social-share, .social-links { display:none !important; } iframe, object, applet, embed{ display:none !important; } footer, header, #header, .header, #footer, .footer, bs-header, bs-footer, .topbar { display:none !important; } textarea, input, select { display:none !important; }";
  if (document.createStyleSheet) {
    document.createStyleSheet("javascript:'" + styles + "'");
  } else {
    newSS = document.createElement("link");
    newSS.rel = "stylesheet";
    newSS.href = "data:text/css," + escape(styles);
    document.getElementsByTagName("head")[0].appendChild(newSS);
  }
  R = function(a) {
    var ona;
    ona = "on" + a;
    if (window.addEventListener) {
      window.addEventListener(a, function(e) {
        var n;
        n = e.originalTarget;
        while (n) {
          n[ona] = null;
          n = n.parentNode;
        }
      }, true);
    }
    window[ona] = null;
    document[ona] = null;
    if (document.body) {
      document.body[ona] = null;
    }
  };
  R("contextmenu");
  R("click");
  R("mousedown");
  R("mouseup");
  R("selectstart");
})();
