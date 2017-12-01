
$(function(){

    // 当前页面
    var currentPage = 1;
    var pageSize = 3;


    //发送ajax 获取数据 渲染页面
    function render(){
        $.ajax({
            type:"get",
            url:'/category/querySecondCategoryPaging',
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(data){
                //console.log(data);

                // 准备数据
                var html = template('tpl',data);
                $('tbody').html(html);


                // 分页渲染
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
        })
    }

    render();

    //给按钮注册点击事件   
    $('.btn_add').on('click',function(){
        //1 让模态框显示
        $('#secondModal').modal('show');

        //2 发送ajax请求 动态获取以及分类 渲染下拉菜单
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:1,
                pageSize:100
            },
            success:function(data){
                //console.log(data);

                // 准备数据 
                var html = template('tpl2',data);

                $('.dropdown-menu').html(html);
            }
        });

    });

    // 给所有的下拉选择中所有的a 绑定点击事件 使用事件委托
    $('.dropdown-menu').on('click','a',function(){
        //console.log('heh');
        //将当前a的值 设置给 选择文本 dropdown-text
        var text = $(this).text();
        $('.dropdown-text').text(text);

        // 获取a的id 设置给input 属性选择器
        var id = $(this).data("id");
        console.log(id);
        $('[name="categoryId"]').val(id);

        // 手动设置选择成功 
        $form.data('bootstrapValidator').updateStatus('categoryId','VALID');
    });

    // 图片上传
    $('#fileupload').fileupload({
        dataType: 'json',//指定响应的数据格式
        // 图片上传成功后会执行一个核函数
        done: function (e, data) {
            //console.log(data); //找result 里面就是图片地址
            //通过data.result可以获取到结果
            console.log(data.result.picAddr);
            var src = data.result.picAddr;
            $('.img_box img').attr('src',src);

            //把上传的图片的地址设置给brandlogo
            $("[name='brandLogo']").val(src);

            // 手动设置 上传成功
            $form.data("bootstrapValidator").updateStatus('brandLogo','VALID');
        }
    });



    // 表单检验 表单校验插件
    //默认不校验类型 [':hidden', ':disabled', ':not(:visible)']
    var $form = $('form');

    $form.bootstrapValidator({
        // 设置校验限制
        excluded:[],
         //校验图标
       feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        // 校验规则
        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message:'请选择一级分类'
                    }
                }
            },

            brandName:{
                validators:{
                    notEmpty:{
                        message:'请输入二级分类的名称'
                    }
                }
            },
            brandLogo:{
                validators:{
                    notEmpty:{
                        message:'请上传图片'
                    }
                }
            }
        }
    });

    // 表单校验成功 阻止默认行为  发送ajax请求
    $form.on('success.form.bv',function(e){
        e.preventDefault();
        //发送ajax请求
        $.ajax({
            type:'post',
            url:'/category/addSecondCategory',
            data:$form.serialize(),
            success:function(data){
                //console.log(data);
                if(data.success){
                    //1 让模态框隐藏
                    $('#secondModal').modal('hide');

                    //2 渲染页面
                    page:1;
                    render();



                    // 3 重置表单校验的样式 域值
                    $form.data('bootstrapValidator').resetForm();
                    $form[0].reset();

                    //将下来菜单值改为默认值 
                    $('.dropdown-text').text("请选择一级分类");

                    // 将图片的色织默认
                    $('.img_box img').attr("src",'images/none.png');

                    //将所有阴藏的表单域值位空
                    $('[type="hidden"]').val('');
                }
            }
        });

    })
})