// $(function(){
//     $("#btn").click(check)
// })

// function check() {
//     var r = $("#input").val()
//     $(".result").addClass("result1")

//     $(".result").html("<ul><li>"+r+"</li></ul>");

//   }


$(function () {
    $("#btn").click(newFunc);
    // $("std").on("click","li",newFunc)
  })

  function newFunc(){
    console.log("Hello")
    var stds = $("#stds li")
    console.log(stds)
    var final =[] ;
    // stds.foreach(e => {
    //     final.push(e.innerHTML);
    // });

    for (let index = 0; index < stds.length; index++) {
        final.push(stds[index].innerHTML)
        
    }

    console.log(final)

    final.sort()

    console.log(final)
  }