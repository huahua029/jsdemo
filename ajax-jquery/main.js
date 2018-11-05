window.jQuery = function(nodesOrSelector) {
    let nodes = {}
    nodes.addClass = function() {}
    return nodes
}

window.jQuery.ajax = function({ url, method, body, success, fail }) {
    return new Promise(function(resolve, reject) {
        let request = new XMLHttpRequest
        request.open(method, url)
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                if (request.status >= 200 && request.status < 300) {
                    resolve.call(undefined)
                } else if (request.status >= 400) {
                    reject.call(undefined)
                }
            }
        }
        request.send(body)
    })
}

//点击事件
myButton.addEventListener('click', () => {
    window.jQuery.ajax({
        url: '/xxx',
        method: 'post'
    }).then(
        () => { console.log('成功') }, //第一个参数
        () => { console.log('失败') } //第二个参数
    )
})