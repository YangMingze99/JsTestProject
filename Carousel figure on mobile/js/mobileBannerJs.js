//展示盒子
var viewBoxObj = document.getElementById("view");
//图片条
var imgBannerObj = document.querySelector("#banner");
//图片集
var imgObjs = imgBannerObj.children;
//图片宽度
var imgWidth = imgObjs[0].offsetWidth;
//角标集
var liObjs = document.getElementsByTagName("li");
//索引值
var index = 1;
//定时器
var autoMoveTimeId = null;
//触摸开始坐标
var touchStartX = 0;
//开关
var flag = true;
//pre
var prePositon = 638;
//preFlag
var preFlag = false;
//var needMove
var needMove = 0;

imgBannerObj.setAttribute("position", 638);

function rightMove() {
    if (preFlag){
        imgBannerObj.setAttribute("position", prePositon);
        imgBannerObj.style.transition = "1s";
        imgBannerObj.style.transform = "translateX(-" + prePositon + "px)";
    }else{
        liObjs[index - 1].className = "";
        index++;
        imgBannerObj.setAttribute("position", index * imgWidth);
        imgBannerObj.style.transition = "1s";
        imgBannerObj.style.transform = "translateX(-" + index * imgWidth + "px)";
    }
}

imgBannerObj.addEventListener("transitionend", function () {
    if (index > 4) {
        index = 1;
        imgBannerObj.setAttribute("position", index * imgWidth);
        imgBannerObj.style.transition = "";
        imgBannerObj.style.transform = "translateX(-" + index * imgWidth + "px)";
    }
    if (index < 1) {
        index = 4;
        imgBannerObj.setAttribute("position", index * imgWidth);
        imgBannerObj.style.transition = "";
        imgBannerObj.style.transform = "translateX(-" + index * imgWidth + "px)";
    }
    liObjs[index - 1].className = "active";
    flag = true;
})

imgBannerObj.addEventListener("touchstart", function (e) {
    touchStartX = e.touches[0].clientX;
    clearInterval(autoMoveTimeId);
})

imgBannerObj.addEventListener("touchmove", function (e) {
    if (flag === true) {
        needMove = e.changedTouches[0].clientX - touchStartX;
        prePositon =Number(imgBannerObj.getAttribute("position")) ;
        if (Math.abs(needMove) > viewBoxObj.offsetWidth/2){
            preFlag = false;
        }else {
            preFlag = true;
        }
        imgBannerObj.style.transition = "";
        imgBannerObj.style.transform = "translateX(-" + (prePositon - needMove) + "px)";
    }
})

imgBannerObj.addEventListener("touchend", function (e) {
    if (flag === true) {
        flag = false;
        var touchEndX = e.changedTouches[0].clientX;
        if (touchStartX > touchEndX) {
            //往右面移动
            rightMove();
        } else {
            if (preFlag){
                imgBannerObj.setAttribute("position", prePositon);
                imgBannerObj.style.transition = "1s";
                imgBannerObj.style.transform = "translateX(-" + prePositon + "px)";
            }else{
                liObjs[index - 1].className = "";
                index--;
                imgBannerObj.setAttribute("position", index * imgWidth);
                imgBannerObj.style.transition = "1s";
                imgBannerObj.style.transform = "translateX(-" + index * imgWidth + "px)";
            }
        }
    }
    autoMoveTimeId = setInterval(rightMove, 2000);
})


 autoMoveTimeId = setInterval(rightMove,2000);