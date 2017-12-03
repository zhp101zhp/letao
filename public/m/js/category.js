
$(function(){

    //发送ajax请求 获取后台数据 渲染侧边栏
    $.ajax({
        type:'get',
        url:'/category/queryTopCategory',
        //不需要数据
        success:function(data){
           // console.log(data);
           //主备数据
           var html = template('tpl_left',data);

           //数据模板结合
           $('.category_left .mui-scroll').html(html);

            //渲染二级分类
            var id = data.rows[0].id;
            renderSecond(id);
        }
    });

    // 给侧边栏一级注册点击事件 获取器id
    $('.category_left .mui-scroll').on('click','li',function(){
        // 给当前元素 添加now类 让他的兄弟移除此类
        $(this).addClass('now').siblings().removeClass('now');


        //获取当前元素id
        var id = $(this).data('id');

        renderSecond(id);


         //滚动到0，0点
         //mui('.mui-scroll-wrapper').scroll()获取到页面中所有的滚动容器,如果有多个，会返回一个数组。
        mui('.mui-scroll-wrapper').scroll()[1].scrollTo(0,0,500);//100毫秒滚动到顶

    });

    // 根据一级菜单提供的 id 查询对应的二级分类中的品牌 渲染到页面
    function renderSecond(id){
        $.ajax({
            type:'get',
            url:'/category/querySecondCategory',
            data:{
                id:id
            },

            success:function(data){
                //console.log(data);
                var html = template('tpl_right',data);

                $('.category_right .mui-scroll').html(html);
            }
        });
    }

})