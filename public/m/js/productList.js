$(function(){
    //开始页面就应该有渲染的页面

    //1 获取到地址栏的参数 把key放到input框里面  location.href 整个地址 location.search地址栏参数
    //调用封装好的方法
    var key = Tools.getParam('key');
    $(".lt_search input").val(key);
    //2 发送ajax请求 获取关键字对应的商品 渲染页面
    render();
    //3 点击搜索按钮再次发送ajax请求 获取关键字 对应的商品 再次渲染页面

    $('.lt_search button').on("click",function(){

        render();
    })
    //4 排序功能 点击价格 排序
    //1. 需要给排序的a有排序类型标签并且有排序类型的注册点击事件
    $(".lt_sort a[data-type]").on('click',function(){
        //alert("jjj");
        var $this = $(this);
        //如果当前a没有now这个类 添加now  移除其他的now类
        if($this.hasClass('now')){
             //如果有 改变箭头方向
             $this.find("span").toggleClass('fa-angle-down').toggleClass('fa-angle-up');
        }else{
            $this.addClass('now').siblings().removeClass('now');
            // 让所有的span 箭头方向指向下
            $('.lt_sort span').addClass("fa-angle-down").removeClass('fa-angle-up');
        }
        // 重新渲染 传参
        render();
       
    })

    // 封装函数
    function render(){
        //参数对象：
        var param = {};//空对象
        ////获取关键字
        param.proName = $('.lt_search input').val().trim();
        param.page = 1;
        param.pageSize = 100;

        //添加排序的参数 如果有now类 考虑排序 反之不考虑
        //考虑排序字段，如果lt_sort下的a有now的类，说明需要排序，如果都没有now这个类，说明不需要排序,,,,,,,,,如果需要排序，只需要给param加一个参数即可（price/num）,如果不需要排序，不给param加个参数即可。

        //获取lt_sort下被选中的a
        var $now = $(".lt_sort a.now");
        if($now.length === 1){
            //说明要排序
            var type = $now.data('type');
            //根据箭头的方向获取排序的值
            var value = $now.find("span").hasClass("fa-angle-down")?2:1;
            param[type] = value;
        }
        $('.lt_product').html(' <div class="loading"></div>');
        $.ajax({
            type:'get',
            url:'/product/queryProduct',
            data:param,
            success:function(data){
                console.log(data);
                setTimeout(function(){
                    // 准备数据 数据与模板结合 渲染页面
                    var html = template('tpl',data);
                    $('.lt_product').html(html);
                },1000);
            }
        })
    }
});