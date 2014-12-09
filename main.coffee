source = 'console.log "hellp"'
setting = 
	bare: true
	'no-header': true
compiled = CoffeeScript.compile(source, setting)

$http.post 'http://closure-compiler.appspot.com/compile',
	compilation_level: 'SIMPLE_OPTIMIZATIONS',
	output_format: 'text',
	output_info: 'compiled_code'
	js_code: js
	(compiled) ->
	    console.log compiled


# jshead = "javascript: "
# result = jshead.concat compressed
# console.log result