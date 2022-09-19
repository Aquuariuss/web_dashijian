$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度必须在0~6之间';
            }
        }
    });
    // 初始化用户的基本信息 
    initUserInif()
    function initUserInif() {
        $.ajax({
            type: "GET",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("获取用户信息失败")
                }
                //调用 form.val() 快速为表单赋值
                form.val("formUserInit", res.data)
            }
        })
    }
    //重置按钮实现
    $("#btns").on("click", function (e) {
        e.preventDefault()
        initUserInif()
    })
    //提交更新用户的基本信息
    $(".layui-form").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/userinfo",
            //快速获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("修改信息失败")
                }
                //console.log("修改成功");
                //调用父页面中的geiUserInif()函数，重新渲染用户的信息
                window.parent.geiUserInif()
            }
        })
    })
})