JSONP概述：

请求方：hua.com的前端程序员（浏览器）

响应方：zhen.com的后端程序员（服务器）

1.请求方创建script,src指向响应方，同时传一个查询参数 ?callbackName=xxx

2.响应方根据查询参数callbackName，构造形如
  1.xxx.call(undefined, '你要的数据')
  2.xxx('你要的数据')
这样的响应

3.浏览器接收到响应，就会执行，xxx.call(undefined,'你要的数据')

4.那么请求方就知道了他要的数据
这就是JSONP

---
约定：
>1. callbackName ---（一定叫做）---> callback / jQuery_callback（jQuery中用）
>2. yyy --------（一般用随机数）---------> 随便取名字，用完就不要了啊。
---

我们现在已经知道，我们可以使用`<script>`标签，从本地访问服务器的资源，并且可以拿到服务器中的东西。
现在我们做一些改动，将remote.js设置为我们的http服务器：
>１．简单处理下url
>２．访问一个JSON文件，给客户端返回其中的数据

接下来，我们就需要设置 jsonp.html，动态的创建标签，访问服务器，并且拿到服务器中的数组

```
最后会弹出对话框，正确显示liu bei这个名字。也就是说，我们通过浏览器，访问服务器，服务器确实给我们提供了person.json中的数据。

