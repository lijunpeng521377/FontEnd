
/*根据id获取对象*/
function $(str) {
    return document.getElementById(str);
}
//判断用户是否从首页跳转登录
(function logIn(){
	url = window.location.search;
	console.log(url);
	if (url == ""){
		displayLogin();
	}
	else {
		displayRegis();
	}
})()
// 显示二维码方式登录界面
function displayQr() {
	var login = document.getElementsByClassName("accountLogin");
	var regis = document.getElementsByClassName("register");
	var qrIn = document.getElementsByClassName("qrLogin");
	var byLogin = document.getElementById("by_account");
	var byqr = document.getElementById("by_qr");
	var sign = document.getElementById("sign_in");
	login[0].style.display = "none";
	regis[0].style.display = "none";
	qrIn[0].style.display = "block";
	byLogin.className = "by_account";
	byqr.className = "by_qr bl active";
	sign.className = "sign_in bl";
}


// 显示注册界面
function displayRegis() {
	var login = document.getElementsByClassName("accountLogin");
	var regis = document.getElementsByClassName("register");
	var qrIn = document.getElementsByClassName("qrLogin");
	var byLogin = document.getElementById("by_account");
	var byqr = document.getElementById("by_qr");
	var sign = document.getElementById("sign_in");
	login[0].style.display = "none";
	regis[0].style.display = "block";
	qrIn[0].style.display = "none";
	byLogin.className = "by_account";
	byqr.className = "by_qr bl";
	sign.className = "sign_in bl active";
}

// 显示账户登录界面
function displayLogin() {
	var login = document.getElementsByClassName("accountLogin");
	var regis = document.getElementsByClassName("register");
	var qrIn = document.getElementsByClassName("qrLogin");
	var byLogin = document.getElementById("by_account");
	var byqr = document.getElementById("by_qr");
	var sign = document.getElementById("sign_in");
	login[0].style.display = "block";
	regis[0].style.display = "none";
	qrIn[0].style.display = "none";
	byLogin.className = "by_account active";
	byqr.className = "by_qr bl";
	sign.className = "sign_in bl";
}

// 字符串转化为16进制
function stringToHex(str){
　　　　var val="";
　　　　for(var i = 0; i < str.length; i++){
　　　　　　if(val == "")
　　　　　　　　val = str.charCodeAt(i).toString(16);
　　　　　　else
　　　　　　　　val +=  str.charCodeAt(i).toString(16);
　　　　}
　　　　return val;
　　}

// 账号登录验证
function checkAccount() {
	var login = document.getElementsByClassName("accountLogin");
	var name = document.getElementById("name").value;
	var pwd = document.getElementById("veriPassword").value;
	var btn = document.getElementById("submit");
	var hint = document.getElementById("hint");
	var warn = document.getElementById("warn");
	if (users[0] == null){
		displayRegis()
	}
	else if (password[users.indexOf(name)] == pwd.toString()||password[email.indexOf(name)] == pwd.toString()  ){
		window.location.href = "../xiaomi/index.html?"+btoa(name);
		
	}
	else if (name==""){
		hint.style.display = "block";
		warn.innerText = "请输入账号"
	}
	else if (name!="" && pwd==""){
		hint.style.display = "block";
		warn.innerText = "请输入密码"
	}
	else {
		hint.style.display = "block";
		warn.innerText = "请输入正确的账号和密码"
	}
}




// 点击地区输入框弹出省份选项
var area = $("area");
var prov = $("prov");
var city = $("city");
var country = $("country");
var selectArea = $("selectArea");
// 记录注册各项检查状态
var state = [0,0,0,0]

/*用于保存当前所选的省市区*/
var current = {
    prov: '',
    city: '',
    country: ''
};


// 显示选择省市区的区域
function showSelect(){
	selectArea.style.display = "block";
}
// 隐藏选择省市区的区域
function hideSelect(){
	selectArea.style.display = "none";
}


// 自动加载省份列表
(function showProv(){
	var len = province.length;
	for (var i = 0; i < len; i++) {
	    var provOpt = document.createElement('option');
	    provOpt.innerText = province[i]['name'];
	    provOpt.value = i;
	    prov.appendChild(provOpt);
	}
})()

// 加载城市列表
function showCity(obj){
	var val = obj.options[obj.selectedIndex].value;
	if (val != current.prov) {
	    current.prov = val;
	    area.value = '';
	}
	if (val != null) {
	    city.length = 1;
	    var cityLen = province[val]["city"].length;
	    for (var j = 0; j < cityLen; j++) {
	        var cityOpt = document.createElement('option');
	        cityOpt.innerText = province[val]["city"][j].name;
	        cityOpt.value = j;
	        city.appendChild(cityOpt);
	    }
	}
}


// 加载区县列表
function showCountry(obj){
	var val = obj.options[obj.selectedIndex].value;
	current.city = val;
	if (val != null) {
	    country.length = 1; //清空之前的内容只留第一个默认选项
	    var countryLen = province[current.prov]["city"][val].districtAndCounty.length;
	    if(countryLen == 0){
	        area.value = province[current.prov].name + '-' + province[current.prov]["city"][current.city].name;
	        return;
	    }
	    for (var n = 0; n < countryLen; n++) {
	        var countryOpt = document.createElement('option');
	        countryOpt.innerText = province[current.prov]["city"][val].districtAndCounty[n];
	        countryOpt.value = n;
	        country.appendChild(countryOpt);
	    }
	}
}

// 在input框显示选择的地区
function showArea(obj) {
	var val = obj.options[obj.selectedIndex].value;
	current.country = val;
	area.value = province[current.prov].name + '-' + province[current.prov]["city"][current.city].name + '-' + province[current.prov]["city"][current.city].districtAndCounty[current.country];
	if (area.value !=null){
		state[0] = 1;
	}
}


// 确认密码与密码校验
function checkPassword(obj){
	var paswd = $("password").value;
	var repaswd = obj.value;
	var prompt = $("prompt");
	var warnmsg = $("warnmsg");
	if (paswd != repaswd){
		prompt.style.display = "block";
	}
	else {
		prompt.style.display = "none";
		if (paswd != null){
			state[1] = 1;
		}
	}
	
}


// 校验邮箱
function checkEmail(obj){
	var tip = $("tip");
	var tipmsg = $("tipmsg");
	var email = obj.value;
	var patt = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
	if (patt.test(email) != true&&email.length>0){
		tip.style.display = "block";
	}
	else {
		state[2] = 1;
		tip.style.display = "none";
	}
	
}

// 验证电话号码
function checkPhonenumber(obj){
	var check = $("check");
	var checkmsg = $("checkmsg");
	var phonenumber = obj.value;
	var patt = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
	if (patt.test(phonenumber) != true&&phonenumber.length>0){
		check.style.display = "block";
	}
	else {
		state[3] = 1;
		check.style.display = "none";
	}
	
}


//成功的注册
function saveAccount(){
	hideSelect()
	var len = state.length;
	var pwd = $("password").value;
	var phone = $("phonenumber").value;
	var mail = $("email").value;
	var signin = $("signin")
	for (var i = 0;i<len;i++){
		if (state[i] !== 1){
			signin.disabled = true;
			console.log(i)
			console.log(state[i])
			return;
		}
		else{
			continue;
		}
	}
	signin.disabled = false;
	users.push(phone);
	password.push(pwd);
	email.push(mail);
	alert("创建账号成功!")
	displayLogin()
}