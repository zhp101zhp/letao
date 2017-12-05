/**
 * Created by HUCC on 2017/12/3.
 */
$(function() {
    
      //获取地址栏中的参数，得到商品的id
      //发送ajax请求，获取商品的数据
      var id = Tools.getParam("productId");
      console.log(id);
    
      $.ajax({
        type:"get",
        url:"/product/queryProductDetail",
        data: {
          id:id
        },
        success:function (data) {
    
    
          //var sizeArray = [];
          //var temp = data.size.split("-");
          //for(var i = +temp[0]; i <= temp[1]; i++) {
          //  sizeArray.push(i);
          //}
          //
          //data.sizeArray = sizeArray;
    
          console.log(data);
          $(".mui-scroll").html( template("tpl", data) );
    
          //重新初始化轮播图
          mui(".mui-slider").slider({
            interval:1000
          })
    
          //尺码选择
          $(".lt_size span").on("click" ,function () {
            $(this).addClass("now").siblings().removeClass("now");
          });
    
          //重新初始化数字输入框
          mui(".mui-numbox").numbox();
    
    
    
        }
      });

      // 1 给加入购物车按钮注册点击事件 发送ajax请求
      $('.btn_add_cart').on('click',function(){
        //获取尺码
        var size = $('.lt_size span.now').text();
        if(!size){
          mui.toast("请选择尺码");
          return false;
        }
        var num = $('.mui-numbox-input').val();
        console.log(num);

        $.ajax({
          type:'post',
          url:'/cart/addCart',
          data:{
            productId:id,
            size:size,
            num :num
          },
          success:function(data){
            //console.log(data);
            if(data.error === 400){
              //未登录
              location.href = "login.html";
            }

            if(data.success){
              //如果登陆了 添加成功
            mui.confirm("添加成功","提示",["去购物车","再逛逛"],function(e){
                if(e.index ===0){
                  location.href = "cart.html";
                }
            });
            }
          }
        })
      })
    
    
    });