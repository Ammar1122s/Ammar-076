$(function(){

$("#add-btn").on("click",clicked)

})

function clicked(){
    $.ajax({
        type: "GET",
        url: "https://dummyjson.com/products/1",
        success: function (response) {
            console.log(response)   
            $("#form-add").addClass("form-add1");
            $("#id").append(response.id);
            $("#title").append(response.title);
            $("#des").append(response.description);
        }
    });

   
  
}