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
    console.log(videoIDCounter);
    console.log(videoCategory);
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
                showinfo: 0,
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
        startPlayer(videoCategory, videoIDCounter);
    });
}

function handleRightArrowNext() {
    let timeOut = null;
    $('#js-video-page').on('mousemove', function() {
        if (timeOut !== null) {
            $('#js-next-button').show();
            clearTimeout(timeOut);
        };

        timeOut = setTimeout(function() {
            $('#js-next-button').hide();
        }, 4000);
    });

    $('#js-next-button').on('click', function(event) {
        console.log(videoIDCounter);
        console.log(videoCategory);
        event.preventDefault();
        if (videoIDCounter < 4) {
            videoIDCounter++;
            player.loadVideoById(allVideos[videoCategory][videoIDCounter]);
        };
    });
}

function handleLeftArrowPrevious() {
    let timeOut = null;
    $('#js-video-page').on('mousemove', function() {
        if (timeOut !== null) {
            $('#js-previous-button').show();
            clearTimeout(timeOut);
        };

        timeOut = setTimeout(function() {
            $('#js-previous-button').hide();
        }, 4000);
    });

    $('#js-previous-button').on('click', function(event) {
        console.log(videoIDCounter);
        console.log(videoCategory);
        event.preventDefault();
        if (videoIDCounter > 0) {
            videoIDCounter--;
            player.loadVideoById(allVideos[videoCategory][videoIDCounter]);
        };
    });
}

function handleHeaderHome() {
    let timeOut = null;
    $('#js-video-page').on('mousemove', function() {
        if (timeOut !== null) {
            $('#header-home').show();
            clearTimeout(timeOut);
        };

        timeOut = setTimeout(function() {
            $('#header-home').hide();
        }, 4000);
    });

    $('#header-home').on('click', function(event) {
        videoIDCounter = 0;
        console.log(videoIDCounter);
        console.log(videoCategory);
        player.stopVideo();
        $('#js-video-page').hide();
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