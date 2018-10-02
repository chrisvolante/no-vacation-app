let YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';
let YOUTUBE_API_KEY = 'AIzaSyCo6gCJITCrbbOihhUkEMXPaDRYyYYurbw';

//This function makes a request to the YOUTUBE API.
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

//This functions renders the results of the API request.
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

//This function loops through a JSON object from the API request and calls a function that renders it into HTML for each element in the object.
function displayYouTubeSearchData(data) {
    data.items.forEach(element => {
        renderResult(element);
    });
}

//This function listens for the user to choose a categeory from the landing page.
function handleCategoryThumb() {
    $('.category').on('click', function (event) {
        userQuery = this.id;
        window.scrollTo(0, 0);
        getDataFromApi(userQuery, displayYouTubeSearchData);
        $('#landing').hide();
        $('.search-results').show();
    })
}

//This function listens for the user to click a thumbnail on the results page and plays the video fullscreen.
function handleImageClick() {
    $('.js-search-results').on('click', '.video-title', function (event) {
        let videoId = $(this).attr("data-id");
        $('.search-results').hide();
        $('.js-search-results').html("");
        $('.video-player').html("");
        $('#mainplayer').show();
        $('.video-player').append(`
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?wmode=opaque&autoplay=0&controls=1" frameborder="0"></iframe>`);
    });
}

//This function listens for home icon on the results page to be clicked and goes back to landing page.
function handleResultsHome() {
    $('.back-to-home').on('click', function (event) {
        $('.js-search-results').html("");
        $('.search-results').hide();
        $('#landing').show();
    });
}

//This code listens for home icon on the video page to be clicked, stops the video, and goes back to landing page.
function handleHeaderHome() {
    $('#header-home').on('click', function (event) {
        console.log("header home button clicked");
        //This code stops the video from playing.
        $("iframe").each(function () {
            let src = $(this).attr('src');
            $(this).attr('src', src);
        });
        //This code clears results page, hides the video, and shows the landing page.
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