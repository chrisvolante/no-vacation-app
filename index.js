var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

var videoIDCounter = 0;
var VIDEOS = ['PZvd694DPtQ', 'EZK707gSfSo', 'LzOMy5-lE_g', 'zfKLjO6Tvfw', '3biyt-S_5xk'];

function onYouTubeIframeAPIReady() {
    $('#js-begin-button').click(function(event) {
        console.log("begin button clicked")
        $('#js-splash-page').hide();
        $('#js-video-page').show();
        player = new YT.Player('player', {
            videoId: VIDEOS[videoIDCounter],
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
    });
}

function onPlayerReady(event) {
    player.playVideo();
}

function renderSplashPage() {
    $('#js-splash-page').append(`
        <div class="container">
            <h2>Choose from a category below for relaxing visuals.</h2>
            <button class="begin-button" id="js-begin-button" type="button">Begin</button>
        </div>
    `);
}

function handleRightArrowNext() {
    $('#js-next-button').on('click', function(event) {
        event.preventDefault();
        console.log("right arrow clicked");
        if (videoIDCounter < 4) {
            videoIDCounter++;
            player.loadVideoById(VIDEOS[videoIDCounter]);
        }
    });
}

function handleLeftArrowPrevious() {
    $('#js-previous-button').on('click', function(event) {
        event.preventDefault();
        console.log("left arrow clicked");
        if (videoIDCounter > 0) {
            videoIDCounter--;
            player.loadVideoById(VIDEOS[videoIDCounter]);
        }
    });
}

function handleHeaderHome() {
    $('#header-home').on('click', function(event) {
        console.log("header-home clicked");
        player.stopVideo();
        $('#js-video-page').hide();
        $('#js-splash-page').show();
    });
}

function driver() {
    renderSplashPage();
    handleRightArrowNext();
    handleLeftArrowPrevious();
    handleHeaderHome();
}

$(driver);