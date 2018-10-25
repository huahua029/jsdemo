var http = require('http')
var fs = require('fs')
var url = require('url')
var querystring = require('querystring');
var port = process.argv[2]

if (!port) {
    console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
    process.exit(1)
}

var server = http.createServer(function(request, response) {
    var parsedUrl = url.parse(request.url, true)
    var path = request.url
    var query = ''
    if (path.indexOf('?') >= 0) { query = path.substring(path.indexOf('?') + 1) }
    var pathNoQuery = parsedUrl.pathname
    var queryObject = parsedUrl.query
    var method = request.method
    var methodName = querystring.parse(query)

    /******** 从这里开始看，上面不要看 ************/












    console.log(path)
    console.log('方方说：得到 HTTP 路径\n' + path)
    console.log('方方说：查询参数为\n' + methodName.callback)
    console.log('方方说：不含查询字符串的路径为\n' + pathNoQuery)
    if (path === '/') {
        var string = fs.readFileSync('./index.html', 'utf8')
        var amount = fs.readFileSync('./db', 'utf8') //100
        string = string.replace('{{amount}}', amount)
        response.setHeader('Content-Type', 'text/html;charset=utf-8')
        response.write(string)
        response.end()
    } else if (pathNoQuery === '/pay') {
        var amount = fs.readFileSync('./db', 'utf8') //100
        var newAmount = amount - 1
        fs.writeFileSync('./db', newAmount)
            //response.setHeader('content-type', 'image/png')
        response.setHeader('content-type', 'text/javascript')
        response.statusCode = 200
            // response.write(fs.readFileSync('./baidu.png'))

        //说明zhen.com的程序员需要堆hua.com的页面细节非常了解
        //耦合 解耦
        debugger
        response.write(`
            ${methodName.callback}.call(undefined,'success')
        `)
        response.end()
    } else {
        response.statusCode = 404
        response.write('找不到路径')
        response.end()
    }








    /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)