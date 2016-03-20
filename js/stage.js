//stage���


function sleep(million) {
    var now = new Date();
    var exitTime = now.getTime() + million;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime) {
            break;
        }
    }
}
//APP��ϸ����ҳ��ʾ������
function appShow() {
    var aApp = document.getElementById("a-app-guide");
    var aAppBox = document.getElementsByClassName("app-show")[0];
    aApp.onmouseenter = function (e) {
        e = e || window.event;
        aAppBox.style.display = "block";
    }

    aApp.onmouseleave = function (e) {
        e = e || window.event;
        sleep(1000);
        aAppBox.style.display = "none";
    }
}
appShow();

//banner�ı�����ʾ������
function bannerStoryShow() {
    var bannerStory = document.getElementById("bannerStory");
    var banner = document.getElementById("guide-middle");

    banner.onmouseenter = function (e) {
        e = e || window.event;
        bannerStory.style.display = "block";
    }

    banner.onmousemove = function (e) {
        e = e || window.event;
        var x = e.clientX;
        var y = e.clientY;

        bannerStory.style.top = y + 5 + "px";
        bannerStory.style.left = x + 5 + "px";
        var a = parseFloat(window.getComputedStyle(bannerStory)["width"]);
        bannerStory.style.width = a + "px";

        //var curTop=parseFloat(window.getComputedStyle(bannerStory)["top"]);
        var curTop = parseFloat(bannerStory.offsetTop);
        var curLeft = parseFloat(window.getComputedStyle(bannerStory)["left"]);
        var boxHeight = parseFloat(window.getComputedStyle(bannerStory)["height"]);
        var boxWidth = parseFloat(window.getComputedStyle(bannerStory)["width"]);
        var offWidth = parseFloat(banner.offsetWidth);
        var offHeight = parseFloat(banner.offsetHeight);
        //console.log(offHeight)
        //console.log("x",x,"y",y,"curtop",curTop,"curleft",curLeft,"boxheight",boxHeight,"boxwidth",boxWidth,"offheight",offHeight,"offwidth",offWidth,"offHeight-boxHeight",offHeight-boxHeight);

        //�жϱ߽�ֵ
        //��
        if (curLeft > offWidth - boxWidth) {
            bannerStory.style.left = offWidth - boxWidth + "px";
            bannerStory.style.width = a + "px";
        }
        //��
        if (curTop > offHeight) {
            bannerStory.style.top = offHeight + "px";
        }

    }

    banner.onmouseleave = function (e) {
        e = e || window.event;
        bannerStory.style.display = "none";
    }
}
bannerStoryShow();



//����������ʾ������
function subGuideShow() {
    //�ҵ����б�ǩ����ŵ�titles��
    var guideBar = document.getElementById("guide-bar");
    var inner = guideBar.getElementsByClassName("inner")[0];
    var l = inner.getElementsByClassName("l")[0];
    var titles = l.getElementsByTagName("a");

    //�ҵ��������ݣ���ŵ�container��
    var subGuide_outer = document.getElementsByClassName("subGuide_outer")[0];
    var container = subGuide_outer.getElementsByTagName("div");

    //�ҵ�title��container�ĸ���Ԫ��
    var navigatorBar = document.getElementById("navigatorBar");

    //������ʾ������
    for (var i = 0; i < titles.length; i++) {
        titles[i].index = i;
        //var num=this.index;
        //��ʾ
        titles[i].onmouseenter = function () {
            var num = this.index;
            //���������зǴ˱�ǩ�µ�����
            for (var i = 0; i < container.length; i++) {
                if (i != num) {
                    container[i].style.display = "none";
                }
            }
            //�ٵ���container[i]��leftֵ
            container[num].style.left = num * 40 + "px";
            //�����ʾ�˱�ǩ
            container[num].style.display = "block";
            num = null;
        }
        //����
        navigatorBar.onmouseleave = function () {
            for (var i = 0; i < titles.length; i++) {
                container[i].style.display = "none";
            }
        }
    }
}
subGuideShow();


//�ֲ�ͼ֮�Զ��ֲ�
/*454*216*/
var scrollBox = document.getElementById("scrollBox");
var imgLists = scrollBox.getElementsByTagName("img");
var step = -1;
var count = imgLists.length;

function autoScroll() {
    step++;
    if (step >= count) {
        step = 1;
        scrollBox.style.left = 0;
    }
    animate(scrollBox, {left: -step * 457}, 500);
}
var timer_autoScroll = window.setInterval(autoScroll, 3000);

//�������Ŷ�
var tipBox = document.getElementById("scrollTips");
var tipList = tipBox.getElementsByTagName("li");
function tipSelect() {
    var tempStep = step;

    if (tempStep === -1) {
        tempStep = 0;
    }

    for (var i = 0; i < imgLists.length; i++) {
        if (i === tempStep) {
            tipList[i % 5].className = "colorGray";
        } else {
            tipList[i % 5].className = null;
        }
    }
}
var timer_tipSelect = window.setInterval(tipSelect, 500);

//ѡ��ĳ������->Ȼ���ֲ�
function tipScroll() {
    for (var i = 0; i < tipList.length; i++) {
        tipList[i].index = i;
        tipList[i].onmouseenter = function () {
            window.clearInterval(timer_autoScroll);
            window.clearInterval(timer_tipSelect);
            step = this.index;
            tipSelect();
            animate(scrollBox,{left:-step*457},500);
        };
        tipList[i].onmouseleave = function () {
            timer_autoScroll=window.setInterval(autoScroll, 3000);
            timer_tipSelect = window.setInterval(tipSelect, 500);
        }
    }
}
tipScroll();



//������������Ļ�Ϸ�������
function nailNavigatorBar(){
    var curScrollHeight=document.documentElement.scrollTop||document.body.scrollTop;
    var navigatorBar=document.getElementById("navigatorBar");
    if(curScrollHeight>=280){

        navigatorBar.className="fixMe";
    }else{
        navigatorBar.className=null;
    }
}

//ͼƬ��ʱ����
function offset(curEle) {
    var l = curEle.offsetLeft, t = curEle.offsetTop;
    var p = curEle.offsetParent;
    while (p.tagName.toLowerCase() != "body") {
        if (navigator.userAgent.indexOf("MSIE 8.0") === -1) {
            l += p.clientLeft;
            t += p.clientTop;
        }
        l += p.offsetLeft;
        t += p.offsetTop;
        p = p.offsetParent;
    }
    return {left: l, top: t};
}

var imgList=document.getElementsByTagName("img");
var winH = document.documentElement.clientHeight || document.body.clientHeight;

function delayImg() {
    for (var i = 0; i < imgList.length; i++) {
        ~function (i) {
            delayImgCode(i);
        }(i);
    }

    //������������Ļ�Ϸ�������
    nailNavigatorBar();
}

function delayImgCode(i) {
    var curImg = imgList[i];
    //->�����ǰͼƬ��û�м�����ʵ�����ǿ�ʼ����
    if (!curImg.isLoad) {
        //->��ȡ���ǵ�ǰÿһ��ͼƬ�Լ�����body����ƫ����
        if(curImg.offsetParent==null){
            return;
        }
        var curImgT = offset(curImg).top + curImg.offsetHeight;
        //->��ȡ�������ǰ�ױ߿����body����ƫ��
        var winT = (document.documentElement.scrollTop || document.body.scrollTop) + winH;
        //->˵�����ǵ�ͼƬ�Ѿ����������������������,��ʼ������ʵ��ͼƬ
        if (winT >= curImgT) {
            var trueImg = curImg.getAttribute("trueImg");
            var oImg = new Image;
            oImg.src = trueImg;
            oImg.onload = function () {
                curImg.src = trueImg;
                oImg = null;
            };
            curImg.isLoad = true;
        }
    }
}
window.onscroll = delayImg;
window.onscroll();

//�ص�����
function toTop(){
    var toTop =document.getElementById("toTop");
    toTop.onclick=function(e){
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }
}
toTop();