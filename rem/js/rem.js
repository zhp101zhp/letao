// 千万注意：不要添加入口函数
// 同时引用的时候放到最前面

// 获取html元素
var html =  document.documentElement;
// 获取屏幕的宽度
var screenWidth = html.clientWidth;
var timer = null;
// 初始的设计图的大小
var uiWidth = 540;
// 初始的font-size的大小
var fonts = 40;
// 获取初始的比例
var bili = uiWidth/fonts;
// 根据当前屏幕大小动态去计算这个屏幕所对应font-size值
html.style.fontSize = screenWidth/bili + 'px';

// 上来的时候先执行一次
getSize();

window.onresize = getSize;

function getSize(){
	clearTimeout(timer);
	timer = setTimeout(function(){
		// 重新得到屏幕的宽度
		screenWidth = html.clientWidth;
		// 针对屏幕宽度做限定
		if(screenWidth <= 320){
			html.style.fontSize = 320/bili + 'px';
		}else if(screenWidth >= uiWidth){
			html.style.fontSize = uiWidth/bili + 'px';
		}else{
			// 根据当前屏幕大小动态去计算这个屏幕所对应font-size值
			html.style.fontSize = screenWidth/bili + 'px';
		}	
	}, 100);
}