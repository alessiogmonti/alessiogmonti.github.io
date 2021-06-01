$(document).ready(function (){
  $('.menu-toggler').on('click', function () {
    $(this).toggleClass('open');
    $('.top-nav').toggleClass('open');
    $('.slogan').fadeToggle(300,"linear");
  });

  $('.top-nav .nav-link').on('click', function() {
    $('.menu-toggler').removeClass('open');
    $('.top-nav').removeClass('open');
  });

  $('nav a[href*="#"]').on('click', function() {
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top -100
    }, 1000);
  });

  $('.material-icons-outlinedA').on('click', function() {
    $('html, body').animate({
      scrollTop: $($('#about')).offset().top -100
    }, 1000);
  });

  $('#up').on('click', function() {
    $('html, body').animate({
      scrollTop: 0
    }, 500);
  });

  AOS.init({
    easing: 'ease',
    duration: 1800,
    once: true
  });
});

$('.contact1-form').on('submit',function(e){
        //optional validation code here

        e.preventDefault();

        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbxBnyuIH3LQNaZ5_kxwSMl1lSZkHgBe96-_k7r7QNKZC564xRS6dWidKW16EA7g1yRpng/exec",
            method: "POST",
            dataType: "json",
            data: $(".contact1-form").serialize(),
            success: function(response) {

                if(response.result == "success") {
                    $('.contact1-form')[0].reset();
                    alert('Message sent, thank you!');
                    return true;
                }
                else {
                    alert("Something went wrong. Please try again.")
                }
            },
            error: function() {

                alert("Something went wrong.")
            }
        })
    });
