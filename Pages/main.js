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

$.getJSON("https://api.countapi.xyz/hit/alessiogmonti.github.io/visits", function(response) {
    $("#visits").text(response.value);
});

var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
  showDivs(slideIndex += n);
}

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("myslide");
  if (n > x.length) {slideIndex = 1}
  if (n < 1) {slideIndex = x.length} ;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex-1].style.display = "block";
}

let elements = document.querySelectorAll('#animate')
for (let i = 0; i < elements.length; i++) {
  let x = elements[i].querySelectorAll('.img-G')
  let index = 0;
  carousel(index, x);
}

function carousel(index, x) {
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  index++;
  if (index > x.length) {index = 1}
  x[index-1].style.display = "block";
  setTimeout(function(){carousel(index,x)}, 2000); // Change image every 1 seconds
}

// $('.contact1-form').on('submit',function(e){
//         //optional validation code here
//
//         e.preventDefault();
//
//         $.ajax({
//             url: "https://script.google.com/macros/s/AKfycbzmGoq7kwKLNdxk_c5nm0Rx4BOGdxBOa2NFoKsp6F_ZY5C4UDT7VYCX9T9NonO2ic-pOw/exec",
//             method: "POST",
//             dataType: "json",
//             data: $(".contact1-form").serialize(),
//             success: function(response) {
//
//                 if(response.result == "success") {
//                     $('.contact1-form')[0].reset();
//                     alert('Message sent, thank you!');
//                     return true;
//                 }
//                 else {
//                     alert("Something went wrong. Please try again.")
//                 }
//             },
//             error: function() {
//                 alert("Looks like something's broken! Please email me at alessiomonti97@gmail.com while I figure out how to fix")
//             }
//         })
//     });
