var btnObj = document.getElementById("send");
var box = document.getElementsByClassName("contentList")[0];
var ulObj = box.firstElementChild;
var count = 1;
var index = 0;
btnObj.onclick = function () {
    var inputText = document.getElementById("area").value;
    var newLiObj = document.createElement("li");
    var newImgObj = document.createElement("img");
    var newPObj = document.createElement("p");  //时间戳
    var newPTextObj = document.createElement("p");  //评论内容
    var newBoxObj = document.createElement("div");
    var newUserSpan = document.createElement("span");
    var aEditObj = document.createElement("a");
    var aDeleteObj = document.createElement("a");

    var time = new Date();
    var timeStr = time.getFullYear() + "/" + (time.getMonth() + 1) + "/" + time.getDate() + "   " + time.getHours() + ":" + time.getMinutes();
    if (inputText != "") {
        ulObj.appendChild(newLiObj).appendChild(newBoxObj).appendChild(newImgObj);
        ulObj.appendChild(newLiObj).appendChild(newBoxObj).appendChild(newPObj);
        ulObj.appendChild(newLiObj).appendChild(newBoxObj).appendChild(newPTextObj);
        ulObj.appendChild(newLiObj).appendChild(newBoxObj).appendChild(newUserSpan);
        ulObj.appendChild(newLiObj).appendChild(newBoxObj).appendChild(aEditObj);
        ulObj.appendChild(newLiObj).appendChild(newBoxObj).appendChild(aDeleteObj);
        aEditObj.href="#";
        aEditObj.innerText="修改";
        aEditObj.setAttribute("index",index);
        aEditObj.className = "aedit";

        aDeleteObj.href="#";
        aDeleteObj.innerText="删除";
        aDeleteObj.setAttribute("index",index);
        aDeleteObj.className = "adelete";
        aEditObj.onclick = function (){
            var num = parseInt(aEditObj.getAttribute("index"));
            var timeStr = "最后编辑于"+time.getFullYear() + "/" + (time.getMonth() + 1) + "/" + time.getDate() + "   " + time.getHours() + ":" + time.getMinutes();
            var editedText =prompt( "请输入修改的内容",ulObj.children[num].children[0].children[2].innerHTML);
            if(editedText){
                ulObj.children[num].children[0].children[2].innerHTML = editedText;
                ulObj.children[num].children[0].children[1].innerHTML = timeStr;
            } else{
            }
        }
        aDeleteObj.onclick = function (){
            var num = parseInt(aDeleteObj.getAttribute("index"));
            if(ulObj.removeChild(ulObj.children[num])){
                alert("Success!");
            }else{
                alert("failed");
            }
            var liObj = ulObj.children;
            for (let i = 0; i < liObj.length; i++) {
                liObj[i].children[0].children[4].setAttribute("index",i);
                liObj[i].children[0].lastElementChild.setAttribute("index",i);
            }
        }
        newBoxObj.className = "info";
        newImgObj.src = "./images/03.jpg";
        newPObj.innerText = timeStr;
        newPTextObj.innerText = inputText;
        newPTextObj.className = "specialP";
        newUserSpan.innerText = "用户" + (count++).toString();
        document.getElementById("area").value = "";
        document.getElementsByClassName("useCount")[0].innerHTML = 200;
    } else {
        alert("你还没输入内容");
    }
    index++;
};
//字数
document.getElementById("area").onkeydown = function () {
    var inputText = document.getElementById("area").value;
    document.getElementsByClassName("useCount")[0].innerHTML = 200 - inputText.length;
}