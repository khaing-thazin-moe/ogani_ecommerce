
// start password box
let getCheckEye = document.querySelector("#show_password");
let getPasswordBox = document.querySelector("#password");
document.querySelector("#eyes").addEventListener("click",function(){
    if(getCheckEye.checked){
        // console.log(true);
        this.classList.remove("active");
        getPasswordBox.setAttribute("type","password");
    }else{
        // console.log(false);
        this.classList.add("active");
        getPasswordBox.setAttribute("type","text");
    }
})
// end password box