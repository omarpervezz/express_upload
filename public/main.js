$(document).ready(function () {
  // Header Type = Fixed
  $(function () {
    $(window).scroll(function () {
      var scroll = $(window).scrollTop();
      var img, source;
      var header_ = $("header");

      img = $("header .logo_ .header_logo");

      if (scroll > 20) {
        $("header").addClass("nav_bg_adder animate__fadeInDownBig");
        // source =
        //   "./src/assets/logo_img/KakaoTalk_Photo_2023-02-10-00-16-41.png";
        // img.attr("src", source);
        // img.addClass("second_logo");
        var link__ = $(".nav_item");
        link__.addClass("black_");
        // change the src
      } else {
        $("header").removeClass("nav_bg_adder animate__fadeInDownBig");
        // source = "./src/assets/logo_img/the_right_realty_group.jpeg";
        // img.attr("src", source);
        // img.removeClass("second_logo");
      }
    });
  });

  /* banner slider */
  $(function () {
    $(".bg__").bgSlideShow({
      current: 0,
      randomize: false,
      images: [
        "https://images.unsplash.com/photo-1531971589569-0d9370cbe1e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1481&q=80",
        "./src/assets/img/slide-3.jpg",
        "./src/assets/img/slide-8.jpg",
      ],
      initialBackground:
        "https://images.unsplash.com/photo-1614846384571-1e31322ed3a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
      transitionDelay: 1000,
      transitionSpeed: 4000,
      transitionEffect: "fade-in",
      slideControls: {
        enabled: false,
        classes: null,
      },
      eventHandlers: {
        // before initialization
        beforeInit: null,
        // after initialization
        afterInit: null,
        // before the current image is replaced
        beforeChange: null,
        // after the current image is replaced
        afterChange: null,
      },
    });
  });

  /* team card */
  $(function () {
    $(".material-card > .mc-btn-action").click(function () {
      var card = $(this).parent(".material-card");
      var icon = $(this).children("i");
      icon.addClass("fa-spin-fast");

      if (card.hasClass("mc-active")) {
        card.removeClass("mc-active");

        window.setTimeout(function () {
          icon
            .removeClass("fa-arrow-left")
            .removeClass("fa-spin-fast")
            .addClass("fa-bars");
        }, 800);
      } else {
        card.addClass("mc-active");

        window.setTimeout(function () {
          icon
            .removeClass("fa-bars")
            .removeClass("fa-spin-fast")
            .addClass("fa-arrow-left");
        }, 800);
      }
    });
  });

  /* testimonials slider */
  $(function () {
    $("#testimonial-slider").owlCarousel({
      items: 2,
      itemsDesktop: [1000, 2],
      itemsDesktopSmall: [979, 2],
      itemsTablet: [768, 1],
      pagination: false,
      navigation: true,
      navigationText: ["", ""],
      autoPlay: false,
    });
  });

  $(function () {
    var btn = $("#back_top");

    $(window).scroll(function () {
      if ($(window).scrollTop() > 300) {
        btn.addClass("show");
      } else {
        btn.removeClass("show");
      }
    });

    btn.on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, "300");
    });
  });

  $(function () {
    $("a[href*=#]:not([href=#])").click(function () {
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html,body").animate(
            {
              scrollTop: target.offset().top,
            },
            1000
          );
          return false;
        }
      }
    });
  });
});

// Get the current page URL
const currentPageUrl = window.location.href;

// Get all the pagination links
const pageLinks = document.querySelectorAll(".page");

// Loop through each link and set the active class and disable the appropriate link
pageLinks.forEach((link) => {
  if (link.href === currentPageUrl) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});

ScrollOut({
  onShown(el) {
    console.dir(el);

    if (el.classList.contains("c__1")) {
      el.classList.add("animate__fadeInLeft");
    } else if (el.classList.contains("c__2")) {
      el.classList.add("animate__fadeInRight");
    } else if (el.classList.contains("banner_logo")) {
      el.classList.add("animate__fadeInUp");
    } else if (el.classList.contains("h__1")) {
      el.classList.add("animate__fadeInUp");
    }
  },
});

const menuItem = document.querySelectorAll(".nav_menu ul li a");
