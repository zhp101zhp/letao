

$(function(){

    //定义当前页
    var currentPage = 1;
    //每一信息个数
    var pageSize = 2;

    // 创建空数组  用于存放图片上传结果
    var imgs = [];
    //每次图片上传成功就往数组存储下来上传的结果。
    // 1. 判断数组的长度就知道上传了几张图片
    //2. 点击添加按钮时，需要获取到图片的信息

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
           //console.log(data);

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
            //type属性：
          // 如果是首页---> first
          // 上一页-->prev
          // 下一页-->next
          // 尾页-->last
          // 具体的页码-->page
          totalPages: Math.ceil(data.total / pageSize),
          itemTexts: function (type, page, current) {
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              //如果是page，说明就是数字，只需要返回对应的数字即可
              default:
                return page;
            }
          },
          tooltipTitles: function (type, page, current) {
            switch (type) {
              case "first":
                return "首页";
              case "prev":
                return "上一页";
              case "next":
                return "下一页";
              case "last":
                return "尾页";
              //如果是page，说明就是数字，只需要返回对应的数字即可
              default:
                return "跳转到" + page;
            }
          },
            
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

        // 获取id 将值赋值给隐藏域中的brandname
        var id = $(this).data('id');
        console.log(id);
        $('[name="brandId"]').val(id);

        // 选择的品牌需要手动校验成功

        $form.data('bootstrapValidator').updateStatus('brandId','VALID');
   });




   //表单校验

    //默认不校验类型 [':hidden', ':disabled', ':not(:visible)']
    var $form = $('form');
        // 表单校验
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
                        },

                        //库存不可以位0
                        regexp:{
                            regexp:/^[1-9]\d*$/,
                            message:'请输入一个不是0揩油的数值'
                        }
                    }
                },

                size:{
                    validators:{
                        notEmpty:{
                            message:'请输入商品的尺码'
                        },
                        regexp:{
                            regexp:/^\d{2}-\d{2}$/,
                            message:'请输入正确尺码,例如（32-40)'
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

                // 图片校验

                brandLogo:{
                    validators:{
                        notEmpty:{
                            message:'请上传3张图片'
                        }
                    }
                }
            }
        });

        // 图片上传
        $('#fileupload').fileupload({
            dataType: 'json',
            done:function(e,data){

                // 如果上传图片大一3 就直接返回
                if(imgs.length >= 3){
                    return;
                }

               // console.log(data.result);
                // 在全局中创建一个空数组 用于存放图片图片结果
                // 动态创建图片标签 每上传一次创建一个img标签
                $('.img_box').append('<img src="'+data.result.picAddr+'" width="100" height="100" alt="">');

                //将结果添加到 数组中
                imgs.push(data.result);
                // console.log(imgs);

                //如果数组长度是3 手动设置校验成功
                if(imgs.length === 3){
                    $form.data('bootstrapValidator').updateStatus('brandLogo','VALID');
                }else{
                    $form.data('bootstrapValidator').updateStatus('brandLogo','INVALID');
                }
            }
        });

        // 表单校验成功 阻止默认行为  发送ajax请求
        $form.on('success.form.bv',function(e){
            alert("hahh");
            e.preventDefault();

            //整理请求需要 上传给后台的数据
            var param = $form.serialize();
            
                param += "&picName1="+imgs[0].picName + "&picAddr1=" + imgs[0].picAddr;
                param += "&picName2="+imgs[1].picName + "&picAddr2=" + imgs[1].picAddr;
                param += "&picName3="+imgs[2].picName + "&picAddr3=" + imgs[2].picAddr;
            console.log(param);

            $.ajax({
                type:'post',
                url:'/product/addProduct',
                data:param,
                success:function(data){
                    if(data.success){
                        //让模态框隐藏
                        $('#productModal').modal('hide');

                        //渲染页面
                        page = 1;
                        render();

                        // 重置表单样式
                        $form.data('bootstrapValidator').resetForm();
                        $form[0].reset();

                        // 下拉菜单重置
                        $('.dropdown-text').text('请选择二级分类');
                        $('[name=brandId]').val('');

                        // 清空数组
                        $(".img_box img").remove();
                        imgs=[];
                    }
                }
            });
        })



})