
// 入口函数
$(function(){

    // ajax全局事件处理  .ajaxStart()发送  .ajaxStop()结束  .ajaxSuccess()成功

    $(document).ajaxStart(function(){
        //console.log("赫赫");
        // 开启进度条
        NProgress.start();
    })

    $(document).ajaxStop(function(){
        //console.log("呵呵呵");
        //结束进度条
        NProgress.done();
    });

    //非登陆页 发送AJAX请求   询问是否登录  如果没有登录 跳转到登录叶

    if(location.href.indexOf('login.html') ==-1){
        $.ajax({
            type:'get',
            url:"/employee/checkRootLogin",
            success:function(data){
                //console.log(data);
                if(data.error === 400){
                    location.href= 'login.html';
                }
            }
        })
    }
   



    // 二级菜单的显示与隐藏 给a注册点击事件
    $(".child").prev().on('click',function(){
        //让当前元素的下一个元素显示
        //$(this).next().slideDown();
        // 需要来回切换
       $(this).next().slideToggle();
    });

    // 侧边栏的显示与隐藏
    $(".icon_menu").on('click',function(){
       // alert("jj");
        $(".lt-aside").toggleClass('now');
        $(".lt-main").toggleClass('now');
    });


    //退出功能
    $(".icon_logout").on("click",function(){
        //alert("heh");
        //弹出模态框
        $("#logoutModal").modal("show");

        // 点击退出时 需要向后台发送AJAX请求 告知后台把你的信息清除
        //因为jquery注册事件不会覆盖。
        //off()解绑所有的事件  不解绑会触发多次
        //off("click")
        $(".btn-logout").on('click',function(){
            $.ajax({
                //  
                type:'get',
                url:'/employee/employeeLogout',

                success:function(data){
                    //console.log(data);
                    if(data.success){
                        location.href='login.html';
                    }
                }
             });
            
        })
    })

})