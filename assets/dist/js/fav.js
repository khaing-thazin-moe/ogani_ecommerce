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


if( localStorage.getItem("ogani_cart_product") !==null){
    getCartProducts.forEach(function(getCartProduct){
        // console.log(getCartProduct.price)
        let getTotal = +getCartProduct.price * +getCartProduct.quantity;
    
        totalItems += getTotal;
    })

    let showTotalItems = document.querySelectorAll(".total_items");
    showTotalItems.forEach(function(showTotalItem){
    showTotalItem.innerHTML = " ";
    showTotalItem.innerText = `$ ${totalItems}.00`;
    })
}



// console.log(totalItems);



// end product store



// start cart product show

let getFavItems = JSON.parse(localStorage.getItem("ogani_fav_product"));




if(localStorage.getItem("ogani_fav_product") !== null || localStorage.getItem("ogani_cart_product") !== null){
    getFavItems.forEach(function(getCartStore){
        let getTrTag = `<tr class="product_datas">
        <td class="product_img_data">
            <div class=" d-flex align-items-center">
                <div class="me-5 product_img cart_product_img" id="${getCartStore.id}" style="background-image: url('./assets/imgs/products/${getCartStore.img}');"></div>
                <span class="product_name cart_product_name">${getCartStore.name}</span>
            </div>
        </td>
        <td class=" ">
            <div class=" d-flex justify-content-center align-items-center product_infos ">
                <span class="fw-bold ">$<span class="product_price cart_product_price">${getCartStore.price.replace("$","")}</span></span>
            </div>
            
        </td>
        <td>
            <div class="d-flex justify-content-center align-items-center gap-2 product_infos">
                <div class="product_count_btn">
                    <button type="button" class="dec_qty_btn border-0 shadow-none outline-none rounded-0">
                        <i class="fas fa-minus"></i>
                    </button>
    
                    <input type="text" name="p_quenty" id="p_quenty" value="${getCartStore.quantity}" class="text-center border-0 shadow-none outline-none rounded-0 p_quenty cart_product_quantity">
    
                    <button type="button" class="inc_qty_btn border-0 shadow-none outline-none rounded-0">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                
            </div>
        </td>
        <td>
            <div class="d-flex justify-content-center align-items-center product_infos">
                $<span class="total_amount">${getCartStore.price.replace("$","")}</span>
            </div>
        </td>
        <td >
            <div class="d-flex justify-content-center align-items-center product_infos">
                <a href="javascript:void(0)" class="px-3 nav-link rounded-circle product_cart_icon"><i class="fas fa-shopping-cart"></i></a>
                <a href="javascript:void(0)" class="nav-link cart_delete_btn"><i class="fas fa-times"></i></a>
            </div>
        </td>
    </tr>`;
    // console.log(getTrTag);
    
        document.querySelector(".fav_table_body").innerHTML += getTrTag;
    
    })
}


// end cart product show




// start product cart calculate
let getIncBtns = document.querySelectorAll(".inc_qty_btn");
let getDecBtns = document.querySelectorAll(".dec_qty_btn");
let getInputs = document.querySelectorAll(".p_quenty");


let getTotalAmounts = document.querySelectorAll(".total_amount");

let int = 1;

let totalValue;
getIncBtns.forEach(function(getIncBtn){
    getIncBtn.addEventListener("click",function(){
        // console.log();
        let getInput = this.previousElementSibling;
        let getPrice = Number(this.parentElement.parentElement.parentElement.previousElementSibling.querySelector(".product_price").innerText);
        int += 1;
        if(int > 10){
            int = 1;
        }
        getInput.value = int;
        let totalPrice = getPrice * int ;
        let getTotalPriceTag = this.parentElement.parentElement.parentElement.nextElementSibling.querySelector(".total_amount");
        getTotalPriceTag.innerHTML = `${totalPrice}`;

        updateCart();

    })
})



getDecBtns.forEach(function(getDecBtn){

    getDecBtn.addEventListener("click",function(){
        let getInput = this.nextElementSibling;
        let getPrice = Number(this.parentElement.parentElement.parentElement.previousElementSibling.querySelector(".product_price").innerText);
        int -= 1;
        if(int < 1){
            int = 10;
        }
        getInput.value = int;

        // console.log(getInput.value);
        let totalPrice = getPrice * getInput.value ;
        let getTotalPriceTag = this.parentElement.parentElement.parentElement.nextElementSibling.querySelector(".total_amount");
        // console.log(getTotalPriceTag);
        getTotalPriceTag.innerHTML = ` ${totalPrice}`;

        updateCart();


    })
})

let getTotalShow = document.querySelector("#product_amount");

updateCart();

let getPrices  = document.querySelectorAll(".product_price");

getInputs.forEach(function(getInput,idx){
    let getQuantity = Number(getInput.value);
    let getPrice = Number(getPrices[idx].innerText);
    let totalPrice = getQuantity * getPrice;

    getTotalAmounts[idx].innerText = totalPrice;


});





// console.log(getTotalAmount);

// edn product cart calculate



// start cart delete 
let getCartDeleteBtns = document.querySelectorAll(".cart_delete_btn");

getCartDeleteBtns.forEach(function(getCartDeleteBtn){
    getCartDeleteBtn.addEventListener("click",function(){
        this.parentElement.parentElement.parentElement.remove();

        updateStorage("ogani_fav_product");
        updateCart();
    })


})

// start update cart btn

// start add cart 
let getAddCartBtns = document.querySelectorAll(".product_infos .product_cart_icon");

let getCartStores ;

if(localStorage.getItem("ogani_cart_product") == null){
    getCartStores = [];
}else {
    getCartStores = JSON.parse(localStorage.getItem("ogani_cart_product"));
}

getAddCartBtns.forEach(function(getAddCartBtn){
    getAddCartBtn.addEventListener("click",function(){
        // console.log(this);
        let getImgUrl = this.parentElement.parentElement.parentElement.querySelector(".cart_product_img").style.backgroundImage;
        let getImg = urlFilter(getImgUrl);
        let getProductId = this.parentElement.parentElement.parentElement.querySelector(".cart_product_img").id;
        let getProductName = this.parentElement.parentElement.parentElement.querySelector(".product_name").innerText;
        let getProductPrice = this.parentElement.parentElement.parentElement.querySelector(".product_price").innerText;
        let getProductQuentity = this.parentElement.parentElement.parentElement.querySelector(".p_quenty").value;
        // console.log(getProductQuentity);
        
        let stroeCartObj = {
            id : getProductId,
            img : getImg,
            name : getProductName,
            price : getProductPrice,
            quantity : getProductQuentity
        }

        getCartStores.push(stroeCartObj);
        // console.log(getCartStores);
        localStorage.setItem("ogani_cart_product",JSON.stringify(getCartStores));

        this.parentElement.parentElement.parentElement.remove();
        // console.log(getTrTag);

        updateStorage("ogani_fav_product");

        
    })
})
// end add cart 


// start update cart btn
let getUpdateCartBtn = document.querySelector(".cart_all_btn");
getUpdateCartBtn.addEventListener("click",function(){
    let getImgs = document.querySelectorAll(".cart_product_img");
    let getProductNames = document.querySelectorAll(".cart_product_name");
    let getProductPrices = document.querySelectorAll(".cart_product_price");
    let getProductQuentitys = document.querySelectorAll(".cart_product_quantity");


    for(let i = 0 ; i < getImgs.length ; i++ ){
        let getImgUrl = getImgs[i].style.backgroundImage;
        let getProductId = getImgs[i].id;
        let getImgFile = urlFilter(getImgUrl);
        let getProductName = getProductNames[i].innerText;
        let getProductPrice = getProductPrices[i].innerText;
        let getProductQuentity = getProductQuentitys[i].value;
        
        let stroeCartObj = {
            id : getProductId,
            img : getImgFile,
            name : getProductName,
            price : getProductPrice,
            quantity : getProductQuentity
        }
        getCartStores.push(stroeCartObj);
        // console.log(stroeCartObj);
    }

    localStorage.setItem("ogani_cart_product",JSON.stringify(getCartStores));
    localStorage.removeItem("ogani_fav_product");
    document.querySelector(".fav_table_body").innerHTML = " ";
})

// end update cart btn

// start update cart function
function updateCart(){
    let totalAmount = 0 ;
    let getTotalAmounts = document.querySelectorAll(".total_amount");
    getTotalAmounts.forEach(function(getTotalAmount){
        // console.log(getTotalAmount.innerText);
        let getamount = Number(getTotalAmount.innerText);
        // console.log(totalAmount)
        totalAmount += getamount; 
        
    })
    // getTotalShow.innerText = `$ ${totalAmount}.00`;
    // document.querySelector(".card_sub_total").innerText= `$ ${totalAmount}.00`;
    // document.querySelector(".card_total").innerText= `$ ${totalAmount}.00`;
    

    updateStorage("ogani_fav_product");

    return totalAmount;
}

// end update cart function





// start url filter function
function urlFilter(url){
    let imgName = url.replace("./assets/imgs/products/","");
    let newImg = imgName.replace("url","");
    let dropopenBrack = newImg.replace("(","");
    let dropCloseBrack = dropopenBrack.replace(")","");
    let dropOpenCote = dropCloseBrack.replace("\"","");
    let dropCloseCote = dropOpenCote.replace("\"","");
    let getImgFile = dropCloseCote;
    return getImgFile;
    
}

// end url filter function

// start updateStorage function
function updateStorage(storageName){
    let getImgs = document.querySelectorAll(".cart_product_img");
    let getProductNames = document.querySelectorAll(".cart_product_name");
    let getProductPrices = document.querySelectorAll(".cart_product_price");
    let getProductQuentitys = document.querySelectorAll(".cart_product_quantity");

    let newProductCart = [];

    for(let i = 0 ; i < getImgs.length ; i++ ){
        let getImgUrl = getImgs[i].style.backgroundImage;
        let getProductId = getImgs[i].id;
        let getImgFile = urlFilter(getImgUrl);
        let getProductName = getProductNames[i].innerText;
        let getProductPrice = getProductPrices[i].innerText;
        let getProductQuentity = getProductQuentitys[i].value;
        
        let stroeCartObj = {
            id : getProductId,
            img : getImgFile,
            name : getProductName,
            price : getProductPrice,
            quantity : getProductQuentity
        }

        // console.log(stroeCartObj);
        newProductCart.push(stroeCartObj);
    }
    
    localStorage.setItem(storageName,JSON.stringify(newProductCart));

}
// end updateStorage function

