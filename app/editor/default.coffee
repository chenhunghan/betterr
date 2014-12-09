remove_style = (ele) ->
  if ele.hasAttribute 'style'
    ele.removeAttribute 'style'
do -> 
  for i in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    do (i) ->
      for ele in document.getElementsByTagName(i)
        if ele.hasAttribute 'style' then ele.removeAttribute 'style'
do ->
  for i in ['span', 'article', 'p', 'div']
    do (i) ->
      for ele in document.getElementsByTagName(i)
        do (ele) ->
          text = ele.innerText.match(/\S+/g)
          if text isnt null
            switch i
              when 'div'
                child = ele.firstElementChild or ele.firstChild
                grandson = () -> 
                  if child isnt null
                    return child.firstElementChild or child.firstChild
                grandgrandson = ->
                  if grandson() isnt null
                    return grandson.firstElementChild or grandson.firstChild
                if child is null or grandson() is null or grandgrandson() is null
                  remove_style(ele)
                if child is null
                  console.log '* in div'
                  console.log text.toString().split(',').join(" ")
                  console.log '---------'
              when 'p'
                console.log '* in p'
                console.log text.toString().split(',').join(" ")
                console.log '---------'
                remove_style(ele)
              when 'span'
                console.log '* in span'
                console.log text.toString().split(',').join(" ")
                console.log '---------'
                remove_style(ele)
              when 'li'
                remove_style(ele)
              when 'article'
                remove_style(ele)
newSS = undefined
styles = 
"
  @font-face {
    font-family: 'TIBch';
    src: local('Hiragino Sans GB'), local('STXihei'), local('Hei'), local('WenQuanYi Micro Hei'), local('SimSun');
    unicode-range: U+2014, U+00B7, U+2026;
  }
  * { 
    font-size: 12pt !important;
    font-family: 'TIBch', 'Classic Grotesque W01', 'Helvetica Neue', Arial, 'Hiragino Sans GB', 'Microsoft YaHei', 'WenQuanYi Micro Hei', sans-serif; !important
    -webkit-font-smoothing: subpixel-antialiased !important;
    background-image: url('./null.png') !important;
    background: url('./null.png') !important;
    border: 0px solid transparent !important;
    outline: none !important;
    box-shadow: 0px 0px 0px transparent !important;
  }
  body {
    background: #F7F7F7 !important; 
  }
  p, span, a, :link, :link *{
    line-height: 1.4 !important;
    -webkit-text-shadow: 0px 0px 0 transparent !important;
    -moz-text-shadow: 0px 0px 0 transparent !important;
    text-shadow: 0px 0px 0 transparent !important;
    font-weight: normal !important;
  }
  p, span {
    color: black !important;
  }
  ::selection {
    background: #d32913 !important;
    color: #ff9486 !important;
  }
  h1 {
  }
  h2, h3, h4, h5, h6 {
  }
  em, b {
  }
  a, :link, :link *{
    cursor: pointer !important;
  }
  a {
    color: #1E74B1 !important;
    padding-bottom: 2px !important;
    border-bottom: 1px dashed #CCE1E1 !important;
    text-decoration: none !important;
  }
  a:hover {
    color: #268bd2 !important;
    border-bottom: 1px dashed #DCF5F5 !important;
  }
  :visited, :visited * {
      color: #175A8B !important;
  }
  pre code, pre, code {
    font-family: 'Source Code Pro', Consolas, Monaco, 'Andale Mono', monospace !important;
    font-size: 14px !important;
    line-height: 2 !important;
  }
  article, #contents, #content, #main, main, .content, .container-fluid, .container, .article, .middle {
    margin: 0 !important;
    padding: 0 !important;
    background: #FBFBFB !important;
    margin-top: 25px !important;
    margin-left: 10px !important;
  }
  #contents img, #content img, .main img, #main img, .content img, .container-fluid img, .container img, article img, .article img, .middle img {
    display:block !important;
    opacity: 0.9 !important;
  }
  #contents a, #content a, .main a, #main a, .content a, .container-fluid a, .container a, article a, .article a, .middle a {
    display:inline !important;
  }
  .social_buttons, .social-buttons, .social, .socialshare, .social_share, .social-share, .social-links {
    display:none !important;
  }
  iframe, object, applet, embed{
    display:none !important;
  }
  footer, header, #header, .header, #footer, .footer, bs-header, bs-footer, .topbar {
    display:none !important;
  }
  textarea, input, select {
    display:none !important;
  }
"
if document.createStyleSheet
  document.createStyleSheet "javascript:'" + styles + "'"
else
  newSS = document.createElement("link")
  newSS.rel = "stylesheet"
  newSS.href = "data:text/css," + escape(styles)
  document.getElementsByTagName("head")[0].appendChild newSS

#s = document.getElementById("tongwenlet_tw")
#document.body.removeChild s if s?
#s = document.createElement("script")
#s.language = "javascript"
#s.type = "text/javascript"
#s.src = "http://tongwen.openfoundry.org/src/bookmarklet/bookmarklet_tw.js"
#s.id = "tongwenlet_tw"
#document.body.appendChild s

# remove anti-copy
R = (a) ->
  ona = "on" + a
  if window.addEventListener
    window.addEventListener a, (e) ->
      n = e.originalTarget
      while n
        n[ona] = null
        n = n.parentNode
      return
    , true
  window[ona] = null
  document[ona] = null
  document.body[ona] = null if document.body
  return
R "contextmenu"
R "click"
R "mousedown"
R "mouseup"
R "selectstart"