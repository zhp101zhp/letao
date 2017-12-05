
// 区域滚动插件初始话

// 配置参数象
/* options = {
    scrollY: true, //是否竖向滚动
    scrollX: false, //是否横向滚动
    startX: 0, //初始化时滚动至x
    startY: 0, //初始化时滚动至y
    indicators: true, //是否显示滚动条
    deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
    bounce: true //是否启用回弹
   }
   */
mui('.mui-scroll-wrapper').scroll({
    // //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    deceleration: 0.0005,
    //是否显示滚动条 默认显示
    indicators:false
});

// 轮播图
//mui框架内置了图片轮播插件，通过该插件封装的JS API，用户可以设定是否自动轮播及轮播周期，如下为代码示例：

//获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
});
//因此若希望图片轮播不要自动播放，而是用户手动滑动才切换，只需要通过如上方法，将interval参数设为0即可。


// 获取地址栏参数
// function getParamObj(){ 
//     //获取参数列表
//     var search = location.search;

//     //对参数进行解码  ?name=hucc&age=18&desc=帅的一匹
//     //对参数进行解码
//     search = decodeURL(search);

//     //切掉前面的？//把?切掉  name=hucc&age=18&desc=帅的一匹
//     search = search.slice(1);

//     //把字符串切割成一个数组  ["name=hucc", "age=18", "desc=帅的一匹"]
//     var arr = search.split('&');

//     //遍历数组 把值存到对象中
//     var obj = {};
//     arr.forEach(function(e,i){
//         //将每一象切割成数组
//         var key = e.split('=')[0];
//         var value = e.split("=")[1];
//         obj[key] = value;
//     });
//     return obj;
// }

// // 获取指定的参数
// function getParam(key){
//     return getParamObj()[key];
// }


var Tools = {
    getParamObj: function () {
        //获取参数列表
        var search = location.search;
    
        //对参数进行解码  ?name=hucc&age=18&desc=帅的一匹
        search = decodeURI(search);
    
        //把?切掉  name=hucc&age=18&desc=帅的一匹
        search = search.slice(1);
    
        //把字符串切割成一个数组  ["name=hucc", "age=18", "desc=帅的一匹"]
        var arr = search.split("&");
    
        //遍历数组，把值存到对象中
        var obj = {}
        arr.forEach(function (e) {
          var key = e.split("=")[0];
          var value = e.split("=")[1];
          obj[key] = value;
        });
    
        return obj;
      },
      getParam: function (key) {
        return this.getParamObj()[key];
      }
} 