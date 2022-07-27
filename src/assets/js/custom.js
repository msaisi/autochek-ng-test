addEventListener("load", function () {
  setTimeout(hideURLbar, 0);
}, false);

function hideURLbar() {
  window.scrollTo(0, 1);
}

//nav smooth scroll
$(".dropdown").hover(
  function () {
    $('.dropdown-menu', this).stop(true, true).slideDown("fast");
    $(this).toggleClass('open');
  },
  function () {
    $('.dropdown-menu', this).stop(true, true).slideUp("fast");
    $(this).toggleClass('open');
  }
);
//nav smooth scroll

//popup modal (for location)
$('.popup-with-zoom-anim').magnificPopup({
  type: 'inline',
  fixedContentPos: false,
  fixedBgPos: true,
  overflowY: 'auto',
  closeBtnInside: true,
  preloader: false,
  midClick: true,
  removalDelay: 300,
  mainClass: 'my-mfp-zoom-in'
});
//popup modal (for location)

// cart-js
paypals.minicarts.render(); //use only unique class names other than paypals.minicarts.Also Replace same class name in css and minicart.min.js
paypals.minicarts.cart.on('checkout', function (evt) {
  let items = this.items(),
    len = items.length,
    total = 0,
    i;

  // Count the number of each item in the cart
  for (i = 0; i < len; i++) {
    total += items[i].get('quantity');
  }

  if (total < 3) {
    alert('The minimum order quantity is 3. Please add more to your shopping cart before checking out');
    evt.preventDefault();
  }
});
// cart-js

//password-script
window.onload = function () {
      document.getElementById("password1").onchange = validatePassword;
      document.getElementById("password2").onchange = validatePassword;
    }

    function validatePassword() {
      let pass2 = document.getElementById("password2").value;
      let pass1 = document.getElementById("password1").value;
      if (pass1 != pass2)
        document.getElementById("password2").setCustomValidity("Passwords Don't Match");
      else
        document.getElementById("password2").setCustomValidity('');
      //empty string means no validation error
}
//password-script

//smooth-scrolling
$(".scroll").click(function (event) {
  event.preventDefault();

  $('html,body').animate({
    scrollTop: $(this.hash).offset().top
  }, 1000);
});
//smooth-scrolling

//smooth-scrolling-of-move-up

/*
  let defaults = {
    containerID: 'toTop', // fading element id
    containerHoverID: 'toTopHover', // fading element hover id
    scrollSpeed: 1200,
    easingType: 'linear'
  };
*/

$().UItoTop({
  easingType: 'easeOutQuart'
});
//smooth-scrolling-of-move-up


/*$('#multi3').mdbRange({
  width: '100%',
  single: {
    active: true,
    multi: {
      active: true,
      rangeLength: 2
    },
  }
});*/

/*$(window).load(function () {

//declare var $: any;

    //flex slider

  alert("slider loaded");

    $('.flexslider').flexslider({
      animation: "slide",
      controlNav: "thumbnails",     //String: Select your animation type, "fade" or "slide"
      easing: "swing",
      video: true,
      slideshow: true,
      after: function () {
        // sets active_id to the active slide
        var active_id = $('.flex-active-slide').attr('type');

        console.log(active_id);
        //if the active slide is the video slide...
        /*if( active_id == "slide3"){
          //play the video and pause the slider
          myVideo.play();
          $('.flexslider').flexslider("pause");
          //when the video has ended, go to the next slide and play the slider
          myVideo.onended = function(){
              $('.flexslider').flexslider("next");
              $('.flexslider').flexslider("play");
          }
        }* /
    },
    });
    //flex slider
});*/


/*function pauseslider() {
    $('.flexslider').flexslider("pause");
}
function playslider() {
    $('.flexslider').flexslider("play");
}
function resumeslider() {
    $('.flexslider').flexslider("next"); $('.flexslider').flexslider("play");
}*/
