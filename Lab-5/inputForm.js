// var check = document.getElementById("btn")
// check.addEventListener("click", () => {
//     console.log("ok")
// })

function check(){
    var emailCheck = document.getElementById("email");

    if(!emailCheck.value){
        emailCheck.classList.remove("email1");
        emailCheck.classList.add("email2")
    }
}

// var emailC = document.getElementById("email");
// emailC.addEventListener("change",onchange) 

function onChange(){
    var emailCheck = document.getElementById("email");
    emailCheck.classList.remove("email2");
    emailCheck.classList.add("email1")
console.log("Change")
 }


