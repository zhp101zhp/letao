$(function(){

    //发送ajax请求 获取到购物车的数据 渲染到页面
    // 下拉刷新 mui组件
    mui.init({
        pullRefresh : {
          container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
          down : {
            auto:true,//自动下拉刷新
            callback : function(){
                //console.log('hheheh');
                $.ajax({
                    type:'get',
                    url:'/cart/queryCart',
                    success:function(data){
                        //console.log(data);
                        setTimeout(function(){
                            //未登录
                            if(data.error === 400){
                            location.href = "login.html?retUrl="+location.href;
                            }
            
                             // data 是一个数组
                            var html = template('tpl',{list:data});
                            $('#OA_task_2').html(html);

                            // 页面渲染结束 结束刷新
                            //注意，加载完新数据后，必须执行如下代码，注意：若为ajax请求，则需将如下代码放置在处理完ajax响应数据之后
                            //没有更多内容了，endPulldown这个方法错误 传入true， 不再执行下拉刷新  
                             mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
                        },1000)
                    }
                });   
                
            } //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
          }
        }
      });






   
   
   
    // 删除功能
    //1 给删除按钮注册点击时间
    //2 获取自定义属性id
    //3 发送ajax请求 删除数据 重新渲染页面

    // 委托事件  注意 使用mui下啦刷新有一个 bug 注册click 无效使用其他事件都可以
    $('#OA_task_2').on('tap','.btn_delete', function(){
        //console.log("hhh");
        var $this = $(this);
        var id = $this.data("id");
        // 提示信息
        mui.confirm("您是否要删除这件商品","温馨提示",["是","否"],function(e){
            if(e.index === 0){
                $.ajax({
                    type:'get',
                    url:'/cart/deleteCart',
                    data:{
                        // 也可以传数组
                        id:[id]
                    },
                    success:function(data){
                        //成功 下拉刷新
                        //console.log(data);
                        if(data.success){
                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                        }
                    }
                });
            }
        });
    });



    // 修改功能
    // 1 给修改按钮注册点击事件 
    //2 获取点击的id
    //3 发送ajax请求  获取id对应的商品信息
    //4 把信息回显
    //5 修改信息

    $('#OA_task_2').on('tap','.btn_edit',function(){

        //dataset 时原生js中获取自定义属性的方法所有data开头的都会存储在dataset中
        var data = this.dataset;
        //console.log(data);
        //提示框
        var html = template("tpl2",data);
          /* 编辑修改框的样式 */
        // 需要将html中所有的换行给去掉  全局中所有的\n
        html = html.replace(/\n/g,"");
        mui.confirm(html,"编辑商品",['确定','取消'],function(e){
            if(e.index === 0){
                //获取 id尺码 数量
                var id = data.id;
                var size = $('.lt_edit_size span.now').text();
                var num = $('.mui-numbox-input').val();

                // 发送alax请求
                $.ajax({
                    type:"post",
                    url:"/cart/updateCart",
                    data:{
                        id:id,
                        size:size,
                        num:num
                    },
                    success:function(info){
                        //console.log(info);
                        if(info.success){
                            //成功 下拉刷新
                            mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
                        }
                    }
                })
            }
        });
        // 选择尺码 x
        $('.lt_edit_size span').on("tap",function(){
            $(this).addClass('now').siblings().removeClass("now");
        });
        // 重新初始化numbox
        mui(".mui-numbox").numbox();

    });


    //给所有ck注册点击事件 只要状态改变就获取
    $('#OA_task_2').on('change','.ck', function(){
        // 获取被选中的复选框 从而获取他对应的商品的价格  和购物车中的个数
        var total = 0; //总金额
        $(':checked').each(function(){
            //可以不传参数 i e 用this获取当前元素
            //console.log(this);
            var price = $(this).data("price");
            var num = $(this).data("num");
            // total值可能为小数  出现经度丢失 保留两位小数
            total +=price * num;
            console.log(total);
        });
        // tofixed保留两位小数
        $('.total').text(total.toFixed(2));
    })
})