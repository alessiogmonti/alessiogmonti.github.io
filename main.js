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
