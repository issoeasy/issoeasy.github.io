  //搜索功能

  $('.soushuo-box>input').focus(function() {
      $('.sousuo').show();
      $('.sousuoinp').focus();
      $('body').css('overflow', 'hidden');
  });
  $('.chacha').click(function() {
      $('.sousuo').hide();
      $('body').css('overflow', 'auto');
  });





  $('.sousuoinp').blur(function() {
      $('.sousuo-ccc').slideUp();
  });
  $('.sousuoinp').focus(function() {
      $('.sousuo-ccc').slideDown();
  });
  $('.sousuo-ccc ul li').click(function() {
      console.log($(this).text());
      $('.sousuoinp').val($(this).text());
      $('.old-text-one').css('display', 'flex');
      var a = $('<span>' + $(this).text() + '</span>')
      $('.old-text-two').append(a);
      a.click(function() {
          $('.sousuoinp').val($(this).text());
          console.log('sssss');

      });
  })
  $('.qingkong').click(function() {
      $('.old-text-two').html('');
      $('.old-text-one').css('display', 'none');
  });