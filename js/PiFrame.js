// import circular buffer
// import jquery
<script type="text/javascript" src="CircularBuffer.js"></script>
<script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js"></script>

const timeout = 6000; // 6 seconds
const buffer = new CircularBuffer(10);
const api_key = "";
const base_url = "https://api.giphy.com/v1/gifs/random?tag=animals&rating=G&api_key="

var timer;

function startTimer() { timer = window.setTimeout(getNewGif, timeout); }
function stopTimer() { window.clearTimeout(timer); }

function displayGif(url) {
    // TODO
}

function getNewGif() {
    var url = base_url + api_key;

    $.getJSON(url, function(data) {
        buffer.append(data["data"]["images"]["original"]["url"]);
        console.log("Added URL " + buffer.getCurr());
        var num_frames = data["data"]["images"]["original"]["frames"];
        displayGif(buffer.getNext());
        startTimer();
    })
}

function handleSwipeLeft() {
    stopTimer();
    try { displayGif(buffer.getPrev()); }
    catch { console.log("Swipe left on an empty buffer"); }
    startTimer();
}

function handleSwipeRight() {
    stopTimer();
    try { displayGif(buffer.getNext()); }
    catch { console.log("Swipe right on an empty buffer"); }
    startTimer();
}

$.ready(function() { getNewGif(buffer); })
