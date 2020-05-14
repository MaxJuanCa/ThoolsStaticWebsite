$(window).on("load",function(){
    $(".se-pre-con").fadeOut("slow");
});

$(document).ready(function () {
    $('a').click(function () {
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 1000);
        return false;
    });
    $('#slogan').addClass('animated zoomIn');
    AOS.init();
});