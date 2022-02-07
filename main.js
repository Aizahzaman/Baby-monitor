objects=[];
status="";
function preload(){
song=loadSound("alert.wav");
}

function setup(){
    canvas=createCanvas(500,400);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(500,600)
    video.hide();
    objectDetector=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
}


function modelLoaded(){
    console.log("model has loaded");
    status=true;
}

function gotresults(error,results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}

function draw(){
    image(video,0,0,500,400);
    if(status!=""){
        objectDetector.detect(video,gotresults);
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            document.getElementById("number_of_objects").innerHTML=objects.length;
            fill("#ff0000");
            percent=floor(objects[i].confidence*100);
            textSize(20);
            text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
            noFill();
            stroke ("#ff00000");
            rect (objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label=="person"){
                document.getElementById("number_of_objects").innerHTML="Baby Found";
                console.log("Baby found");
                console.log("stop");
                song.stop();
            }
            else{
                document.getElementById("number_of_objects").innerHTML="Baby Not Found";
                console.log("baby Not Found");
                console.log("start");
                song.play();
            }
        }
        if(objects.length==0){
            document.getElementById("number_of_objects").innerHTML="Baby Not Found";
            console.log("baby Not Found");
            console.log("start");
            song.play();
        }
    }
}