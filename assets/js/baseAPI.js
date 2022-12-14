// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url
    //console.log(options.url);

    //统一为有权限的接口，headers 设置请求头
    if (options.url.indexOf("/my") !== -1) {
        options.headers = {
            Authorization: localStorage.getItem("token") || ""
        }
    }
    //全局统一挂载 complete 函数
    // 数据获取成功跟失败都会执行的回调函数 complete
    options.complete = function (res) {
        //在complete 回调函数中，可以使用responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
            localStorage.removeItem("token")//强制清空 token
            location.href = "./login.html"
        }
    }
})
