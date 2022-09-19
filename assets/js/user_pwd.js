$(function () {
    // 从layui获取form对象
    var form = layui.form;
    // 密码验证
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '输入错误密码必须6到12位，且不能出现空格'
        ],
        samePwd: function (value) {
            if (value == $('[name=oldPwd]').val()) {
               return '新旧密码不能相同'
            }
        },
        //确认密码是否一致
        repwd: function (value) {
            var pwd = $("#pwd").val()
            if (value !== pwd) {
                return "两次密码输入不一致"
            }
        } 
    })
    // 重置密码
    $(".layui-form").on("submit",function (e) {
        e.preventDefault()
        $.ajax({
            type:"post",
            url:"/my/updatepwd",
            data: $(this).serialize(),
            success:function (res) {
                if (res.status !== 0) {
                    return layer.msg("更改密码失败")
                } 
                layer.msg("更新密码成功！");
                //重置表单
                $(".layui-form")[0].reset();
            }
        })
    })
})