  //右侧的导航栏
  $('.main-youbian-three').mouseenter(function(e) {
      $('.main-youbian-three img').attr('src', './img/笑脸111.svg')
      $('.main-youbian-three a').css('color', '#f34141')

  }).mouseleave(function(e) {
      $('.main-youbian-three img').attr('src', './img/笑脸.svg')
      $('.main-youbian-three a').css('color', '#666')

  })
  $('.main-youbian-two').mouseenter(function(e) {
      $('.main-youbian-two img').attr('src', './img/扫一扫111.svg')
      $('.main-youbian-two a').css('color', '#f34141')
      $('.main-youbian .xiazai ').css('display', 'block')
  }).mouseleave(function(e) {
      $('.main-youbian-two img').attr('src', './img/扫一扫.svg')
      $('.main-youbian-two a').css('color', '#666')
      $('.main-youbian .xiazai ').css('display', 'none')
  })
  $('.main-youbian-one').mouseenter(function(e) {
      $('.main-youbian-one img').attr('src', './img/在线客服111.svg')
      $('.main-youbian-one a').css('color', '#f34141')
  }).mouseleave(function(e) {
      $('.main-youbian-one img').attr('src', './img/在线客服2.svg')
      $('.main-youbian-one a').css('color', '#666')
  })
  $('.huidingbu').mouseenter(function(e) {
      $('.huidingbu img').attr('src', './img/回到顶部111.svg')
      $('.huidingbu a').css('color', '#f34141')
  }).mouseleave(function(e) {
      $('.huidingbu img').attr('src', './img/回到顶部.svg')
      $('.huidingbu a').css('color', '#666')
  })
  $(window).scroll(function() {
      if ($(this).scrollTop() > 650) {
          $('.huidingbu').show();
      } else {
          $('.huidingbu').hide();
      }


  })
  $('.huidingbu').click(function(e) {
      $(window).scrollTop(0);
  })