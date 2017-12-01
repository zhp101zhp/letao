

$(function(){

    //根据后台提供的接口文档 去后台获取数据 渲染到页面

    //1 当前页码
    //2 记录每页的数量

    var currentPage = 1;
    var pageSize = 5;

    //分页渲染数据
    function render(){
        //发送AJAX请求
        $.ajax({
            type: 'get',
            url: '/user/queryUser',
            data:{
                page: currentPage,
                pageSize: pageSize
            },
            success:function(data){
                //console.log(data);
                //获取数据 让模板数据融合
                //参数一 模板id 
                //参数二 对象 模板与对象绑定之后 模板可以直接使用对象中的属性
                //准备数据
                var html = template("tpl",data);
            
                $('tbody').html(html);

                // 渲染分页
                $('#paginator').bootstrapPaginator({
                    // 指定版本号 如果是二可以不写
                    //默认是2 div，如果是bootstrap3版本，这个参数必填 并且必须是ul
                    bootstrapMajorVersion: 3,
                    currentPage: currentPage,
                    totalPages:Math.ceil(data.total/data.size),
                    numberOfPages: 5, //一页显示的页码数
                    //size:"small",//设置控件的大小，mini, small, normal,large
                    //为按钮绑定点击事件 page:当前点击的按钮值
                    onPageClicked:function(a,b,c,page){
                        console.log(page);
                        //修改当前叶
                        currentPage=page; //点击谁让谁显示
                        //重新渲染页面表格数据
                        render();
                    }
                })
            }
        })
    }

    // 页面加载就渲染
    render();

    // 启用禁用委托事件

    $('tbody').on('click','.btn',function(){
        //1 显示模态框
        $('#userModal').modal('show');
        //3 获取到id 通过模板渲染中存的
        var id = $(this).parent().data("id");
        //4 获取isDelete 判断状态
        var isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
        //console.log(id);
        //console.log(isDelete);

        //2  注册前先把之前的清除
        $(".btn-confirm").off().on('click',function(){
           console.log("hh");
            //5 发送请求 改变状态 并禁用
            $.ajax({
                type:'post',
                url:'/user/updateUser',
                data:{
                    id:id,
                    isDelete:isDelete
                },
                success:function(data){
                   // console.log(data);
                   if(data.success){
                       //成功
                       //6 让模态框隐藏
                       $('#userModal').modal('hide');
                      // 7重新渲染页面
                      render();
                   }
                }
            });

        })

    })
    
});