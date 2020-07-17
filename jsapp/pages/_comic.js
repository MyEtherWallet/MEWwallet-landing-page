/**
 * Комикс
 **/

var comics = []
var comic = -1
var DELAY = 150

$(window).load(function(){
  updateButtons()
  resizeComicWrap()
});

$(window).resize(function(){
  resizeComicWrap()
});

function loadComic() {
  updateButtons()

  if (!comics[comic]) {
    comics[comic] = bodymovin.loadAnimation({
      container: document.getElementById('js-comic'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: getComicPatch()
    });

    comics[comic].addEventListener('DOMLoaded', playComic);
  } else {
    playLoadedComic()
  }
}

function playLoadedComic() {
  comics[comic] = bodymovin.loadAnimation({
    container: document.getElementById('js-comic'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: comics[comic].animationData
  });

  comics[comic].addEventListener('DOMLoaded', playComic);
}

function playComic() {
  $('.js-comic').fadeTo(DELAY, 1);

  setTimeout(function(){
    comics[comic].play()
  }, DELAY)
}

function nextComic() {
  if(comic == -1) {
    $('.js-comic').fadeTo(DELAY, 0);

    setTimeout(function(){
      document.getElementById("js-comic").innerHTML = "";
      comic += 1;
      loadComic(comic);
    }, DELAY);
  } else if (comic !== 10) {
    $('.js-comic').fadeTo(DELAY, 0);

    setTimeout(function(){
      comics[comic].stop()
      comics[comic].destroy()

      comic += 1
      loadComic(comic)
    }, DELAY)
  }
}

function prevComic() {
  if(comic !== -1) {
    $('.js-comic').fadeTo(DELAY, 0);

    setTimeout(function(){
      comics[comic].stop()
      comics[comic].destroy()
  
      comic -= 1
  
      if(comic == -1) {
        $('.js-comic').fadeTo(DELAY, 1);

        setTimeout(function(){
          document.getElementById("js-comic").innerHTML = '<img class="comic-book__wrapper-cover" src="/pic/what-is-eth-cover@2x.png" />';
          updateButtons();        
        }, DELAY)
      } else {
        loadComic(comic)
      }
    }, DELAY)
  }
}

function getComicPatch() {
  var path = ""

  switch (comic) {
    case 0:
      path = "/comic-book/_MEW_S1.json";
      break;
    case 1:
      path = "/comic-book/_MEW_S2.json";
      break;
    case 2:
      path = "/comic-book/_MEW_S3.json";
      break;
    case 3:
      path = "/comic-book/_MEW_S4.json";
      break;
    case 4:
      path = "/comic-book/_MEW_S5.json";
      break;
    case 5:
      path = "/comic-book/_MEW_S6.json";
      break;
    case 6:
      path = "/comic-book/_MEW_S7.json";
      break;
    case 7:
      path = "/comic-book/_MEW_S8.json";
      break;
    case 8:
      path = "/comic-book/_MEW_S9.json";
      break;
    case 9:
      path = "/comic-book/_MEW_S10-1.json";
      break;
    case 10:
      path = "/comic-book/_MEW_S10-2.json";
      break;
    default:
      path = "/comic-book/_MEW_S1.json";
  }

  return path  
}

function resizeComicWrap() {
  var height = $(window).height() - 80
  var width = Math.floor(1080 / (1920 / height))

  if($(window).width() > 960) {
    $(".js-comic").removeAttr("style");

    var styles = {
      width: width,
      height: height,
      marginLeft: -Math.floor(width / 2),
      display: 'block',
      top: 40,
      left: "50%",
    };
  
    $(".js-comic-wrapper").css(styles);
  
    $("#clipped-rect").attr('width' , width);
    $("#clipped-rect").attr('height' , height);
    $("#clipped-rect").attr('rx' , 20);
    $("#clipped-rect").attr('ry' , 20);

  } else if($(window).width() > 740) {

    $(".js-menu").removeAttr("style");

    height = $(window).height() - 412
    width = Math.floor(1080 / (1920 / height))

    var styles = {
      width: width,
      height: height,
      marginLeft: -Math.floor(width / 2),
      display: 'block',
      top: 209,
      left: "50%",
    };
  
    $(".js-comic").removeAttr("style");
  
    $("#clipped-rect").attr('width' , width);
    $("#clipped-rect").attr('height' , height);
    $("#clipped-rect").attr('rx' , 20);
    $("#clipped-rect").attr('ry' , 20);

  } else {
    var width1 = window.innerWidth;
    var height1 = Math.floor(1920 / (1080 / width1));

    if (height1 < window.innerHeight) {
      height1 = window.innerHeight
      width1 = Math.floor(1080 / (1920 / height1));
    }
    
    var styles1 = {
      width: width1,
      height: height1,
      display: 'block',
      top: (window.innerHeight - height1) / 2,
      left: (window.innerWidth - width1) / 2,
    };

    $(".js-comic").css(styles1);

    var styles = {
      width: window.innerWidth,
      height: window.innerHeight,
      marginLeft: 0,
      display: 'block',
      top: 0,
      left: 0,
    };
  
    $(".js-comic-wrapper").css(styles);
  
    $("#clipped-rect").attr('width', window.innerWidth);
    $("#clipped-rect").attr('height', window.innerHeight);
    $("#clipped-rect").attr('rx' , 0);
    $("#clipped-rect").attr('ry' , 0);
  }

  $(".js-menu").removeAttr("style");

  $(".js-comic-body").css({
    width: window.innerWidth,
    height: window.innerHeight,
  });
}

function updateButtons() {
  if(comic == -1) {
    $(".js-prev").addClass('hide');
  } else {
    $(".js-prev").removeClass('hide');
  }

  if(comic == 10) {
    $(".js-next").addClass('hide');
  } else {
    $(".js-next").removeClass('hide');
  }
}

function toggleMenu() {
  $(".js-menu-toggle").toggleClass('close');
  $(".js-menu").slideToggle('close');
} 
