$(document).ready(function (){
  $('.menu-toggler').on('click', function () {
    $(this).toggleClass('open');
    $('.top-nav').toggleClass('open');
    $('.slogan').fadeToggle(100,"linear");
  });

  $('.top-nav .nav-link').on('click', function() {
    $('.menu-toggler').removeClass('open');
    $('.top-nav').removeClass('open');
  });

  $('nav a[href*="#"]').on('click', function() {
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top -100
    }, 1000);
    $('.slogan').fadeToggle(100,"linear");
  });

  $('.arrowdown').on('click', function() {
    $('html, body').animate({
      scrollTop: $($('#landingimage')).offset().top -1
    }, 1300);
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

document.head.appendChild(Object.assign(document.createElement("link"), {rel: "icon", href: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.6em' x='0' font-size='120'>\uD83D\uDF1B</text></svg>"}))


$('.contact1-form').on('submit',function(e){
        //optional validation code here

        e.preventDefault();

        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbyYLdlPBdamFIh-0S_sSZTSJceeT4VzoOJq8f59KzxD-lchUSdzD8MhxsYiH0iuYZVgzw/exec",
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
