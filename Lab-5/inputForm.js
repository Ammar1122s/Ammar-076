

function check(){
    var emailCheck = document.getElementById("email");

    var passCheck = document.getElementById("pass");

    if(!emailCheck.value){
        emailCheck.classList.remove("email1");
        emailCheck.classList.add("email2")
    }

    if(!passCheck.value){
        passCheck.classList.remove("pass1");
        passCheck.classList.add("email2");
    }

    if(passCheck.value && passCheck.value){
        alert("Login!")
    }
}


function onChange(){
    var emailCheck = document.getElementById("email");
    var passCheck = document.getElementById("pass");
    emailCheck.classList.remove("email2");
    emailCheck.classList.add("email1")
    passCheck.classList.remove("email2");
    passCheck.classList.add("pass1");
console.log("Change")
 }


