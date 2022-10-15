prediction_1=""

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera=document.getElementById("camera");

webcam.attach('#camera');

function takeSnapshot(){
    webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id=captured_image src="'+data_uri+'"/>'
    });
}

console.log("ml5version:",ml5version);

classifier=imgClassifier("https://teachablemachine.withgoogle.com/models/2NdlssA4v/model.json",modelLoaded);

function modelLoaded(){
    console.log("model loaded!");
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="the first prediction is-"+prediction_1;
    var utterThis=SpeechSynthesisUtterance(speak_data_1);
    synth.speak=(utterThis);
}

function check(){
    img=document.getElementById('result');
    classifier.classify(img, gotResult);
}

function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emoji_name").innerHTML=results[0].label;
        prediction_1=result[0].label;
        speak();
        if(result[0].label=="victory"){
            document.getElementById("update_emoji").innerHTML="&#9996;";
        }
        if(result[0].label=="best"){
            document.getElementById("update_emoji").innerHTML="&#128077;";
        }
        if(result[0].label=="amasing"){
            document.getElementById("update_emoji").innerHTML="&#128076;";
        }
    }
}
