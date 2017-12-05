// 入口函数
$(function(){

    //约定存储 历史纪录的K为 history 以后增删改查都使用history
    //一 列表的渲染功能 
    //获取数据可以封装一个函数
    function getHistory(){
        //1 从localstorage中获取历史纪录  如果没有数据也要确保是个空数组 
        var history = localStorage.getItem('history') || "[]";
        //2 将获取到的字符串类型数据转换成 数组
        var arr = JSON.parse(history);
        //console.log(arr);

        return arr;
    }
    

   //封装渲染功能
   function render(){
        //3 将拿到的历史纪录数组渲染到页面
        var arr = getHistory();
        console.log(arr);
        //要传一个对象 
        $('.lt_history').html(template("tpl",{list:arr}));
   }

   //列表渲染功能
   //1. 从本地缓存中获取到数据，并且转换成了数组
   //2. 结合模版引擎，把数据渲染出来
   render();


   //二 清空记录逻辑

   //1 给清空按钮注册点击事件  委托
   $('.lt_history').on('click','.btn_empty',function(){
    mui.confirm("您是否要清空记录?","温馨提示", ["否", "是"], function(e){
        if(e.index == 1){
            //2 将localStorage中的history数据清空
            localStorage.removeItem("history");
            //3 重新渲染
            render();
        }
    });
   })

   // 三 删除的逻辑

   //1 给 X注册点击事件
   //2 获取点击的下标
   //3 获取本地缓存 得到数组
   //4 删除数组对应的下标
   //5 重新设置缓存
   //6 重新渲染
   $(".lt_history").on("click",".btn_delete",function(){

    // this指向变了
    var index = $(this).data("index");

    // 添加提示窗口
    mui.confirm("您是否要删除这条记录?","温馨提示", ["确定", "取消"], function(e){
        if(e.index == 0){
            //alert("kkk");
            //获取对应的下标
            //var index = $(this).data('index');
            //console.log(index);
            //获取本地和缓存
            var arr = getHistory();
            //删除arr的index项
            //push pop unshift shift  slice splice
            //slice :数组截取  原数组不变 删除数组中的第一项
            arr.splice(index,1);
            //console.log(arr);
            // 数组数据删除 但本地缓存中还存在
            localStorage.setItem("history",JSON.stringify(arr));
            render();

           
        }
    });
   });



   //添加逻辑
   //1 注册点击事件
   //2 获取输如的关键字
   //3 获取本地缓存 得到数组
   //4 吧关键字添加到数组中的最前面 unshift
   //5 重新设置 缓存
   //6 重新渲染

//    需求 ： 历史纪录不可以超过10条 不可以重复 重复放到最前面

 $('.lt_search button').on("click",function(){
    //获取输入框内容 设置为关键字
    var key = $(".lt_search input").val().trim(); //去空格
    //    清空输入框内容
    $(".lt_search input").val("");
    if(key === ''){
        //alert("请输入关键字");
        mui.toast('请输入搜索关键字');
        return false;
    }
    var arr = getHistory();
    //    满足需求 家之前做判断
    var index = arr.indexOf(key);
    if(index != -1){
        //存在删除
        arr.splice(index,1);
    }
    if(arr.length >= 10){
        //删除左后一条记录
        arr.pop();
    }
    arr.unshift(key);

    localStorage.setItem("history",JSON.stringify(arr));
    render();
     //页面跳转到搜索列表页
     location.href = "productList.html?key="+key;
     
})
   

});