$(function () {
    var layer = layui.layer
    // 登陆注册切换
    $(".enter-a").on("click", function () {
        $(".register").show()
        $(".enter").hide()
    })
    $(".register-a").on("click", function () {
        $(".register").hide()
        $(".enter").show()
    })

    // 从layui获取form对象
    var form = layui.form;
    // 密码验证
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码一致
        repwd: function (value) {
            var pwd = $(".register [name=password]").val()
            if (value !== pwd) {
                return "两次密码输入不一致"
            }
        }
    })

    // 监听注册表单提交事件
    $("#form-reg").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            type: "post",
            url: "/api/reguser",
            data: 
            { 
                username: $('#form-reg [name=username]').val(),
                password: $('#form-reg [name=password]').val()
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("注册成功");
                $(".register-a").click()
            }
        })
    })

    // 监听登录表单提交事件
    $("#form_login").on("submit",function (e) {
        e.preventDefault()
        $.ajax({
            type:"POST",
            url:"/api/login",
            // 快速获取表单信息
            data:$(this).serialize(),
            success:function (res) {
                if (res.status !==0) {
                    return layer.msg(res.message);
                }
                layer.msg("登录成功");
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem("token",res.token)
                //跳转主页
                location.href = '/index.html'
            }
        })
    })
})

