

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

function viewCast(id){
        reqParam = {api_key:api_key};
            url = baseUrl +  "movie/"+id+"/credits";
            $.get(url, reqParam, function(response){
                for(var i=0; i<4; i++){
                    $('#'+id).append('<li style ="text-decoration: none">'+response.cast[i].name+'</li>');
               }

            });
        }

function showcar(id){
 
    reqParam = {api_key:api_key};
         url = baseUrl + "movie/"+id+"/images";
        $.get(url,reqParam,function(response){
            var imageSrc3 = config.images.base_url + config.images.poster_sizes[6] + response.backdrops[0].file_path;
            var imageSrc4 = config.images.base_url + config.images.poster_sizes[6] + response.backdrops[1].file_path;
            var imageSrc5 = config.images.base_url + config.images.poster_sizes[6] + response.backdrops[2].file_path;
            var imageSrc6 = config.images.base_url + config.images.poster_sizes[6] + response.backdrops[3].file_path;
            var imageSrc7 = config.images.base_url + config.images.poster_sizes[6] + response.backdrops[4].file_path;
           
 
               var object = {
                 "img1" : imageSrc3,
                 "img2" : imageSrc4,
                 "img3" : imageSrc5,
                 "img4" : imageSrc6,
                 "img5" : imageSrc7
 
               };
 
        var raw = $("#tpl-displayCar").html();
        var template = Handlebars.compile(raw);
        var html = template(object);
        $('.backdrop').append(html);
 
        });
 
}
 
function movieBasic(id){
    url = baseUrl + "movie/"+id;
    reqParam = {api_key:api_key};
    $.get(url,reqParam,function(response){
        $("#title").html(response.original_title);
        $("#overview").html(response.overview);
        $("#tagline").html(response.tagline);
        $("#votes").html(response.vote_average);
 
        url = baseUrl + "movie/"+id+"/videos";
        $.get(url,reqParam,function(response){
            var html = '<embed width="540" height="400" src="https://www.youtube.com/v/'+response.results[0].key+'" type="application/x-shockwave-flash">'
            $("#trailer").html(html);
        });

        url = baseUrl + "movie/"+id+"/images";
        $.get(url,reqParam,function(response){          
            var backdrop = response.backdrops;
            var allBackdrops = "";    
            var imageSrc = config.images.base_url + config.images.poster_sizes[3] ;                  
            for(var i=0;i<backdrop.length;i++){
                allBackdrops += '<div id="backdrops" class="col-sm-3 col-xs-4">'+
                                '<img style="border-style:solid;border-width:5px;border-color:black; max-height: 200px;" src="'+imageSrc+backdrop[i].file_path+'" alt="">'+
                                '</center>'+

                                '<br>' +
                              '</div></div>';
            }
            $("#carousel_backdrop").append(allBackdrops);
        });
 
        url = baseUrl + "movie/"+id+"/credits";
        $.get(url,reqParam,function(response){
            var casts = "";

            for(var i=0;i<response.cast.length;i++){
                var castSrc = config.images.base_url + config.images.poster_sizes[1] + response.cast[i].profile_path;
                casts+="<li style='margin-left: 60px;'>"+response.cast[i].name+"</li>",
                casts+='<img src="'+castSrc+'" id="castimg">'
            }
            $("#casts").html(casts);
        });

 
        url = baseUrl + "movie/"+id+"/similar";
        $.get(url,reqParam,function(response){
            var movies = response.results;
            var allMovies = "";
            var poster = config.images.base_url + config.images.poster_sizes[1];
            for(var i=0;i<movies.length;i++){
                allMovies += '<div>'+
                                '<li class="col-lg-6">'+
                                '<a href="/view/'+movies[i].id+'">'+
                                    '<img class="img-responsive portfolio-item" src="'+poster+movies[i].poster_path+'" alt="">'+
                                '</a>'+
                                '<h5>'+
                                    '<a href="/view/'+movies[i].id+'">'+movies[i].title+'</a>'+
                                '</h5>'+
                                '</li>'+
                              '</div>';

            }
            $("#similar").html(allMovies);
        });
    showcar(id);
    });
}
 
 function displayMovies(data){
           
            data.results.forEach(function(movie){
            var imageSrc = config.images.base_url + config.images.poster_sizes[1] + movie.poster_path;
            var backdropSrc = config.images.base_url + config.images.poster_sizes[3] + movie.backdrop_path;
            var result = {
                "id" : movie.id,
                "img" : imageSrc,
                "title" : movie.title,
                "backdrop" : backdropSrc,
            };
            var rawTpl = $('#tpl-movie-list').html();
            var template = Handlebars.compile(rawTpl);
            var markup = template(result);
            $('.movies-list').append(markup);
 
            viewCast(movie.id);
            showcar(movie.id);
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
