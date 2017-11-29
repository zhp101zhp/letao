
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
    })

})