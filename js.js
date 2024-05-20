$(window).on("load",function(){
    $(".se-pre-con").fadeOut("slow");
});

$(document).ready(function () {
    $('a').click(function () {
        if (!$(this).hasClass("whatsapp")) {
            $('html, body').animate({
                scrollTop: $($.attr(this, 'href')).offset().top
            }, 1000);
            return false;
        }
    });
    AOS.init();
});