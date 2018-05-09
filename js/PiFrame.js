// import circular buffer
// import jquery
<script type="text/javascript" src="CircularBuffer.js"></script>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>

var buffer = new CircularBuffer(10);
var api_key = "";
var base_url = "https://api.giphy.com/v1/gifs/random?tag=animals&rating=G&api_key="

function displayGif(url) {
    // TODO
}

function getNewGif() {
    var url = base_url + api_key;

    $.getJSON(url, function(data) {
        buffer.append(data["data"]["images"]["original"]["url"]);
        var num_frames = data["data"]["images"]["original"]["frames"];
        displayGif(buffer.getNext());
        // set timer to length of gif 
    })
}

function handleSwipeLeft() {
    // TODO stop timer
    try { displayGif(buff.getPrev()); }
    catch { console.log("Swipe left on an empty buffer"); }
    // TODO restart timer
}

function handleSwipeRight() {
    // TODO stop timer
    try { displayGif(buff.getNext()); }
    catch { console.log("Swipe right on an empty buffer"); }
    // TODO restart timer
}

$.ready(function() { getNewGif(buffer); })
