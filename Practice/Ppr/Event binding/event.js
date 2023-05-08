window.onload = binding;
var btn;
function binding() {
  btn = document.getElementById("btn");
  btn.onclick = () => {
    console.log("Hello");
  };
}


