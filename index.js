var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var videoIDCounter = 0;
var videoCategory = 'Nature';

function onPlayerReady(event) {
    var fn = function(){ player.playVideo(); } 
    setTimeout(fn, 1000);
}

function startPlayer(videoCategory, videoIDCounter){
    if (player) {
        player.loadVideoById(allVideos[videoCategory][videoIDCounter]);
    } else {
        player = new YT.Player('player', {
            videoId: allVideos[videoCategory][videoIDCounter],
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
    };
}

function handleLandingPage(){
    $('.category').on('click', function(event) {
        videoCategory = this.id;
        $('#landing').hide();
        $('#mainplayer').show()
        $('#js-video-page').show();
        startPlayer(videoCategory, 0);
    });
}

function handleRightArrowNext() {
    $('#js-next-button').on('click', function(event) {
        event.preventDefault();
        if (videoIDCounter < 4) {
            videoIDCounter++;
            player.loadVideoById(allVideos[videoCategory][videoIDCounter]);
        }
    });
}

function handleLeftArrowPrevious() {
    $('#js-previous-button').on('click', function(event) {
        event.preventDefault();
        if (videoIDCounter > 0) {
            videoIDCounter--;
            player.loadVideoById(allVideos[videoCategory][videoIDCounter]);
        }
    });
}

function handleHeaderHome() {
    $('#header-home').on('click', function(event) {
        videoIDCounter = 0;
        player.stopVideo();
        $('#js-video-page').hide();
        $('#js-splash-page').show();
        $('#landing').show();
    });
}

function driver() {
    handleLandingPage();
    handleRightArrowNext();
    handleLeftArrowPrevious();
    handleHeaderHome();
}

$(driver);