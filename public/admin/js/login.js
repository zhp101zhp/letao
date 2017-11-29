
// 入口函数
$(function(){
    // 表单校验插件：
    //表单校验功能：
    //1 用户名不可以为空
    //2 密码不能为空
    //3 密码长度是6-12位


    //首先找对象
    var $form = $("form");

    //调用bootstrapValidator方法 初始化表单校验

    //在调用了bootstrapValidator方法初始化了表单校验之后，
    //可以通过$form.data('bootstrapValidate')可以得到一个插件对象，
    //通过对象可以调用插件给我们提供的方法
    $form.bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //配置的参数
        //配置校验规则 需要校验的字段 对应表单中的name属性
        fields: {
            username:{
                //配置username所有的校验规则
                validators: {
                    //非空校验
                    notEmpty: {
                        message: "用户名不能为空"
                    },

                    //添加一个提示信息 回调
                    callback:{
                        message:"用户名不存在"
                    }
                }
            },
            password: {
                validators: {
                    notEmpty: {
                        message: "密码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: "密码长度在6-12位"
                    },
                    callback:{
                        message: "密码错误"
                    }
                }
            }
        }
    });


    //给表单注册校验成功事件  success.form.bv

    $form.on("success.form.bv",function(e){
        //阻止浏览器的默认跳转  地址栏不会显示参数
        e.preventDefault();

        //发送AJAX请求 登录
        $.ajax({
            // 根据后台提供的接口文档 
            type:'post',
            url:"/employee/employeeLogin",
            // 获取表单中所有的name属性 也可以一个一个的传对象
            data: $form.serialize(),
            // dataType:'json',  //如果后端返回的相应头有text/html
            success:function(data){
                //console.log(data);
                if(data.success){
                    //跳转到首页
                    location.href = "index.html";
                }
                if(data.error == 1000){
                    //alert("用户名不存在");
                    // 美化提示信息
                    //在调用了bootstrapValidator方法初始化了表单校验之后，
                    //可以通过$form.data('bootstrapValidate')可以得到一个插件对象，
                    //通过对象可以调用插件给我们提供的方法

                    //把用户名的校验失败
                    //第一个参数：想要修改的字段
                    //第二个参数：改成什么状态  INVALID  VALID
                    //第三个参数： 指定显示的错误信息

                    $form.data('bootstrapValidator').updateStatus("username","INVALID","callback");


                }
                if(data.error == 1001){
                    //alert("用户密码错误");
                    $form.data('bootstrapValidator').updateStatus("password","INVALID","callback");
                }
            }
        });
    })

    //重置表单样式 当点击重置时 表单内容重置 但是插件做的小图标不变
    $("[type='reset']").on("click",function(){
        //需要重置表单的样式,需要获取到插件对象
        $form.data("bootstrapValidator").resetForm();
    });
});