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

    // product hove zoom
    $(".main_product_img .magnified").hover(function(e){

        // Store position & dimension information of image
        var imgPosition = $(".magnify").position(),
            imgHeight = $(".magnified").height(),
            imgWidth = $(".magnified").width();
      
        // Show mangifier on hover
        $(".magnifier").show();
        
        // While the mouse is moving and over the image move the magnifier and magnified image
        $(this).mousemove(function(e){
      
          // Store position of mouse as it moves and calculate its position in percent
          var posX = e.pageX - imgPosition.left,
              posY = e.pageY - imgPosition.top,
              percX = (posX / imgWidth) * 100,
              percY = (posY / imgHeight) * 100,
              perc = percX + "% " + percY + "%";
          
          // Change CSS of magnifier, move it to mouse location and change background position based on the percentages stored.
          $(".magnifier").css({
            top:posY,
            left:posX,
            backgroundPosition: perc
          });
        });
      
      }, function(){
      
        // Hide the magnifier when mouse is no longer hovering over image.
        $(".magnifier").hide();
        
    });
    // product hove zoom

    // product show carousel
    $("#product_details_carousel").owlCarousel({
        items : 4,
        nav : false,
        dots : false,
        autoplay : true,
        autoplayHoverPause : true,
        autoplayTimeout : 4000,
        autoplaySpeed : 1000,
        loop : true,
        responsive : {
            0: {
                items : 2
            },
            460 : {
                items : 3
            },
            768 : {
                items : 4
            },
            992 : {
                items : 4
            }

        }
    })
    // end product show carousel
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
let getProductNames = document.querySelectorAll(".product_name");

let getProductHeadIcons = document.querySelectorAll(".product_heart_icon");
let getProductCartIcons = document.querySelectorAll(".product_cart_icon");

let getTotalFavIcons = document.querySelectorAll(".fav_product");
let getTotalCartIcons = document.querySelectorAll(".cart_product");
getProductNames.forEach(function(getProductName ){
    getProductName.id = Math.floor(Math.random()*10000);
})

function productStore(getIcons,localName,showIcons){
    getIcons.forEach(function(icons){
        icons.addEventListener("click",function(){
            if(!this.classList.contains("active")){
                this.classList.add("active");
                let productImg = this.parentElement.parentElement.parentElement.parentElement.style.backgroundImage;
                let imgName = productImg.replace("./assets/imgs/products/","");
                let newImg = imgName.replace("url","");
                let dropopenBrack = newImg.replace("(","");
                let dropCloseBrack = dropopenBrack.replace(")","");
                let dropOpenCote = dropCloseBrack.replace("\"","");
                let dropCloseCote = dropOpenCote.replace("\"","");
                let getImg = dropCloseCote;
                let productId = this.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[0].id;
                let productName = this.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[0].innerText;
                let productPrice = this.parentElement.parentElement.parentElement.parentElement.nextElementSibling.children[1].innerText;
                
        
                let storeProductObj = {
                    id : productId,
                    img : getImg,
                    name : productName,
                    price : productPrice,
                    quantity : 1
                }
        
        
                let favCollectArr ;
        
                if(localStorage.getItem(localName) === null){
                    favCollectArr = [] ;
                }else {
                    favCollectArr = JSON.parse(localStorage.getItem(localName));
                }
        
                favCollectArr.push(storeProductObj);
                localStorage.setItem(localName,JSON.stringify(favCollectArr))
        
                showIcons.forEach(function(getTotalFavIcon){
                    getTotalFavIcon.innerHTML = " ";
                    getTotalFavIcon.innerText = favCollectArr.length;
                })
            }
           
        })
    })
}

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

productStore(getProductHeadIcons,"ogani_fav_product",getTotalFavIcons);
productStore(getProductCartIcons,"ogani_cart_product",getTotalCartIcons);

showLocalCount(getTotalFavIcons,getFavProducts,"ogani_fav_product");
showLocalCount(getTotalCartIcons,getCartProducts,"ogani_cart_product");

let totalItems = 0 ;

if(!getCartProducts == null){
    getCartProducts.forEach(function(getCartProduct){
        // console.log(getCartProduct.price)
        let getTotal = +getCartProduct.price * +getCartProduct.quantity;
    
        totalItems += getTotal;
    })
}


// console.log(totalItems);
let showTotalItems = document.querySelectorAll(".total_items");
showTotalItems.forEach(function(showTotalItem){
    showTotalItem.innerHTML = " ";
    showTotalItem.innerText = `$ ${totalItems}.00`;
})

// end product store

// start product show detail

let getMagnifier = document.querySelector(".main_product_img .magnifier");
let getMagnified = document.querySelector(".main_product_img .magnified img");

let getShowProductLists = document.querySelectorAll("#product_details_carousel .product_img_container a img");

// console.log(getMagnifier,getMagnified,getShowProductLists);

getShowProductLists.forEach(function(getShowProductList){
    getShowProductList.addEventListener("click",function(){
        console.log(this.src);
        let getImgSrc = this.src;
        getMagnifier.style.backgroundImage = " ";
        getMagnified.src = " ";
        changeImg(getImgSrc);
    })
})

function changeImg(src){
    getMagnifier.style.backgroundImage = `url(${src})`;
    getMagnified.src = src;
}
// start product show detail

// start product quenty btn group
let getDecQtyBtn = document.querySelector("#dec_qty_btn");
let getIncQtyBtn = document.querySelector("#inc_qty_btn");

let getQtyShowBox = document.querySelector("#p_quenty");

let int = 1 ;

getIncQtyBtn.addEventListener("click",()=>{
    int += 1;
    // console.log(int);
    if(int > 10){
        int = 1;
    }
    getQtyShowBox.value = int;
})

getDecQtyBtn.addEventListener("click",()=>{
    int -= 1;
    if(int < 1) {
        int = 10;
    }
    // console.log(int);
    getQtyShowBox.value = int;
})
// end product quenty btn group

// show product information
let getProInfoTabs = document.querySelectorAll(".information_tab_menu ul li span.fw-bold");
let getProInfos = document.querySelectorAll(".show_information");
let getProTitle = document.querySelector(".information_title");

getProInfoTabs.forEach(function(getProInfoTab,idx){
    getProInfoTab.style.cursor = "pointer";
    getProInfoTab.setAttribute("show-pro-info",idx);
    getProInfoTab.addEventListener("click",function(){
        getProInfoTabs.forEach(function(getProInfoTab){
            getProInfoTab.classList.remove("active");
        })
        this.classList.add("active");
        let getIdx = this.getAttribute("show-pro-info");
        getProTitle.innerHTML = " ";
        getProTitle.innerText = `Product ${this.innerText}`; 
        showInfo(getIdx);
    })
})


function showInfo(idx){
    getProInfos.forEach(function(getProInfo){
        getProInfo.classList.remove("active");
    })
    getProInfos[idx].classList.add("active");
}

// end product infromation