(->
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
                when 'span' or 'div'
                  child = ele.firstElementChild or ele.firstChild
                  console.log child
                  if child is null
                    #console.log '* in div or span'
                    #console.log text.toString().split(',').join(" ")
                    #console.log '---------'
                    if ele.hasAttribute 'style'
                      ele.removeAttribute 'style'
                when 'p' or 'article'
                  #console.log '* in p or article'
                  #console.log text.toString().split(',').join(" ")
                  #console.log '---------'
                  if ele.hasAttribute 'style'
                    ele.removeAttribute 'style'
  newSS = undefined
  styles = 
  "
    @font-face {
      font-family: 'TIBch';
      src: local('Hiragino Sans GB'), local('STXihei'), local('Hei'), local('WenQuanYi Micro Hei'), local('SimSun');
      unicode-range: U+2014, U+00B7, U+2026;
    }
    * { 
      font-size: 14pt !important;
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
    p {
      color: black !important;
      line-height: 2 !important;
    }
    ::selection {
      background: #d32913 !important;
      color: #ff9486 !important;
    }
    h1 {
    }
    h2, h3, h4, h5, h6 {
      display:none;
    }
    :link, :link *{
      cursor: pointer !important;
      color: #268bd2 !important;
    }
    :link:hover, :link *:hover {
        color: gray !important;
    }
    a {
      padding-bottom: 2px !important;
      border-bottom: 1px dashed #93a1a1 !important;
      text-decoration: none !important;
    }
    :visited, :visited * {
        color: #175A8B !important;
    }
    .social_buttons, .social-buttons, .social, .socialshare, .social_share, .social-share, .social-links {
      display:none !important;
    }
    button, .btn {
      display:none !important;
    }
    nav, .nav, #navigation, .navigation, .navbar, #navbar, aside, .aside, .sidebar-container, .sidebar, .bar, #sidebar-wrapper, #sidebar, .left, .right{
      display:none !important;
    }
    iframe, object, applet, embed{
      display:none !important;
    }
    footer, header, #header, .header, #footer, .footer, bs-header, bs-footer, .topbar {
      display:none !important;
    }
    pre code {
      font-family: 'Source Code Pro', Consolas, Monaco, 'Andale Mono', monospace !important;
      font-size: 12px !important;
      line-height: 2 !important;
    }
    pre, code{
      font-family: 'Source Code Pro', Consolas, Monaco, 'Andale Mono', monospace !important;
    }
    .Icon, i, img, #logo, .logo{
      display:none !important;
    }
    a {
      display:none !important;
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
    ol, ul {
      margin: 0 !important;
      padding: 0 !important;
    }
    li{
      margin: 0 !important;
      padding: 0 !important;
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
      window.addEventListener a, ((e) ->
        n = e.originalTarget
        while n
          n[ona] = null
          n = n.parentNode
        return
      ), true
    window[ona] = null
    document[ona] = null
    document.body[ona] = null if document.body
    return
  R "contextmenu"
  R "click"
  R "mousedown"
  R "mouseup"
  R "selectstart"
  return
)()