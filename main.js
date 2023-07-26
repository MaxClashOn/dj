song="";
leftwristx=0;
leftwristy=0;
rightwristx=0;
rightwristy=0;
scoreright=0;
scoreleft=0;
function preload(){
song=loadSound("music.mp3");

}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelloaded);
    poseNet.on("pose",gotPoses);
}
function modelloaded(){
console.log("modelo listo");

}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftwristx=results[0].pose.leftWrist.x;
        console.log("leftwristx"+leftwristx);
        leftwristy=results[0].pose.leftWrist.y;
        console.log("leftwristy"+leftwristy);
        rightwristx=results[0].pose.rightWrist.x;
        console.log("leftwristx"+leftwristx);
        rightwristy=results[0].pose.rightWrist.y;
        console.log("leftwristy"+leftwristy);
        scoreright=results[0].pose.keypoints[10].score;
        scoreleft=results[0].pose.keypoints[9].score;
    }
}
function draw(){
    image(video,0,0,600,500);
    console.log(scoreright,scoreleft);
if(scoreright>0.2){
    circle(rightwristx,rightwristy,20);
    if(rightwristy>0&&rightwristy<=100){
        document.getElementById("speed").innerHTML="speed=0.5x";
        song.rate(0.5);
    }
else 
    if(rightwristy>100&&rightwristy<=200){
        document.getElementById("speed").innerHTML="speed=0.8x";
        song.rate(0.8);
    }
    else 
        if(rightwristy>200&&rightwristy<=300){
            document.getElementById("speed").innerHTML="speed=1.2x";
            song.rate(1.2);
        }
else if(rightwristy>300&&rightwristy<=400){
    document.getElementById("speed").innerHTML="speed=1.6x";
    song.rate(1.6);
}else if(rightwristy>400&&rightwristy<=500){
    document.getElementById("speed").innerHTML="speed=2x";
    song.rate(2);
}
}
if(scoreleft>0.2){
    circle(leftwristx,leftwristy,20);
    InNumberleftWristY=Number(leftwristy);
    newleftwristy=floor(InNumberleftWristY*2);
    leftwristy_divide=newleftwristy/1000;
    document.getElementById("volume").innerHTML="volume= "+leftwristy_divide;
    song.setVolume(leftwristy_divide);
    
}

 }
function Play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
fill("blue");
stroke("red");

}
function Stop(){
    song.stop();
}
