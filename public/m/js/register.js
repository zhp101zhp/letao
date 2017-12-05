$(function(){
    //1 获取验证码功能
    $(".btn_vCode").on('click',function(e){
        // 阻止默认行为 表单中的 button有submit一样的功能
        e.preventDefault();
        //给按钮加 类禁用此按钮
        var $this = $(this);
        $this.prop("disabled", true).text("正在发送中...").addClass("disabled");
        
        $.ajax({
            type:'get',
            url:'/user/vCode',
            success:function(data){
                console.log(data.vCode);//打印后台给的验证码

                //成功开启定时器 显示验证时间
                var count = 5;
                var timer=setInterval(function(){
                    count--;
                    $this.text(count+'秒后再次发送');

                    if(count <=0 ){
                        //清除定时器 重新启动按钮
                        clearInterval(timer);
                        $this.prop("disabled",false).removeClass('disabled').text("再次发送");
                    }

                },1000);

            }
        })
    })
    //2 当点击注册按钮时 对表单进行校验
    $(".btn_register").on('click',function(e){
        //alert("hhh");
        e.preventDefault();

        var $this = $(this);
        //对表单进行校验
        var username = $("[name='username']").val();
        var password = $("[name='password']").val();
        var repassword = $("[name='repassword']").val();
        var mobile = $("[name='mobile']").val();
        var vCode = $("[name='vCode']").val();

        if(!username){
            mui.toast("请输入用户名");
            return false;
        }

        if(!password){
            mui.toast("请输入用户密码");
            return false;
        }

        if(repassword != password){
            mui.toast("确认密码与密码不一致");
            return false;
        }

        if(!mobile){
            mui.toast("请输入手机号");
            return false;
        }
        if(!/^1\d{10}$/.test(mobile)){
            mui.toast("请输入正确的手机号");
            return false;
        }

        if(!vCode){
            mui.toast("请输入验证码");
        }

        // 校验成功 发送ajax 
        $.ajax({
            type:'post',
            url:"/user/register",
            data:$('form').serialize(),//表单序列话 
            success:function(data){
                console.log(data);
                //成功 跳转到登录页面
                if(data.success){
                    mui.toast("恭喜你，注册成功了，1秒后跳转到登录页面");
                    setTimeout(function () {
                      location.href = "login.html";
                    }, 1000);
                  }
          
                  if(data.error){
                    mui.toast(data.message);
                  }
            }
        })
    })

})