var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      videoId: 'XJJaoK5WzGE',
      events: {
          'onReady': onPlayerReady
      },
      playerVars: {
          autoplay: 1,
          start: 38,
          controls: 0,
          modestbranding: 1,
          loop: 1
      }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
    event.target.mute();
}

function watchRightArrowNext() {
    $('.right-arrow-next').on('click', function(event) {
        event.preventDefault();
        console.log("right arrow clicked");
        player.loadVideoById('PF_7688Zk6s');
    })
}