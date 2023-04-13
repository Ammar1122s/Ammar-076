$(function(){

$("#add-btn").on("click",clicked)

})

function clicked(){
    $.ajax({
        type: "GET",
        url: "https://dummyjson.com/products",
        success: function (response) {
            console.log(response)   
            response.products.map((re)=>{

                $(".parent1").append(" <div class='parent'> <p>Id: " + re.id + " </p> <p>Title: " + re.title + "  </p> <img class='tumb' src='" + re.thumbnail
                 + " ' alt=''> </div>");

            })
        }
    });

   
  
}