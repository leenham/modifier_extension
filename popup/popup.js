var bg = chrome.extension.getBackgroundPage();

data = {
	yw:null,
	yc:null,
	dj:null,
	fsp:null,
	gz:null,
	nickname:""
};

$("#submit_btn").click(function (){
	var yw = document.getElementById("yw").value;
	var yc = document.getElementById("yc").value;
	var dj = document.getElementById("dj").value;
	var fsp = document.getElementById("fsp").value;
	var gz = document.getElementById("gz").value;
	var nickname = document.getElementById("nickname").value;
	if(yw)data.yw = yw;
	if(dj)data.dj = dj;
	if(yc)data.yc = yc;
	if(fsp)data.fsp = fsp;
	if(gz)data.gz = gz;
	if(nickname)data.nickname = nickname;
	bg.localStorage["data"] = JSON.stringify(data);
	bg.sendMessageToContentScript(data, function(response)
	{
		console.log('来自content的回复：'+response);
	});

});



function preload(){
	console.log("preload");
	data = JSON.parse(bg.localStorage["data"]);
	if(data) {
		document.getElementById("yw").value = data.yw;
		document.getElementById("yc").value = data.yc;
		document.getElementById("dj").value = data.dj;
		document.getElementById("fsp").value = data.fsp;
		document.getElementById("gz").value = data.gz;
		document.getElementById("nickname").value = data.nickname;
	}
};

preload();
