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

    // start close model box
    $("#model_close_btn").click(function(){
        $(".modal_box").removeClass("active");
    })
    // start close model box



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

// start product count 

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

    totalItems += getTotal
})

// console.log(totalItems);

let showTotalItems = document.querySelectorAll(".total_items");
showTotalItems.forEach(function(showTotalItem){
    showTotalItem.innerHTML = " ";
    showTotalItem.innerText = `$ ${totalItems}.00`;
})

// end product count

// start check out box
document.querySelector(".checkout_list_body").innerHTML = " ";
let getTotal = 0;
getCartProducts.forEach(function(getCartProduct){
    let getProductId = getCartProduct.id;
    let getProductName = getCartProduct.name;
    let getProductPrice = Number(getCartProduct.price);
    let getProductQuantity = Number(getCartProduct.quantity);

    // console.log(typeof(getProductPrice,getProductQuantity));

    let result  = Number(getProductQuantity * getProductPrice) ;

    getTotal += result;

    let getTrTag = `<tr class="">
                        <td id=${getProductId} class="text-start text-muted">${getProductName}</td>
                        <td class="text-end fw-bold product_price">$${result}</td>
                    </tr>`;
    document.querySelector(".checkout_list_body").innerHTML += getTrTag;
})


let getCheckOutSubTotal = document.querySelector(".checkout_subtotal")
let getCheckOutTotal = document.querySelector(".checkout_total")

if(localStorage.getItem("ogani_coupon") != null){
    let getDisPer = 10;
    let getDisPrice = getTotal - (getTotal/100*getDisPer);

    getCheckOutSubTotal.innerHTML= `$ ${getTotal}.00 - <small class="h6">${getDisPer}%</small>  `
    getCheckOutTotal.innerText = `$ ${getDisPrice}.00`;
}else {
    getCheckOutSubTotal.innerText = `$ ${getTotal}.00`;
    getCheckOutTotal.innerText = `$ ${getTotal}.00`;
}

// end check out box

// start payment system
let getPayMethods = document.querySelectorAll(".payment");
let getPayMethodCodes =document.querySelectorAll(".payment_method");

// console.log(getPayMethods);

if(localStorage.getItem("ogani_cart_product") !== null){
    getPayMethods.forEach(function(getPayMethod){
        getPayMethod.style.display = "block";
    })
}else {
    getPayMethods.forEach(function(getPayMethod){
        getPayMethod.style.display = "none";
    })
}

getPayMethods.forEach(function(getPayMethod,idx){
    getPayMethod.setAttribute("show-qr",idx);

    getPayMethod.addEventListener("click",function(){
        // console.log(this.getAttribute("show-qr"));
        showQr(this.getAttribute("show-qr"));

        document.querySelector(".payment_confirm").classList.add("active");

    })

})

function showQr(idx){
    getPayMethodCodes.forEach(function(getPayMethodCode){
        getPayMethodCode.classList.remove("active");
    })
    getPayMethodCodes[idx].classList.add("active");
}

let PreviewPaySlipBox = document.querySelector(".payment_preview img");

let getAcceptPaySlipBox = document.querySelector("#payment_confirm");

let getSubmitBtn = document.querySelector(".order_submit_btn");

let getModelBox = document.querySelector(".modal_box");

// console.log(getAcceptPaySlipBox);

getAcceptPaySlipBox.addEventListener("change",function(){

    var reader = new FileReader();
    reader.onload = function(e){
        // console.log(e.target.result);
        PreviewPaySlipBox.setAttribute("src",e.target.result); 
    }
    reader.readAsDataURL(this.files[0]); 

    getSubmitBtn.disabled = false;

})

getSubmitBtn.addEventListener("click",function(e){
    e.preventDefault();
    getModelBox.classList.add("active");
    
    setTimeout(function(){
        getModelBox.classList.remove("active");
        document.querySelector(".order_submit_form").submit();
        localStorage.removeItem("ogani_cart_product");
    },5000)
    
})


// end payment system