$(function() {
    // your code here
    var config;
    var baseUrl = 'http://api.themoviedb.org/3/',
        apiKey = 'e161bfe8a7225c740f26c75304c0484a';


    function initialize(callback) {
        $.get(baseUrl + 'configuration', {
            api_key: 'e161bfe8a7225c740f26c75304c0484a'
        },function(res) {
            config = res;
            console.log(config);
            callback(config);
        });
    }

    function setEventHandlers(config) {
        $('#form-search').submit(function() {
            var query = $('.input-query').val();
            searchMovie(query);
            return  false;
        });

        $('.btn-now-showing').click(function() {
            loadNowShowing();
            return  false;
        });


        $('.btn-upcoming-list').click(function() {
            loadUpcomingList();
            return  false;
        });


        $('.btn-popular-list').click(function() {
            loadPopularList();
            return  false;
        });


    }

    function searchMovie(query) {
        var searchUrl = baseUrl + 'search/movie';
        $('.movies-list').html('');
        $.get(searchUrl, {
            query: query,
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }

    function displayMovies(data) {
        data.results.forEach(function(movie) {
            var imageSrc = config.images.base_url + config.images.poster_sizes[2] + movie.poster_path;
            var htmlStr = [ 
                                '<div style="width: 1300px;">',
                                '<li class="col-md-6">',
                                '<div id="mario">',
                                '<h3 style="margin-left: 200px; margin-top:10px;">',
                                    '<a href="#" style="color: #fffff0;">' + movie.title +'</a>',
                                '</h3>',
                                '<p style="margin-left: 200px; color: #e5dfc5;"> Release date: ' + movie.release_date + '</p>',
                                '<a href="#">',
                                    '<img class="img-responsive" src="' + imageSrc + '" alt="" style="margin-top:-70px;">',
                                '</a>',
                                '</div>', 
                                '</li>',
                                '</div>',
                            ];
            $('.movies-list').append($(htmlStr.join('')));
        });
    }


    function loadNowShowing() {
        var nowShowingUrl = baseUrl + 'movie/now_playing';
        $('.movies-list').html('');
        $.get(nowShowingUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }

    function loadUpcomingList() {
        var upcomingUrl = baseUrl + 'movie/upcoming';
        $('.movies-list').html('');
        $.get(upcomingUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }

    function loadPopularList() {
        var popularUrl = baseUrl + 'movie/popular';
        $('.movies-list').html('');
        $.get(popularUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }

    initialize(setEventHandlers);

});