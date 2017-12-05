$(function(){

    //发送ajax 获取个人信息 渲染页面
    $.ajax({
        type:'get',
        url:'/user/queryUserMessage',
        success:function(data){
            //console.log(data);
            //准备数据 与模板融合
            var html = template("tpl", data);

            $('.userinfo').html(html);
        }
    });


    // 退出功能
    //1给退出按钮注册点击事件
    $('.btn_logout').on('click',function(){
        //alert("hhh");
        //发送ajax请求
        $.ajax({
            type:'get',
            url:"/user/logout",
            success:function(data){
                //console.log(data);
                if(data.success){
                    location.href = "login.html";
                }
            }
        })
    })
})