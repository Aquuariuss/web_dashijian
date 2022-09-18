$(function () {
    geiUserInif()

    //点击退出按钮
    $(".btnlogout").on("click",function () {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
           // 清除本地存储里的 token .然后跳转
            localStorage.removeItem("token")
            location.href = "./login.html" 

            layer.close(index);
        });    
    })
})

// 获取用户的基本信息
function geiUserInif() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        //请求头配置对象
       /*  headers: {
            Authorization: localStorage.getItem("token") || ""
        }, */
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            //获取成功后的操作
            //console.log(res);
            renderAvatar(res.data)
        },
        /* // 数据获取成功跟失败都会执行的回调函数 complete
        complete:function (res) {
            //在complete 回调函数中，可以使用responseJSON拿到服务器响应回来的数据
            if (res.responseJSON.status == 1 && res.responseJSON.message == '身份认证失败！') {
                localStorage.removeItem("token")//强制清空 token
                location.href = "./login.html" 
            }
        } */
    })
}
//渲染用户头像
function renderAvatar(user) {
    //设置用户名
    var name = user.nickname || user.username
    $(".weicome").html("欢迎&emsp;" + name)
    if (user.user_pic !== null) {
        //显示图片头像
        $(".layui-nav-img").attr("src", user.user_pic).show()
        $(".text-avatar").hide()
    } else {
        //显示文本头像
        var first = name[0].toUpperCase()//拿到用户名第一个字符转为大写
        $(".text-avatar").html(first).show() 
        $(".layui-nav-img").hide()

    }
}
