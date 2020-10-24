//外层大盒子
var showboxObj = document.getElementById("showbox");
//图片条盒子
var contentObj = showboxObj.firstElementChild;
//图片集合
var imgsObj = contentObj.children;
//序列号计数器
var index = 0;
//左箭头
var leftArrow = document.querySelector("#leftArrow");
//右箭头
var rightArrow = document.querySelector("#rightArrow");
//序号角标ul
var ulObj = document.querySelector("#uls");
//序号角标数组
var liObjs = ulObj.children;
//图片宽度
var imgWidth = imgsObj[0].offsetWidth;
//计时器
var autoMoveTimeId;
//瞎写的测试用flag
var flag = false;
//函数可执行开关
var funFlag = true;

for (i=0;i<imgsObj.length;i++){
    imgsObj[i].setAttribute("index",i);
}

/**
 * 鼠标进入showBox处理函数
 */
function mouseInShowBox(){
    leftArrow.className = "active";
    rightArrow.className = "active";
    clearInterval(autoMoveTimeId);
}

/**
 * 鼠标移出showBox处理函数
 */
function mouseOutShowBox(e){
    leftArrow.className = "unactive";
    rightArrow.className = "unactive";
    autoMoveTimeId = setInterval(rightArrowFun,1500);
}

/**
 * 左箭头处理函数
 */
function leftArrowFun() {
    if (index == 0) {
        index = imgsObj.length - 1;
        contentObj.style.left = -index * imgWidth + "px";
    }
    index--;
    Move(contentObj, 10, -index * imgWidth);
    for (var j = 0; j < liObjs.length; j++) {
        liObjs[j].removeAttribute("class");
    }
    if (index < imgsObj.length-1){
       liObjs[index].className = "liactive";
    }else{
        liObjs[0].className = "liactive";
     }
};

/**
 * 右箭头处理函数
 */
function rightArrowFun(){
    if (index == imgsObj.length-1) {
        index = 0;
        contentObj.style.left = 0 + "px";
    }
        index++;
        Move(contentObj, 10, -imgWidth * index);
        for (var j = 0; j < liObjs.length; j++) {
            liObjs[j].removeAttribute("class");
        }
        if (index < imgsObj.length - 1) {
            liObjs[index].className = "liactive";
        } else {
            liObjs[0].className = "liactive";
        }
}

//---------------------------------------
    for (i=0;i<liObjs.length;i++) {
        liObjs[i].setAttribute("index", i);
        liObjs[i].onclick = clickIndexLi;

}

/**
 * 序号角标处理函数
 */
function clickIndexLi(){
    var now_Index = this.getAttribute("index");
//    console.log(now_Index);
    //清楚样式
    for (var j = 0; j < liObjs.length; j++) {
        liObjs[j].removeAttribute("class");
    }
    this.className = "liactive";
    //
    // if (Math.abs(index-now_Index) > 2 ){
    //     if (index-now_Index < 0){
    //         contentObj.style.left = -(index-now_Index)*730;
    //     }else{
    //         contentObj.style.left = (index-now_Index)*730;
    //     }
    // }else{
        index = now_Index;
        Move(contentObj,60,-imgWidth*index);
   //}
}

/**
 * 移动函数
 * @param element
 * @param step
 * @param goal
 * @constructor
 */
function Move(element, step, goal) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function() {
        //当前位置
        var currentLocation = element.offsetLeft;
        //移动后的距离
        newStep = currentLocation < goal ? step : -step;
        currentLocation += newStep;
        if (Math.abs(goal - currentLocation) > Math.abs(newStep)) {
            element.style.left = currentLocation + "px";
            // flag = true;
            // console.log("--A--"+flag);
        } else {
            clearInterval(element.timeId);
            element.style.left = goal + "px";
            funFlag = true;
        }
    }, 10);
 //   console.log("--C--"+flag);
}

showboxObj.addEventListener("mouseenter", mouseInShowBox,false);
showboxObj.addEventListener("mouseleave", mouseOutShowBox,false);
autoMoveTimeId = setInterval(rightArrowFun,1500);
leftArrow.onclick = function (){
    if (funFlag){
        leftArrowFun();
        funFlag = false;
    }
}
rightArrow.onclick = function (){
    if (funFlag){
        rightArrowFun();
        funFlag = false;
    }
}

