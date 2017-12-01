

$(function(){

    // 渲染分页
    //1 定义当前页码
    var currentPage = 1;
    
    //每一页可以放的数据个数
    var pageSize = 5;


    //页面一加载 就渲染
    function render(){
        //发送ajax请求 获取数据 渲染到页面
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(data){
                //console.log(data);

                //准备数据 并融合
                var html = template('tpl',data);
                $('tbody').html(html);

                // 渲染分页
                $('#paginator').bootstrapPaginator({

                    //版本
                    bootstrapMajorVersion:3,
                    //当前页面
                    currentPage:currentPage,
                    // 总页码数
                    totalPages:Math.ceil(data.total/data.size),

                    // 点击对应页面跳转
                    onPageClicked:function(a,b,c,page){
                        //指定当前叶
                        currentPage= page;
                        //重新渲染页面
                        render();
                    }

                });
            }
        });
    }

    //调用
    render();



    // 添加一级分类功能
    //给按钮注册点击事件
    $('.btn_add').on('click',function(){

        //显示模态框
        $('#addModal').modal('show');

    })

    // 表单校验
   var $form = $('form');
   $form.bootstrapValidator({
       //校验图标
       feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 配置校验规则
        fields: {
            categoryName: {
      
                validators: {
                    notEmpty: {
                         message: "一级分类的名称不能为空"
                    }
                }
      
            }
        }    
   });

 // 注册校验成功
 //注册校验成功事件，阻止默认行为，使用ajax提交
 $form.on("success.form.bv", function (e) {
    //  阻止submit默认行为
    e.preventDefault();

    //console.log("呵呵");
    $.ajax({
      type: "post",
      url:"/category/addTopCategory",
    //   获取所有含有name属性的
      data: $form.serialize(),
      success:function(data) {
        //console.log(data);
        //让模态框隐藏
        $('#addModal').modal('hide');
        
        //重新渲染第一页 因为新增的分类在第一页
        page=1;
        // 重新渲染页面
        render();

        // 需要清空表单的值与央视
        $form.data('bootstrapValidator').resetForm();

        //重置表单的value值
        $form[0].reset();
      }
    });
  });

})