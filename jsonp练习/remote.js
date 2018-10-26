var http = require('http');
var url = require("url");
var fs = require('fs')
var queryString = require("querystring");

http.createServer(function(request, response) {
    var parseUrl = url.parse(request.url)
    var path = parseUrl.pathname
    query = queryString.parse(parseUrl.query)

    if (path === '/remote.js') {
        let jsonObject = fs.readFileSync('./person.json').toString()
        response.setHeader('content-type', 'text/javascript')
        response.statusCode = 200
        response.write(`${query.callback}.call(undefined,${jsonObject})`)
        response.end()
    }
}).listen(8888);

// 终端打印如下信息

console.log('Server running at http://127.0.0.1:8888/');