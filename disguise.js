var MAX_VISIT_CNT = 10;//浏览次数上限

//修改鱼丸，鱼翅等财产数据
function modifyWealthNum(yc,yw){
    //修改直播画面下方工具栏的数据
    var ycnum_div = $(".PlayerToolbar-ycInfo .PlayerToolbar-wealthNum");
    var ywnum_div = $(".PlayerToolbar-ywInfo .PlayerToolbar-wealthNum");
    if(ycnum_div){ycnum_div.innerText = yc;}
    if(ywnum_div){ywnum_div.innerText = yw;}
    //修改弹窗中的数据
    var wallet_yw = $(".Wallet-content-mywallet-wealth-sliver span");
    var wallet_yc = $(".Wallet-content-mywallet-wealth-gold span");
    if(wallet_yw){wallet_yw.innerText=yw};
    if(wallet_yc){wallet_yc.innerText=yc};
    //修改个人中心的数据 /member/cp
    var m_yw = $(".m_yc #balance");
    var m_yc = $(".m_yc #balance_gold");
    if(m_yw)m_yw.text("鱼丸 "+yw);
    if(m_yc)m_yw.text("鱼翅 "+yc);
    return;
}
/*
//修改斗鱼等级
function modifyRank(rank){
    //斗鱼等级只能是1-69之间的整数。
    if(rank>69 || rank<0) return;
    //修改个人中心等级
    var rankelem = $("#leveimg>img");
    if(rankelem!=null) {
        rankelem.src = "/common/douyu/images/userlevel2017/LV" + rank + ".png";
    }
    //修改头部弹窗中的数据
    var header = $(".HeaderUserLevel");
    if(header){
    var level = header.getElementsByClassName("UserLevel");
    if(level!=null && level.length>=2) {
        level[0].setAttribute("class", "UserLevel UserLevel--" + String(rank));
        level[1].setAttribute("class", "UserLevel UserLevel--next" + String(rank==69?69:rank + 1));
    }
    }
}

//修改粉丝牌 最高30级
function fansMedal(rank){
    if(rank>30 || rank<0) return;
    return;
}
//修改贵族

*/

function modifyData(){
    modifyWealthNum(123456,666666);
    //modifyRank(48);
    return 1;
}

modifyData();