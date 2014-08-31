

// your code here
    var config;
    var baseUrl = 'http://api.themoviedb.org/3/',
        apiKey = 'e161bfe8a7225c740f26c75304c0484a';
    var api_key = 'e161bfe8a7225c740f26c75304c0484a';
   
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
            loadUpcoming();
            return  false;
        });
 
        $('.btn-popular-list').click(function() {
            loadPopular();
            return  false;
        });
 
        $('.btn-toprated-list').click(function() {
            loadTopRated();
            return  false;
        })
;
        loadNowShowing();
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
 
function movieBasic(id){
    url = baseUrl + "movie/"+id;
    reqParam = {api_key:api_key};
    $.get(url,reqParam,function(response){
        $("#title").html(response.original_title);
        $("#overview").html(response.overview);
 
        url = baseUrl + "movie/"+id+"/videos";
        $.get(url,reqParam,function(response){
            var html = '<embed width="540" height="400" src="https://www.youtube.com/v/'+response.results[0].key+'" type="application/x-shockwave-flash">'
            $("#trailer").html(html);
        });
 
        url = baseUrl + "movie/"+id+"/credits";
        $.get(url,reqParam,function(response){
            var casts = "";
            for(var i=0;i<response.cast.length;i++){
                casts+="<li>"+response.cast[i].name+"</li>"
            }
            $("#casts").html(casts);
        });
 
        url = baseUrl + "movie/"+id+"/similar";
        $.get(url,reqParam,function(response){
            var movies = response.results;
            var allMovies = "";
            var poster = config.images.base_url + config.images.poster_sizes[1];
            for(var i=0;i<movies.length;i++){
                allMovies += '<div class="col-sm-3 col-xs-6">'+
                                '<a href="/movie/'+movies[i].id+'">'+
                                    '<img class="img-responsive portfolio-item" src="'+poster+movies[i].poster_path+'" alt="" style="width: 500px;">'+
                                '</a>'+
                                '<h5>'+
                                    '<a href="/movie/'+movies[i].id+'">'+movies[i].title+'</a>'+
                                '</h5>'+
                              '</div>';
            }
            $("#similar").html(allMovies);
        });
 
    });
}
 
 function displayMovies(data){
           
            data.results.forEach(function(movie){
            var imageSrc = config.images.base_url + config.images.poster_sizes[3] + movie.poster_path;
               var htmlStr = [
                            '<div style="width: 1300px;">',
                            '<li class="col-md-6">',
                            '<div id="mario">',
                            '<h3 style="margin-left: 200px; margin-top:10px;">',
                                '<a href="/view/'+movie.id+'" style="color: #fffff0;">' + movie.title +'</a>',
                            '</h3>',
                            '<p style="margin-left: 200px; color: #e5dfc5;"> Release date: ' + movie.release_date + '</p>',
                            '<a href="/view/'+movie.id+'">',
                                '<img class="img-responsive" src="' + imageSrc + '" alt="" style="margin-top:-70px; width: 190px; height: 280px;">',
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
 
   
 
    function loadUpcoming() {
        var upcomingUrl = baseUrl + 'movie/upcoming';
        $('.movies-list').html('');
        $.get(upcomingUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }
 
    function loadPopular() {
        var popularUrl = baseUrl + 'movie/popular';
        $('.movies-list').html('');
        $.get(popularUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }
 
    function loadTopRated() {
        var topRatedUrl = baseUrl + 'movie/top_rated';
        $('.movies-list').html('');
        $.get(topRatedUrl, {
            api_key: apiKey
        }, function(response) {
            displayMovies(response);
        });
    }
 
    initialize(setEventHandlers);
