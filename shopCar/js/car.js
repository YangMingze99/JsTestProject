// 1. 实现全选
$(".checkall").click(function (){
    $(".checkall, .j-checkbox").prop("checked",$(this).prop("checked"));
    if ($(this).prop("checked")) {
        $(".j-checkbox").parent().parent().addClass("check-cart-item")
    } else {
        $(".j-checkbox").parent().parent().removeClass("check-cart-item")
    }
    getSum();
    getPriceSum();
})
// 2. 点击三个checkbox  控制 checkall
$(".j-checkbox").change(function (){
    if ($(".j-checkbox:checked").length == $(".j-checkbox").length){
        $(".checkall").prop("checked",true);
    }else{
        $(".checkall").prop("checked",false);
    }

    if ($(this).prop("checked")) {
        $(this).parent().parent().addClass("check-cart-item")
    } else {
        $(this).parent().parent().removeClass("check-cart-item")
    }
    getSum();
    getPriceSum();
})

// 3. 商品数量的控制  , 点击 + -  ，修改个数
//decrement  increment
$(".decrement").click(function (){
    var count = $(this).siblings(".itxt").val();
    count--;
    count = count >= 1? count : 1;
    $(this).siblings(".itxt").val(count);
    var sum = 0;
    sum = $(this).parent().parent().siblings(".p-price").html().substr(1) * $(this).siblings(".itxt").val();
    $(this).parent().parent().siblings(".p-sum").html("￥"+sum.toFixed(2));
    getPriceSum();
})

$(".increment").click(function (){
    var count = $(this).siblings(".itxt").val();
    count++;
    count = count <= 99? count : 99;
    $(this).siblings(".itxt").val(count);
    var sum = 0;
    sum = $(this).parent().parent().siblings(".p-price").html().substr(1) * $(this).siblings(".itxt").val();
    $(this).parent().parent().siblings(".p-sum").html("￥"+sum.toFixed(2));
    getPriceSum();
})
// 4. input被直接输入 ，修改小计
$(".itxt").change(function (){
    var sum = 0;
    sum = $(this).parent().parent().siblings(".p-price").html().substr(1) * $(this).val();
    $(this).parent().parent().siblings(".p-sum").html("￥"+sum.toFixed(2));
})

// 5. 总价  和   总件数


//总件数
function getSum(){
    $(".amount-sum em").html($(".j-checkbox:checked").length);
}
//总价
function getPriceSum(){
    var sum = 0;
    $(".j-checkbox:checked").parent().siblings(".p-sum").each(function (i, v) {
//        console.log($(v).html().substr(1))
         sum += Number($(v).html().substr(1));
    })
    $(".price-sum em").html("￥" + sum.toFixed(2));
}

// 6. 点击删除 删除这一行


// 7 .点击remove-batch  删除已选中
$(".remove-batch").click(function (){
    $(".j-checkbox:checked").parent().parent().remove();
    getSum();
    getPriceSum();
})

// 8. 删除全部
$(".clear-all").click(function (){
    if (confirm("确定清空？？？")){
        $(".cart-item-list").empty();
        $(".cart-item-list").append("<h1 style='text-align: center'>您的购物车是空的呦</h1>");
        $(".checkall").prop("checked",false);
        getSum();
        getPriceSum();
    }else{
        return false;
    }

})





