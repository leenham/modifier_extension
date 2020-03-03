
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
    console.log('收到来自后台的消息');
    localStorage["data"] = JSON.stringify(request);
    modify(request);
    sendResponse("我是contentScript,已收到后台的消息");
});
function modify(data){
    //修改直播画面下方工具栏的数据
    var ycnum_div = $(".PlayerToolbar-ycInfo .PlayerToolbar-wealthNum");
    var ywnum_div = $(".PlayerToolbar-ywInfo .PlayerToolbar-wealthNum");
    if(ycnum_div && data.yc){ycnum_div.text(data.yc);}
    if(ywnum_div && data.yw){ywnum_div.text(data.yw);}

    nickname = data.nickname;
    //修改周榜等级、图标
    var rankweeklist = document.getElementsByClassName("ChatRankWeek-listItem");
    for(i=0;i<rankweeklist.length;i++){
        var text = rankweeklist[i].innerHTML;
        if(text.match(nickname)){
            item = rankweeklist[i];
            //修改周榜等级
            userLevel = item.getElementsByClassName("UserLevel")[0];
            if(userLevel && data.dj){
                userLevel.setAttribute("class","UserLevel UserLevel--"+data.dj);
                userLevel.setAttribute("title","用户等级："+data.dj);
            }
            //修改周榜图标
            iconElem = item.getElementsByClassName("NobleIcon")[0];
            icon = getIcon(data);
            if(iconElem && icon){
                iconElem.setAttribute("src",icon);
                iconElem.setAttribute("title",data.gz);
                iconElem.setAttribute("alt",data.gz);
            }
        }
    }

    //修改贵宾榜
    var nobleranklist = document.getElementsByClassName("NobleRankList-item");
    for(i=0;i<nobleranklist.length;i++){
        var text = nobleranklist[i].innerHTML;
        if(text.match(nickname)){
            item = nobleranklist[i];
            //修改贵宾榜
            noblerank = item.getElementsByClassName("NobleIcon")[0];
            iconElem = item.getElementsByClassName("NobleIcon")[0];
            icon = getIcon(data);
            if(noblerank && data.gz){
                noblerank.setAttribute("src",data.icon);
                noblerank.setAttribute("title",data.gz);
            }
            //修改粉丝牌
            fspElem = item.getElementsByClassName("FansMedal")[0];
            if(fspElem && data.fsp){
                fspElem.setAttribute("class","FansMedal level-"+data.fsp);
            }
        }
    }
    return;
}

function getIcon(data){
    gz = data.gz;
    icon = null;
    if(gz=="皇帝"){
        icon = "//res.douyucdn.cn/resource/2018/06/21/common/fd2b69eb629abcd703fa152c66faae52.gif";
    }
    if(gz=="公爵"){
        icon = "//res.douyucdn.cn/resource/2018/06/22/common/988709683569f83cefb69dfe1703f710.png"
    }
    if(gz=="伯爵"){
        icon = "//res.douyucdn.cn/resource/2018/06/22/common/ad8828ca9b9a85be571b3b28706047ed.png";
    }
    if(gz=="子爵"){
        icon = "//res.douyucdn.cn/resource/2018/06/22/common/a54f50c3e6a853bef02d35395f5798ab.png";
    }
    if(gz=="骑士"){
        icon = "//res.douyucdn.cn/resource/2018/06/21/common/1b45cf2fb1c6cddbbd95a569f399b26e.png";
    }
    if(gz=="游侠"){
        icon="//res.douyucdn.cn//resource/2018/06/22/common/93e7f66facdaaa30cf5634f92560e351.png";
    }

    data.icon = icon;
    return icon;
}

document.onload = function(){
    console.log("content already loaded");
    chrome.runtime.sendMessage({greeting: '你好，我是content-script呀，我主动发消息给后台！'}, function(response) {
        console.log('收到来自后台的回复：' + response);
        data = response;
        modify(data);
    });

}

