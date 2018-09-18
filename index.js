//This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
var videoIDCounter = 0;
var videoCategory = 'Nature';

//The API will call this function when the video player is ready.
function onPlayerReady(event) {
    var fn = function(){ player.playVideo(); } 
    setTimeout(fn, 1000);
}

//This function creates an <iframe> (and YouTube player) after the API code downloads.
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
                showinfo: 0,
                loop: 1
            }
          });
    };
}

//This function listens for which category user chooses and starts the appropriate video(s).
function handleLandingPage() {
    $('.category').on('click', function(event) {
        videoCategory = this.id;
        $('#landing').hide();
        $('#mainplayer').show()
        $('#js-video-page').show();
        startPlayer(videoCategory, videoIDCounter);
    });
}

function handleRightArrowNext() {

    //This code makes right arrow appear and disappear.
    let timeOut = null;
    $('#js-video-page').on('mousemove', function() {
        if (timeOut !== null) {
            $('#js-next-button').show();
            clearTimeout(timeOut);
        };

        timeOut = setTimeout(function() {
            $('#js-next-button').hide();
        }, 1000);
    });

    //This code listens for right arrow to be clicked and iterates to the next video.
    $('#js-next-button').on('click', function(event) {
        event.preventDefault();
        if (videoIDCounter < 4) {
            videoIDCounter++;
            player.loadVideoById(allVideos[videoCategory][videoIDCounter]);
        };
    });
}

function handleLeftArrowPrevious() {

    //This code makes left arrow appear and disappear.
    let timeOut = null;
    $('#js-video-page').on('mousemove', function() {
        if (timeOut !== null) {
            $('#js-previous-button').show();
            clearTimeout(timeOut);
        };

        timeOut = setTimeout(function() {
            $('#js-previous-button').hide();
        }, 1000);
    });

    //This code listens for left arrow to be clicked and goes to the previous video.
    $('#js-previous-button').on('click', function(event) {
        event.preventDefault();
        if (videoIDCounter > 0) {
            videoIDCounter--;
            player.loadVideoById(allVideos[videoCategory][videoIDCounter]);
        };
    });
}

function handleHeaderHome() {

    //This code makes header icon appear and disappear.
    let timeOut = null;
    $('#js-video-page').on('mousemove', function() {
        if (timeOut !== null) {
            $('#header-home').show();
            clearTimeout(timeOut);
        };

        timeOut = setTimeout(function() {
            $('#header-home').hide();
        }, 1000);
    });

    //This code listens for home icon to be clicked and goes back to landing page.
    $('#header-home').on('click', function(event) {
        videoIDCounter = 0;
        player.stopVideo();
        $('#js-video-page').hide();
        $('#landing').show();
    });
}

//This function calls all the functions that run the app.
function driver() {
    handleLandingPage();
    handleRightArrowNext();
    handleLeftArrowPrevious();
    handleHeaderHome();
}

//This runs the app.
$(driver);