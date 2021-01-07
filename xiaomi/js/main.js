/*根据id获取对象*/
function $(str) {
    return document.getElementById(str);
}

// 检查是否为已注册用户登录
(function logIn(){
	url = window.location.search;
	var val = "";
	for(var j = 1;j<url.length;j++){
		val += url[j]
	}
	var para = atob(val);
	var login = $("login");
	var logout = $("logout");
	var nickname = $("nickname"); 
	if (para.length == 0){
		logout.style.display = "block";
		login.style.display = "none";
	}
	else {
		if (users.indexOf(para) != -1){
			nickname.innerText = account[users.indexOf(para)];
		}
		else {
			nickname.innerText = account[email.indexOf(para)];
		}
		logout.style.display = "none";
		login.style.display = "block";
	}
})()
//点击登录按钮界面跳转及传参
var regis =$("regis");
regis.onclick = function (){
	window.location.href = "loginform.html?qq"
}
// 已登录用户退出登录
function logOut(){
	var login = $("login");
	var logout = $("logout");
	var exit = $("exit")
	logout.style.display = "block";
	login.style.display = "none";
}

// 检查购物车数量并显示相应的商品
function checkGoods(){
	var goodCount = $("goodCount").innerText;
	var nogood = $("nogood");
	var boxlist = $("boxlist");
	var total = $("total")
	if (goodCount != "0"){
		boxlist.style.display = "block";
		total.style.display = "block";
		nogood.style.display = "none";
	}
	else{
		boxlist.style.display = "none";
		total.style.display = "none";
		nogood.style.display = "block";
	}
	
	
}

checkGoods();

// 加入购物车
function addTOGoodBox(obj) {
	var goodCount = $("goodCount").innerText;
	var goodnum = $("goodnum").innerText;
	var totalprice = $("totalprice").innerHTML;
	var childnodes = obj.parentNode.childNodes;
	var boxlist = $("boxlist");
	var len = childnodes.length;
	var pic="";
	var price="";
	var name="";
	for (var i=1;i<len;i = i+2){
		if (childnodes[i].className=="pic"){
			pic = childnodes[i].firstChild.src;
		}
		else if (childnodes[i].className=="price"){
			price = childnodes[i].firstChild.innerText
		}
		else if (childnodes[i].className=="name"){
			goodname = childnodes[i].firstChild.innerText
		}
		else {
			continue;
		}
	}
	
	var li = document.createElement("li")
	li.innerHTML = "<a href='' class='pic'><img src='"+ pic + "' alt='素材'></a><div class='unit-type'>" + goodname + "</div><div class='num-price'><h4>" + price + "<span>× 1</span></h4><i onclick='delFromBox(this)'>X</i></div>"
	boxlist.appendChild(li);
	goodCount = parseInt(goodCount) + 1;
	totalprice = parseInt(price) + parseInt(totalprice)
	$("goodCount").innerText = goodCount;
	$("goodnum").innerText = goodCount;
	$("totalprice").innerHTML = totalprice;
	checkGoods();
}

// 点击购物车里商品的X号删除商品
function delFromBox(obj){
	var goodCount = $("goodCount").innerText;
	var goodnum = $("goodnum").innerText;
	var boxlist = $("boxlist");
	var totalprice = $("totalprice").innerHTML;
	var grand = obj.parentNode.parentNode;
	var pri = obj.previousSibling.innerText.slice(0,-3)
	totalprice = parseInt(totalprice)-parseInt(pri);
	goodnum = parseInt(goodnum) - 1;
	$("goodnum").innerText = goodnum;
	$("goodCount").innerText = goodnum;
	$("totalprice").innerHTML = totalprice;
	grand.parentNode.removeChild(grand);
	checkGoods();
}

// 轮播导航
var bannerBox = $("bannerBox");
var bannerList = bannerBox.children[0];
var prevBtn = bannerBox.children[1];
var nextBtn = bannerBox.children[2];
var page = bannerBox.children[3];
var imgwidth = bannerList.children[0].offsetWidth;
var pic = 0;
var pagelen = page.children.length;
page.children[0].className = "current";
var timeId = setInterval(onmouseclickHandle,3000);
bannerBox.onmouseover=function(){
	clearInterval(timeId);
}

bannerBox.onmouseout=function(){
	timeId = setInterval(onmouseclickHandle,3000);
}



// 清除按钮样式
function clearstyle(obj){
	for (var j=0;j<pagelen;j++){
		page.children[j].removeAttribute("class");
	}
	obj.className = "current";
}


 nextBtn.onclick = onmouseclickHandle;
 prevBtn.onclick = function (){
	if (pic == 0){
		pic = pagelen-1;
	}
	else {
		pic -= 1;
	}
	bannerList.style.left = -pic*imgwidth +"px";
	clearstyle(page.children[pic]);
}
// 跳转实现
function onmouseclickHandle(){
	if (pic == pagelen-1){
		pic = 0;
	}
	else {
		pic += 1;
	}
	bannerList.style.left = -pic*imgwidth +"px";
	clearstyle(page.children[pic]);
}
// 点击圆点跳转
function onclickpage(obj){
	for (var i=0;i<pagelen;i++){
		if (page.children[i]===obj){
			pic = i;
			bannerList.style.left = -pic*imgwidth +"px";
			clearstyle(page.children[pic]);
			break;
		}
		else {
			continue;
		}
	}
}


// 回顶部
(function backToTop(){
	var back = $("toTop");
	window.onscroll=function displayBtn(){
		var scrollY = window.scrollY;
		if (scrollY>=800){
			back.style.display="block";
		}
		else{
			back.style.display="none";
		}
	}
	back.onclick = function backtotop(){
		window.scrollTo(0,0);
	}
})();



//默认热门的区域内容显示
var goodbox = document.getElementsByClassName("idx-box");
for (j=0;j<goodbox.length;j+=1){
	goodbox[j].children[1].style.display="block";
}
// 大内容区内容切换
function switchgood(para1,para2){
	var plates=document.getElementsByClassName("plates");
	var para1 = para1;
	var para2 = para2;
	for(var i=0;i<plates[para1].children.length;i+=1){
		plates[para1].children[i].removeAttribute("class");
		goodbox[para1+1].children[i+1].style.display="none";
	}
	plates[para1].children[para2].className="active";
	goodbox[para1+1].children[para2+1].style.display="block";
}

var vedioState = $("state").innerText;
var videoList = ["video1.mp4","video2.mp4","video3.mp4","video4.mp4"];
var videoTotalTimeList = ["131:08","06:31","01:33","06:08"]
var myvideo = document.getElementsByTagName("video")[0];
// 点击弹框播放视频
function popUp(num){
	var index = num-1;
	myvideo.src = "./img/"+videoList[index];
	var totalTime = $("totalTime");
	var playIcon = $("playIcon");
	var vBgc = $("videoBgc");
	var video = $("video");
	var playBtn = $("playBtn");
	var duration = $("cur");
	var currentVolum = $("currentVolum");
	vBgc.style.display="block";
	video.style.display="block";
	video.style.top="50%";
	playBtn.style.display="none";
	myvideo.load();
	myvideo.play();
	totalTime.innerText = videoTotalTimeList[index];
	vedioState = "play";
	playIcon.style.backgroundPosition="0 -20px";
	duration.innerText="00:00";
	myvideo.volume = 0.3;
	currentVolum.style.width = "25%";
	control();
}


// 视频区域实现
//视频控制区域实现
function control(){
	var vBgc = $("videoBgc");
	var video = $("video");
	var close=$("close");
	var playBtn = $("playBtn");
	var playIcon = $("playIcon");
	var duration = $("cur");
	var controls = $("controls");
	var progressBar = $("progressBar");
	var totalTime = $("totalTime").innerText;
	var videoProgressBar = $("videoProgressBar");
	var iconVol = $("iconVol");
	var volState = $("volState").innerText;
	var vol = myvideo.volume;
	var currentVolum = $("currentVolum");
	var volBar = $("volBar");
	var videoBox = $("videoBox");
	var screenState = $("screenState").innerText;
	var fullScreen = $("fullScreen");
	var totalSeconds = parseInt(totalTime.split(":")[0])*60+parseInt(totalTime.split(":")[1]);
	videoBox.onmouseover = function (){
		controls.style.display="block";
	}
	videoBox.onmouseout = function (){
		controls.style.display="none";
	}
	//点击进度条实现进度的快进和快退
	videoProgressBar.addEventListener(
	  'click',
	  function (e) {
		progressBar.style.width = ((e.offsetX/880)*100).toFixed(1) + "%";
		myvideo.currentTime = (e.offsetX/880)*totalSeconds;
	  },
	  false
	);
	//播放时长的显示
	myvideo.ontimeupdate=function(){
		var minute = parseInt(parseInt(myvideo.currentTime)/60);
		var second = parseInt(myvideo.currentTime)%60;
		var progress = parseInt(myvideo.currentTime)/totalSeconds;
		progressBar.style.width = (progress*100).toFixed(1) + "%";
		if (minute<10){
			minute = "0"+minute;
		}
		if (second<10){
			second = "0"+second;
		}
		duration.innerText = minute+":"+second;
	}
	//点击音量图标实现静音和恢复音量
	iconVol.onclick = function (){
		if (volState=="mute"){
			iconVol.style.backgroundPosition="left -40px";
			volState=vol;
			myvideo.volume=vol;
			
			currentVolum.style.width = (vol*100).toFixed(1) + "%";
		}
		else{
			iconVol.style.backgroundPosition="left -80px";
			volState="mute";
			vol = myvideo.volume;
			myvideo.volume=0;
			currentVolum.style.width = 0;
		}
	}
	//点击进度条实现音量的调整
	volBar.addEventListener(
	  'click',
	  function (e) {
		currentVolum.style.width = ((e.offsetX/100)*100).toFixed(1) + "%";
		myvideo.volume = e.offsetX/100;
	  },
	  false
	);
	//关闭按钮
	close.onclick=function (){
		vBgc.style.display="none";
		video.style.display="none";
		video.style.top="-1000px";
		myvideo.pause();
		vedioState="pause";
	}
	//点击视频区域实现暂停与播放
	myvideo.onclick=function(){
		if (vedioState=="pause"){
			myvideo.play();	
			vedioState="play";
			playBtn.style.display="none";
			playIcon.style.backgroundPosition="0 -20px";
		}
		else if(vedioState=="play"){
			myvideo.pause();
			vedioState="pause";
			playBtn.style.display="block";
			playIcon.style.backgroundPosition="0 0";
		}
	}
	//点击暂停按钮实现视频播放
	playBtn.onclick=function(){
		myvideo.play();
		vedioState="play";
		playBtn.style.display="none";
		playIcon.style.backgroundPosition="0 -20px";
	}
	//点击下方播放与暂停图标实现暂停播放
	playIcon.onclick=function(){
		if (vedioState=="pause"){
			myvideo.play();	
			vedioState="play";
			playBtn.style.display="none";
			playIcon.style.backgroundPosition="0 -20px";
		}
		else if(vedioState=="play"){
			myvideo.pause();
			vedioState="pause";
			playBtn.style.display="block";
			playIcon.style.backgroundPosition="0 0";
		}
	}
	//实现全屏播放
	fullScreen.onclick = function (){
			requestFullScreen(myvideo);
			screenState = "fullScreen";
	}
	//通过函数实现元素的全屏播放
	function requestFullScreen(element) { 
	    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;
	    if (requestMethod) {  
	        requestMethod.call(element);
	    }
	}
}

