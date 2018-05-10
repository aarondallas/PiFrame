


const timeout = 6000; // 6 seconds
const buffer = new CircularBuffer(10);
const api_key = "w6Zi5nqyI5RzW4xxvz63ramNdpXVzMzE";
const base_url = "https://api.giphy.com/v1/gifs/random?tag=animals&rating=G&api_key="

var timer;

function startTimer() { timer = window.setTimeout(getNewGif, timeout); }
function stopTimer() { window.clearTimeout(timer); }

function displayGif(url) {
    console.log("displaying url "+ url);
    $("#gif").attr("src", url);
}

function getNewGif() {
    var url = base_url + api_key;

    console.log("Getting a new Gif")
    $.ajax({
        dataType: "json",
        url: url,
        success: function(data) {
            var gif_url = data["data"]["images"]["original"]["url"];
            buffer.append(gif_url);
            console.log("Added URL " + gif_url);
            var num_frames = data["data"]["images"]["original"]["frames"];
            displayGif(buffer.getNext());
            startTimer();
        },
        error: function(xhr, stat, err) {
            console.log("Error AJAX response: "+ err);
        }
    });
}

function handleSwipeLeft(event) {
    /* Go to next GIF */
    console.log("Handling swipe left event");
    stopTimer();
    try { displayGif(buffer.getNext()); }
    catch { console.log("Swipe left on an empty buffer"); }
    startTimer();
}

function handleSwipeRight(event) {
    /* Go to previous GIF */
    console.log("Handling swipe right event");
    stopTimer();
    try { displayGif(buffer.getPrev()); }
    catch { console.log("Swipe right on an empty buffer"); }
    startTimer();
}

function start() {
    console.log("Running ready function");
    getNewGif(buffer);
    $("#swipe-area").on("swipeleft", handleSwipeLeft);
    $("#swipe-area").on("swiperight", handleSwipeRight);
}
