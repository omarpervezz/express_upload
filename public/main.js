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
        "./src/assets/img/banner3.jpg",
        "./src/assets/img/banner4.jpg",
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
  // back to top
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
  //gallery slider */
  $(function () {
    lc_lightbox(".elem", {
      // whether to display a single element or compose a gallery
      gallery: true,

      // attribute grouping elements - use false to create a gallery with all fetched elements
      gallery_hook: "rel",

      // if a selector is found, set true to handle automatically DOM changes
      live_elements: true,

      // whether to preload all images on document ready
      preload_all: false,

      // force elements type
      global_type: "image",

      // attribute containing element's source
      src_attr: "href",

      // attribute containing the title - is possible to specify a selector with this syntax: "> .selector" or "> span"
      title_attr: "title",

      // attribute containing the description - is possible to specify a selector with this syntax: "> .selector" or "> span"
      txt_attr: "data-lcl-txt",

      // attribute containing the author - is possible to specify a selector with this syntax: "> .selector" or "> span"
      author_attr: "data-lcl-author",

      // whether to enable slideshow
      slideshow: true,

      // animation duration for lightbox opening and closing / 1000 = 1sec
      open_close_time: 500,

      // overlay's animation advance (on opening) and delay (on close) to window / 1000 = sec
      ol_time_diff: 100,

      // elements fading animation duration in millisecods / 1000 = 1sec
      fading_time: 150,

      // sizing animation duration in millisecods / 1000 = 1sec
      animation_time: 300,

      // slideshow interval duration in milliseconds / 1000 = 1sec
      slideshow_time: 6000,

      // autoplay slideshow - bool
      autoplay: false,

      // whether to display elements counter
      counter: false,

      // whether to display a progressbar when slideshow runs
      progressbar: true,

      // whether to create a non-stop pagination cycling elements
      carousel: true,

      // Lightbox maximum width.
      // Use a responsive percent value or an integer for static pixel value
      max_width: "93%",

      // Lightbox maximum height.
      // Use a responsive percent value or an integer for static pixel value
      max_height: "93%",

      // overlay opacity / value between 0 and 1
      ol_opacity: 0.7,

      // background color of the overlay
      ol_color: "#111",

      // overlay patterns - insert the pattern name or false
      ol_pattern: false,

      // width of the lightbox padding in pixels
      padding: 10,

      // lightbox border radius in pixels
      radius: 4,

      // whether to apply a shadow around lightbox window
      shadow: true,

      // whether to hide page's vertical scroller

      // custom classes added to wrapper - for custom styling/tracking
      wrap_class: "",

      // light / dark / Minimal
      skin: "light",

      // over / under / lside / rside
      data_position: "over",

      // inner / outer
      cmd_position: "inner",

      // set closing button position for inner commands - normal/corner
      ins_close_pos: "normal",

      // set arrows and play/pause position - normal/middle
      nav_btn_pos: "normal",

      // whether to hide texts on lightbox opening - bool or int (related to browser's smaller side)
      txt_hidden: 500,

      // bool / whether to display titles
      show_title: true,

      // bool / whether to display descriptions
      show_descr: true,

      // bool / whether to display authors
      show_author: true,

      // enables thumbnails navigation (requires elements poster or images)
      thumbs_nav: true,

      // print type icons on thumbs if types are mixed
      tn_icons: true,

      // whether to hide thumbs nav on lightbox opening - bool or int (related to browser's smaller side)
      tn_hidden: 500,

      // width of the thumbs for the standard lightbox
      thumbs_w: 110,

      // height of the thumbs for the standard lightbox
      thumbs_h: 110,

      // attribute containing thumb URL to use or false to use thumbs maker
      thumb_attr: false,

      // script baseurl to create thumbnails (use src=%URL% w=%W% h=%H%)
      thumbs_maker_url: false,

      // Allow the user to expand a resized image. true/false
      fullscreen: true,

      // resize mode of the fullscreen image - smart/fit/fill
      fs_img_behavior: "fit",

      // when directly open in fullscreen mode - bool or int (related to browser's smaller side)
      fs_only: 500,

      // whether to trigger or nor browser fullscreen mode
      browser_fs_mode: false,

      // bool
      socials: true,
      fb_share_params: false,

      // bool / allow text hiding
      txt_toggle_cmd: true,

      // bool / whether to add download button
      download: true,

      // bool / Allow touch interactions for mobile (requires AlloyFinger)
      touchswipe: true,

      // bool / Allow elements navigation with mousewheel
      mousewheel: true,

      // enable modal mode (no closing on overlay click)
      modal: false,

      // whether to avoid right click on lightbox
      rclick_prevent: false,
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






















