$(function () {
  $("#btn").click(function () {
    console.log("Loading!!");
    // $.get("https://usman-fake-api.herokuapp.com/api/recipes", newFun);
    $.ajax({
      url: "https://usman-fake-api.herokuapp.com/api/recipes",
      method: "GET",
      success: newFun,
    });
  });

});

function newFun(response) {
  console.log(response);

  response.map((r) => {
    $("#main").append("<div>Title: " + r.title + "</div>");
  });
}

// var new1 = function(){
//     console.log("OK")
// }

// function newa(fun) { 
//     console.log(fun)
//  }

//  newa(new1)