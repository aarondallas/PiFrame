// import circular buffer
// import jquery
<script type="text/javascript" src="CircularBuffer.js"></script>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>

var buffer = null;
var api_key = "";
var base_url = "https://api.giphy.com/v1/gifs/random?tag=animals&rating=G&api_key="

function displayGif(url) {
    // TODO
}

function getNewGif(buff) {
    var url = base_url + api_key;
    $.getJSON(url, function(data) {
        buff.append(data["data"]["images"]["original"]["url"]);
        var num_frames = data["data"]["images"]["original"]["frames"];
        displayGif(buff.getNext());
        // set timer to length of gif 
    })
}

$.ready(
    function() {
        buffer = new CircularBuffer(10);

    }
)
