const endpoint = ('https://gist.githubusercontent.com/saintasia/a5aa616b44e1bf9abe74a70d2bdc2527/raw/6028c107dbf343f02a5783efaad58bd7967bee56/jp-prefs.json');
    
var prefectures = [];

//filter data with json and new fetch browser parameter
fetch(endpoint)
    .then(stuff => stuff.json())
    // es6 spread data
    .then(data => prefectures.push(...data))

//look for prefectures
function findMatches(wordToMatch, prefectures){
    //filter prefectures
    return prefectures.filter(place => {
       //find matches
        var regex = new RegExp(wordToMatch, 'gi');
        return place.prefnameJp.match(regex) || place.prefnameEn.match(regex)
    });
}

// commas for numbert
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
    
    
function displayMatches(){
    var matchArray = findMatches(this.value, prefectures);
    var html = matchArray.map(place => {
        // g = globally, i = case insensitive
        var regex = new RegExp(this.value, 'gi');
        // replace regular regex found in text with a span of the same contents
        var prefnameJp = place.prefnameJp.replace(regex, "<span class='hl'>" + this.value + "</span>" );
        var prefnameEn = place.prefnameEn.replace(regex, "<span class='hl'>" + this.value + "</span>" );
        
        return "<li><span class='name'>" + prefnameJp + "," + prefnameEn + "</span><span class='population'>" + numberWithCommas(place.population) + "</span></li>";
        //turn fron array into a string by join
    }).join('');
    suggestions.innerHTML = html;
}

var searchInput = document.querySelector('.search');
var suggestions = document.querySelector('.suggestions');
    
//listen to event
    
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);