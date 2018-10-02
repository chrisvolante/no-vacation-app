let YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
let YOUTUBE_API_KEY = 'AIzaSyCo6gCJITCrbbOihhUkEMXPaDRYyYYurbw';

function getDataFromApi(searchTerm, callback) {
    console.log(searchTerm);
    let query = {
        part: 'snippet',
        key: YOUTUBE_API_KEY,
        q: searchTerm + 'relaxing',
        maxResults: '50'
    };
    $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
    $('.js-search-results').append(`
        <div class="video-thumb">
            <img class="video-thumb-image" src="${result.snippet.thumbnails.medium.url}">
            <div class="video-title-layer">
                <p class="video-title" data-id="${result.id.videoId}">${result.snippet.title.substring(0, 75)}</p>
            </div>
        </div>
    `).show();
}

function displayYouTubeSearchData(data) {
    data.items.forEach(element => {
        renderResult(element);
    });
}

function handleCategoryThumb() {
    $('.category').on('click', function (event) {
        userQuery = this.id;
        window.scrollTo(0, 0);
        getDataFromApi(userQuery, displayYouTubeSearchData);
        $('#landing').hide();
        $('.search-results').show();
    })
}

function handleImageClick() {
    $('.js-search-results').on('click', '.video-title', function (event) {
        let videoId = $(this).attr("data-id");
        $('.search-results').hide();
        $('.js-search-results').html("");
        $('.video-player').html("");
        $('#mainplayer').show();
        $('.video-player').append(`
            <iframe width="100%" height="100%" src="http://www.youtube.com/embed/${videoId}?wmode=opaque&autoplay=0&controls=1" frameborder="0"></iframe>`);
    });
}

function handleResultsHome() {
    $('.back-to-home').on('click', function (event) {
        $('.js-search-results').html("");
        $('.search-results').hide();
        $('#landing').show();
    });
}

function handleHeaderHome() {
    //This code makes header icon appear and disappear.
    // let timeOut = null;
    // $('#mainplayer').on('mousemove', function () {
    //     if (timeOut !== null) {
    //         $('#header-home').show();
    //         clearTimeout(timeOut);
    //     };

    //     timeOut = setTimeout(function () {
    //         $('#header-home').hide();
    //     }, 5000);
    // });

    //This code listens for home icon to be clicked and goes back to landing page.
    $('#header-home').on('click', function (event) {
        console.log("header home button clicked");
        //This code stops the video from playing.
        $("iframe").each(function() { 
            let src= $(this).attr('src');
            $(this).attr('src',src);  
        });
        
        $('.js-search-results').html("");
        $('#mainplayer').hide();
        $('#landing').show();
    });
}

//This function calls all the functions that run the app.
function driver() {
    handleCategoryThumb();
    handleImageClick();
    handleResultsHome();
    handleHeaderHome();
}

//This runs the app.
$(driver);