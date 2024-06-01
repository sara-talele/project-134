img = "";
Status = "";
object = [];
song = "";

function preload() {
    song = loadSound("alarm.wav");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size();
    video.hide();
    ObjectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status : Detected Object";
}

function modelloaded() {
    console.log("cocossd is loaded");
    Status = true;
    ObjectDetector.detect(video, gotresults);
}

function gotresults(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (Status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        ObjectDetector.detect(video, gotresults);
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            fill(r, g, b);
            noFill();
            stroke(r, g, b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            percent = floor(object[i].confidence * 100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            if (object[i].label == "person") {
                document.getElementById("no.of_objects").innerHTML = "Baby Found";
                song.stop();
            } else {
                document.getElementById("no.of_objects").innerHTML = "Baby Not Found";
                song.play();
            }
        }
        if (object.length == 0) {
            document.getElementById("no.of_objects").innerHTML = "Baby Not Found";
            song.play();
        }
    }
}