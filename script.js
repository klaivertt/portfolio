$(".option").click(function(){
    $(".option").removeClass("active");
    $(this).addClass("active");
    
 });

 document.addEventListener("DOMContentLoaded", function() {
    var shapes = document.querySelectorAll(".shape");
    
    shapes.forEach(function(shape) {
        shape.addEventListener("mouseover", function() {
            this.style.backgroundColor = "#ff0000";
        });
        
        shape.addEventListener("mouseout", function() {
            this.style.backgroundColor = "#ffffff";
        });
    });
});

