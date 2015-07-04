do ->
  s = document.getElementById("tongwenlet_tw2")
  document.body.removeChild s  if s?
  s = document.createElement("script")
  s.language = "javascript"
  s.type = "text/javascript"
  s.src = "//tongwen.openfoundry.org/NewTongWen/tools/bookmarklet_tw2.js"
  s.id = "tongwenlet_tw2"
  document.body.appendChild s
  return

do ->
  s = document.createElement("script")
  s.language = "javascript"
  s.type = "text/javascript"
  s.src = "//cdnjs.cloudflare.com/ajax/libs/Han/3.2.5/han.min.js"
  document.body.appendChild s
  document.getElementsByTagName('html')[0].setAttribute("lang", "zh-Hant-TW")
  return

hanify = (ele) ->
  loopsiloop = ->
    setTimeout (->
      try
        Han(ele).initCond().renderElem().renderDecoLine().renderJiya().renderHWS(true).correctBasicBD(true).substCombLigaWithPUA()
      catch e
        loopsiloop()
    ), 5000

clean = (ele) ->
  if ele.hasAttribute 'style' then ele.removeAttribute 'style'

do -> 
  for i in ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']
    do (i) ->
      for ele in document.getElementsByTagName(i)
        clean(ele)
        hanify(ele)
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
                  if child isnt null then return child.firstElementChild or child.firstChild
                grandgrandson = ->
                  if grandson() isnt null then return grandson.firstElementChild or grandson.firstChild
                if child is null or grandson() is null or grandgrandson() is null
                  clean(ele)
                  hanify(ele)
              when 'p'
                clean(ele)
                hanify(ele)
              when 'span'
                clean(ele)
                hanify(ele)
              when 'li'
                clean(ele)
                hanify(ele)
              when 'article'
                clean(ele)
                hanify(ele)

newSS = undefined
styles = CSSsource
if document.createStyleSheet
  document.createStyleSheet "javascript:'" + styles + "'"
else
  newSS = document.createElement("link")
  newSS.rel = "stylesheet"
  newSS.href = "data:text/css," + escape(styles)
  document.getElementsByTagName("head")[0].appendChild newSS

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
