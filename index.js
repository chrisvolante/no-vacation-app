var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

var videoIDCounter = 0;
var videoCategory = 'Nature';

function onPlayerReady(event) {
    console.log(player);
    var fn = function(){ player.playVideo(); } 
    setTimeout(fn, 1000);
}

function renderSplashPage() {
    for(let key in allVideos)
        {
            $('#js-splash-page').append(`<button class="category-button" data-ref="${key}">${key}</button>`)
        } 
    handleCategoryButton();
}

function handleCategoryButton() {
    $('.category-button').on('click', function(event) {
        event.preventDefault();
        $('#js-video-page').show();
        videoCategory = $(this).attr("data-ref");
        videoIDCounter = 0;
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
    })
}

function handleRightArrowNext() {
    $('#js-next-button').on('click', function(event) {
        event.preventDefault();
        console.log("right arrow clicked");
        if (videoIDCounter < 4) {
            videoIDCounter++;
            player.loadVideoById(allVideos[videoCategory][videoIDCounter]);
        }
    });
}

function handleLeftArrowPrevious() {
    $('#js-previous-button').on('click', function(event) {
        event.preventDefault();
        console.log("left arrow clicked");
        if (videoIDCounter > 0) {
            videoIDCounter--;
            player.loadVideoById(allVideos[videoCategory][videoIDCounter]);
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