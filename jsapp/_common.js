/**
 * Общие скрипты
 **/

var ownFunds = false
var staySafe = false
var videoPlay = false

var ownFundsAnimate = undefined
var staySafeAnimate = undefined
var video = document.getElementById("player")
var videoMobile = document.getElementById("player-m")

var playButton = $('.js-play-video')

$(window).load(function(){

  playButton.click(function(){
    play();
  });

  bodymovin.loadAnimation({
    container: document.getElementById('js-animate'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: '/start.json'
  });

  ownFundsAnimate = bodymovin.loadAnimation({
    container: document.getElementById('js-animate-own-funds'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: '/own-funds.json'
  });

  staySafeAnimate = bodymovin.loadAnimation({
    container: document.getElementById('js-animate-stay-safe'),
    renderer: 'svg',
    loop: true,
    autoplay: false,
    path: '/stay-safe.json'
  });
});

$(document).scroll(function() {
  if (comeOrigin("#js-animate-own-funds") && !ownFunds) {
    ownFunds = true

    ownFundsAnimate.play()
  }

  if (comeOrigin("#js-animate-stay-safe") && !staySafe) {
    staySafe = true

    staySafeAnimate.play()
  }

  if (come("#js-video") && !videoPlay) {
    if($(window).width() > 740) play();
  }

  if (!come("#js-video") && videoPlay) {
    stop();
  }
});

function play() {
  var currentVideo = $(window).width() > 740 ? video : videoMobile;
  currentVideo.play();
  videoPlay = true;
  playButton.hide()
}

function stop() {
  var currentVideo = $(window).width() > 740 ? video : videoMobile;
  currentVideo.pause();
  // video.currentTime = 0;
  videoPlay = false;
  playButton.show()
}

function comeOrigin(elem) {
  var docViewTop = $(window).scrollTop(),
    docViewBottom = docViewTop + $(window).height(),
    elemTop = $(elem).offset().top,
    elemBottom = elemTop + $(elem).height();

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function come(elem) {
  var docViewTop = $(window).scrollTop(),
    docViewBottom = docViewTop + $(window).height(),
    elemTop = $(elem).offset().top,
    elemBottom = elemTop + $(elem).height();

  elemBottom -= $(window).height() / 5.0
  elemTop += $(window).height() / 5.0

  return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
