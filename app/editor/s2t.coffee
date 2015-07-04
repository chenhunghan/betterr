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