import ACTIVE_SCROLL from "active-scroll-navigation";

class Header {
  constructor() {
    var that = this;
    that.initStickyClass();
    $(window).on("load", that.initScrollNav);
    that.smoothScroll();
  }
  initStickyClass() {
    $(window).on("scroll", () => {
      if ($(document).scrollTop() > 0) {
        $(".header").addClass("--mini");
      } else {
        $(".header").removeClass("--mini");
      }
    });
  }
  initScrollNav() {
    // new ACTIVE_SCROLL({
    //   nav: ".header__nav",
    //   offSet: 20
    // });
  }
  smoothScroll() {
    $(".smoothscroll").click(function() {
      var target = $($(this).attr("href"));
      $("html, body").animate(
        {
          scrollTop: target.offset().top
        },
        1000,
        function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            // Checking if the target was focused
            return false;
          } else {
            $target.attr("tabindex", "-1"); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          }
        }
      );
    });
  }
}

export default Header;
