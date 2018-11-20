myButton.addEventListener('click',(e)=>{
	let request = new XMLHttpRequest()
	request.open('get','http://zhen.com:8001/xxx')  //配置
	request.onreadystatechange  = ()=>{
		if(request.readyState === 4){
			console.log('请求响应已经完成')
			if(request.status　>= 200 && request.status　< 300){
				console.log('请求成功')
				let string = request.responseText
				let obj = window.JSON.parse(string)
				console.log(obj.name)
				console.log(obj.name.to)

			}else if(request.status >= 400){
				console.log('请求失败')
			}
		}
	}
	request.send()
})