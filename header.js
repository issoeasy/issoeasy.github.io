$('.header-top-right a:first-child').mouseenter(function(event) {
    $('.header-top-content .xiazai').show();
    console.log('aa');
}).mouseleave(function(event) {
    $('.header-top-content .xiazai').hide();
})