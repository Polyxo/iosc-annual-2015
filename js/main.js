 var nav = $(".main-nav a");


 //Add Modernizr test
 Modernizr.addTest('isios', function() {
     return navigator.userAgent.match(/(iPad|iPhone|iPod)/g);
 });

 /* Main Navigation
 TODO: Remove, no longer used 

  var menutoggle = "closed";
   $(document).click(function(e) {
       var target = e.target;
       //e.preventDefault();
       if ($(target).is('#menu-mainmenu') || $(target).parents().is('#menu-mainmenu') || $(target).is('.menuicon') && menutoggle == "closed" || $(target).parents().is('.menuicon') && menutoggle == "closed") {
           $('body').addClass("mobilenav");
           $('.menuicon').addClass("open");
           menutoggle = "open";
       } else {
           $('body').removeClass("mobilenav");
           $('.menuicon').removeClass("open");
           menutoggle = "closed";
       }
   }); */

 /* Don't show fancy transitions on Android */
 if (Modernizr.touch && Modernizr.cssclippathpolygon && Modernizr.isios ||  !Modernizr.touch) {
     var effect = 'fade';
 } else {
     var effect = 'swipe';
 }

 /* Initialize Swiper */
 var swiper = new Swiper('.swiper-container', {
     //pagination: '.swiper-pagination',
     direction: 'vertical',
     slidesPerView: 1,
     speed: 100,
     pagination: '.swiper-pagination',
     paginationClickable: true,
     spaceBetween: 0,
     longSwipesRatio: 0.1,
     keyboardControl: true,
     hashnav: true,
     a11y: true,
     hashnavWatchState: true,
     mousewheelSensitivity: 0.005,
     effect: effect,
     nextButton: '.nextbutton',
     prevButton: '.previousbutton',
     mousewheelControl: true,
     mousewheelReleaseOnEdges: true,
     watchSlidesProgress: true,
     onInit: function() {
         $(".top-nav").addClass("hidden");
     },
     onSlideChangeStart: function(swiper) {
         var nextIndex;
          if (swiper.activeIndex <= 1) {
             $(".top-nav").addClass("hidden");
         }
         else {
             setTimeout(function(){ $(".top-nav").removeClass("hidden"); }, 200);
         } 
         $(nav).each(function(index) {
             if (index !== nav.length - 1) {
                 nextIndex = nav.eq(index + 1).data('slide');
             } else {
                 nextIndex = 1000;
             }
             if (swiper.activeIndex >= $(this).data('slide') && swiper.activeIndex < nextIndex) {
                 $(this).addClass("active");
             } else {
                 $(this).removeClass("active");
             }
         });
     },
 });

 /* Fit Image to parent container */
 $('.fitimage').imagefill({ target: '.background-image' });

 $(".scrolldown").on("click", function(e) {
     e.preventDefault();
     swiper.slideNext();
 });

 $(".main-nav a").on("click", function(e) {
     e.preventDefault();
     swiper.slideTo($(this).data('slide'));
 });

 /* Share Popups */
 $(".social-nav a").on("click", function(e) {
     e.preventDefault();
     var winHeight = 350;
     var winWidth = 520;
     var url = window.location;
     var text = 'In 2015, our global volunteers stood for the opportunities the Internet brings. Join them. internetsociety.org/2015lookback';
     var winTop = (screen.height / 2) - (winHeight / 2);
     var winLeft = (screen.width / 2) - (winWidth / 2);
     if ($(this).hasClass("facebook")) {
       window.open('http://www.facebook.com/sharer.php?s=100&p[url]=' + url, 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
     }
     else {
       window.open('https://twitter.com/home?status=' + encodeURI(text), 'sharer', 'top=' + winTop + ',left=' + winLeft + ',toolbar=0,status=0,width=' + winWidth + ',height=' + winHeight);
     }
 });
