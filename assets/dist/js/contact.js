// console.log("hello world");

// start jquery area
$(document).ready(function(){
    // console.log("hello jquery")

    // start nav bar btn
    $(".navbar-toggler").click(function(){
        $(".nav_slide_bar").toggleClass("active");
        $("body").toggleClass("active");
    })
    // end nav bar btn

    // start dep list
    $(".all_dept_list_btn").click(function(){
        $(".all_dept_list").animate({
            height : "toggle"
        },500);
    })
    // end dep list


})


// end jquery area
let getBody = document.querySelector("body");
let getSideBar = document.querySelector(".nav_slide_bar");

window.onclick = function(e){
    if(e.target === getBody){
        getSideBar.classList.toggle("active");
        setTimeout(function(){
            getBody.classList.toggle("active");

        },600)
    }
}

// start product store 

let getTotalFavIcons = document.querySelectorAll(".fav_product");
let getTotalCartIcons = document.querySelectorAll(".cart_product");



let getFavProducts = JSON.parse(localStorage.getItem("ogani_fav_product"));
let getCartProducts = JSON.parse(localStorage.getItem("ogani_cart_product"));

function showLocalCount(showicons,localArr,localName){
    if( localStorage.getItem(localName) !== null){
        showicons.forEach(function(getTotalFavIcon){
            getTotalFavIcon.innerHTML = " ";
            getTotalFavIcon.innerText = localArr.length;
        })
    }

}

showLocalCount(getTotalFavIcons,getFavProducts,"ogani_fav_product");
showLocalCount(getTotalCartIcons,getCartProducts,"ogani_cart_product");

let totalItems = 0 ;
getCartProducts.forEach(function(getCartProduct){
    // console.log(getCartProduct.price)
    let getTotal = +getCartProduct.price * +getCartProduct.quantity;

    totalItems += getTotal;
})

// console.log(totalItems);

let showTotalItems = document.querySelectorAll(".total_items");
showTotalItems.forEach(function(showTotalItem){
    showTotalItem.innerHTML = " ";
    showTotalItem.innerText = `$ ${totalItems}.00`;
})

// end product store