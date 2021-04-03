/// variable globales
var image = document.getElementById("video");
var recorder;
var form = new FormData();
var grabacion=0;

/*function captureCamera(callback) {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then(function (camera) {
      callback(camera);
    })
    .catch(function (error) {
      alert("Unable to capture your camera. Please check console logs.");
      console.error(error);
    });
}*/

function stopRecordingCallback() {
  document.querySelector("h1").innerHTML =
    "Grabacion de GIF detenido: " + bytesToSize(recorder.getBlob().size);
  document.getElementById("video").setAttribute("style", "display:none;")
  let previa = document.getElementById("gif");
  previa.src = URL.createObjectURL(recorder.getBlob());
  previa.setAttribute("style", "display:block;")
  recorder.stream.stop();
  form.append("file", recorder.getBlob(), "myGif.gif");
  console.log(form.get("file"));
  recorder.destroy();
  recorder = null;
}

function subirGif(myGyf) {
  var urlupload =
    "https://upload.giphy.com/v1/gifs?api_key=bw24LFlb3BXkhx9uB9goI91bEaW3Sm8H";

  fetch(urlupload, {
    method: "POST", // here put the method
    body: myGyf, // data is a form file, this form is a blob video
  })
    .then((res) => res.json())
    .catch((error) => console.error("Error:", error))
    .then((response) => console.log("Success:", response));
}





//////////////////////////////////////////////////////////////////////////////////
////////////// AQUI COMENZAMOS LA SECUENCIA//////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
  var miVideo;
document.getElementById("start").addEventListener("click",function getStreamAndRecord () { 
 
  grabacion++;
 
 if(grabacion==1){
  //var myobj = document.getElementById("message");  
  //var item = myobj.querySelector ('#titleVideo');
  // myobj.removeChild (item);
  //document.getElementById("video").setAttribute("style", "display:block;")
  document.getElementById("start").setAttribute("style", "display:none;")
  document.getElementById('titleVideo').textContent = '¿Nos das acceso a tu camara?';
  document.getElementById('parrafVideo').textContent = 'El acceso a tu camara sera valido solo en el tiempo en que estes creando tu GIFO';
  let uno =document.getElementById("uno")  
  uno.style.backgroundColor = "#572ee5";
  uno.style.color = "white";

    navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
       height: { max: 320 }
    }
 })
 .then(function(stream) {
  var myobj = document.getElementById("message");
  myobj.remove();
   document.getElementById("video").setAttribute("style", "display:block;")   
    video.srcObject = stream;
    video.play();
    miVideo=video;
    document.getElementById('start').textContent = "Grabar"
    document.getElementById("start").setAttribute("style", "display:block;")
    let dos =document.getElementById("dos")  
  dos.style.backgroundColor = "#572ee5";
  dos.style.color = "white";
  uno.style.backgroundColor = "white";
  uno.style.color = "#572ee5";
 }) }
 if(grabacion==2){
    document.querySelector("h1").innerHTML =
    "Esperando para la grabacion del GIF...";
  recorder = RecordRTC(miVideo.srcObject, {
    type: "gif",
    frameRate: 1,
    quality: 10,
    width: 480,
    hidden: 320,
    onGifRecordingStarted: function () {
      document.querySelector("h1").innerHTML = "Gif record iniciado.";
    },
   
  });

  recorder.startRecording();
  // release camera on stopRecording
  recorder.stream = miVideo.srcObject;
  console.log("estoy grabando")
  document.getElementById('start').textContent = "Finalizar"
 }
 if(grabacion==3){
  recorder.stopRecording(stopRecordingCallback);  
  document.getElementById('start').textContent = "Subir Gifo"
  
 }
 if (grabacion==4) {
  subirGif(form);
  console.log("estoy subiendo mi gyf");
  tres.style.backgroundColor = "#572ee5";
  tres.style.color = "white";
  dos.style.backgroundColor = "white";
  dos.style.color = "#572ee5"; 
  document.getElementById("start").setAttribute("style", "display:none;")
 }

} )