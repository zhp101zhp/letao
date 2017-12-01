

$(function(){

    //定义当前页
    var currentPage = 1;
    //每一信息个数
    var pageSize = 2;

   function render(){
        //发送ajax请求 获取后台提供的数据 渲染页面
    $.ajax({
        type:'get',
        url:'/product/queryProductDetailList',
        data:{
            page: currentPage,
            pageSize: pageSize
        },
        success:function(data){
           console.log(data);

           //准备数据 数据与模板结合
           var html = template('tpl',data);
           $('tbody').html(html);



        //  渲染分页
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
   render();

   //给添加商品绑定点击事件
   $('.btn_add').on('click',function(){
       //1 让模态框显示
       $('#productModal').modal('show');

       //2 发送ajax请求 获取二级分类 渲染页面

       $.ajax({
           type:'get',
           url:'/category/querySecondCategoryPaging',
           data:{
               page:1,
               pageSize:100
           },
           success:function(data){
                //console.log(data);

                //准备数据 数据与模板结合
                var html = template('tpl2',data);

                $('.dropdown-menu').html(html);
           }
       })
   });

   //给下拉菜单张所有的a 准测点击选中事件  利用事件委托
   $('.dropdown-menu').on('click','a',function(){
       //获取当前文本  赋值给dropdown-text
       var text = $(this).text();
       $('.dropdown-text').text(text);
   });




   //表单校验

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
                brandId:{
                    validators:{
                        notEmpty:{
                            message:'请选择二级分类'
                        }
                    }
                },
    
                proName:{
                    validators:{
                        notEmpty:{
                            message:'请输入商品的名称'
                        }
                    }
                },
                proDecs:{
                    validators:{
                        notEmpty:{
                            message:'请输入商品的描述'
                        }
                    }
                },

               num:{
                    validators:{
                        notEmpty:{
                            message:'请输入商品的库存'
                        }
                    }
                },

                size:{
                    validators:{
                        notEmpty:{
                            message:'请输入商品的尺码'
                        }
                    }
                },

                oldPrice:{
                    validators:{
                        notEmpty:{
                            message:'请输入商品的原价'
                        }
                    }
                },

                price:{
                    validators:{
                        notEmpty:{
                            message:'请输入商品的价格'
                        }
                    }
                },

                proDesc:{
                    validators:{
                        notEmpty:{
                            message:'请输入商品的描述'
                        }
                    }
                },
            }
        });
})