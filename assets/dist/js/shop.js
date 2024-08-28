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

    // start sale off 
    $("#sale_off_carousel").owlCarousel({
        items : 3 ,
        loop : true,
        autoplay : true,
        autoplayHoverPause : true,
        autoplayTimeout : 4000,
        autoplaySpeed : 1000,
        dots : true,
        nav : false,
        responsive :{
            0 : {
                items : 2
            },
            443 :{
                items : 2,
            },
            768 : {
                items : 2
            },
            992 : {
                items : 3 ,
            }
        }
    });
    // end product slide section


        // start product choise section
        $(".product_choise").owlCarousel({
            items:1,
            dots : false,
            nav : true,
            loop : true,
            autoplay : true,
            autoplayHoverPause : true,
            autoplayTimeout : 4000,
            autoplaySpeed : 1000,
        })
        // end product choise section


    // start price range
    $( function() {
        $( "#price_slider-range" ).slider({
          range: true,
          min: 0,
          max: 500,
          values: [ 100, 300 ],
          slide: function( event, ui ) {
            $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
          }
        });
        $( "#amount" ).val( "$" + $( "#price_slider-range" ).slider( "values", 0 ) +
          " - $" + $( "#price_slider-range" ).slider( "values", 1 ) );
      } );
    // end price range

    $(".magnified").hover(function(e){

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
                let productPrice = this.parentElement.parentElement.parentElement.parentElement.nextElementSibling.querySelector(".product_price").innerText.replace("$","");
                // console.log(productPrice);
                
        
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

// start show product layout
let getLayoutBtns = document.querySelectorAll(".show_products_layout_group button");
let getLayoutConts = document.querySelectorAll(".show_product_container");
// console.log(getLayoutBtns);

getLayoutBtns.forEach(function(getLayoutBtn,idx){
    getLayoutBtn.setAttribute("data-show-layout",idx);
    getLayoutBtn.addEventListener("click",function(){
        getLayoutBtns.forEach(function(getLayoutBtn){
            getLayoutBtn.classList.remove("active");
        })
        this.classList.add("active");
        let getIdx = this.getAttribute("data-show-layout");
        // console.log(getIdx);
        showProductsLayout(getIdx);
    })
})

function showProductsLayout(idx){
    getLayoutConts.forEach(function(getLayoutCont){
        getLayoutCont.classList.remove("active");
    })
    getLayoutConts[idx].classList.add("active");
}
// end show product layout