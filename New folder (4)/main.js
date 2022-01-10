function setup(){
    Canvas=createCanvas(300,300);
    Canvas.center();
    background("white");
    Canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;
}
function preload(){
    classifier = ml5.imageClassifier("DoodleNet");
}
function draw(){
    check_sketch();
    strokeWeight(10);
    stroke(0);
    if (mouseIsPressed){
        line(pmouseX,pmouseY,mouseX,mouseY);
    }

}
var timerCheck=" ";
var timerCounter=0;
var drawn_sketch=" ";
var score=0;
var status=" ";

function check_sketch(){
    timerCounter++;
    document.getElementById("timer").innerHTML="Timer: " + timerCounter;
    console.log(timerCounter);
    if(timerCounter>400){
        timerCounter=0;
        timerCheck-"completed";
    }
    if(timerCheck=="completed"||status=="set"){
        timerCheck=" ";
        status=" ";
        clearCanvas();
    }
}
function check_sketch(){
    if(drawn_sketch==canvas){
        status="set";
        score++;
        document.getElementById("score").innerHTML = "score: " + score;
    }
}
function clearCanvas(){
    background("white");
}
function classifyCanvas(){
    classifier.classify(canvas,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    document.getElementById("label").innerHTML="label: "+results[0].label;
    document.getElementById("confidence").innerHTML="confidence: " + Math.round(results[0].confidence*100) + "%";
    utterThis = new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}
