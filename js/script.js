
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    // load streetview
    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr+', '+cityStr;
    $greeting.text('u wanna live at'+address+' ?');

    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' +streetviewUrl + '">');
    // NYtimes AJAX request
	var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='
	+ cityStr + '&sort=newest&api-key=5e588d9c06dd479a83574b00f5c89667:2:72922479';
	$.getJSON(nytimesUrl, function(data) {
	$nytHeaderElem.text('New York Times Articles About ' + cityStr);
	articles = data.response.docs;
	for (var i = 0; i < articles.length; i++) {
	var article = articles[i];
	$nytElem.append('<li class="article">' + '<a href="' + article.web_url
	+ '">' + article.headline.main + '</a' +
	'<p>' + article.snippet + '</p>' + '</li>');
	};
	}).error(function(e){
	$nytHeaderElem.text('NYTimes articles could not be loaded');
	}); 
	 // Wikipedia AJAX request
	var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search='
	+ cityStr + '&format=json&callback=wikiCallback';
	var wikiRequestTimeout = setTimeout(function() {
	$wikiElem.text("Failed to get Wikipedia resources");
	}, 8000);
	$.ajax({
	url: wikiUrl,
	dataType: "jsonp",
	// Callback for jsonp
	success: function(response) {
	var articleList = response[1];
	for (var i = 0; i < articleList.length; i++) {
	articleStr = articleList[i];
	var url = 'http://en.wikipedia.org/wiki/' + articleStr;
	$wikiElem.append('<li><a href="' + url + '">'
	+ articleStr + '</a></li>');
	};
	clearTimeout(wikiRequestTimeout);
	}
});

    return false;
};

$('#form-container').submit(loadData);

// loadData();
