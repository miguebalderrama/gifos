"use strict";

/// variable globales
var image = document.getElementById("video");
var recorder;
var form = new FormData();
var grabacion = 0;
var flag = 0;
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
  //document.querySelector("h1").innerHTML =
  //  "Grabacion de GIF detenido: " + bytesToSize(recorder.getBlob().size);
  document.getElementById("video").setAttribute("style", "display:none;");
  var previa = document.getElementById("gif");
  previa.src = URL.createObjectURL(recorder.getBlob());
  previa.setAttribute("style", "display:block;");
  recorder.stream.stop();
  form.append("file", recorder.getBlob(), "myGif.gif");
  console.log(form.get("file"));
  recorder.destroy();
  recorder = null;
}

function subirGif(myGyf) {
  var urlupload = "https://upload.giphy.com/v1/gifs?api_key=bw24LFlb3BXkhx9uB9goI91bEaW3Sm8H";
  fetch(urlupload, {
    method: "POST",
    // here put the method
    body: myGyf // data is a form file, this form is a blob video

  }).then(function (res) {
    return res.json();
  })["catch"](function (error) {
    return console.error("Error:", error);
  }).then(function (response) {
    return console.log("Success:", response.data);
  });
} //////////////////////////////////////////////////////////////////////////////////
////////////// AQUI COMENZAMOS LA SECUENCIA//////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////


var miVideo;
document.getElementById("start").addEventListener("click", function getStreamAndRecord() {
  grabacion++;

  if (grabacion == 1) {
    //var myobj = document.getElementById("message");  
    //var item = myobj.querySelector ('#titleVideo');
    // myobj.removeChild (item);
    //document.getElementById("video").setAttribute("style", "display:block;")
    document.getElementById("start").setAttribute("style", "display:none;");
    document.getElementById('titleVideo').textContent = '¿Nos das acceso a tu camara?';
    document.getElementById('parrafVideo').textContent = 'El acceso a tu camara sera valido solo en el tiempo en que estes creando tu GIFO';
    var uno = document.getElementById("uno");
    uno.style.backgroundColor = "#572ee5";
    uno.style.color = "white";
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        height: {
          max: 320
        }
      }
    }).then(function (stream) {
      var myobj = document.getElementById("message");
      myobj.setAttribute("style", "display:none;");
      document.getElementById("video").setAttribute("style", "display:block;");
      video.srcObject = stream;
      video.play();
      miVideo = video;
      document.getElementById('start').textContent = "Grabar";
      document.getElementById("start").setAttribute("style", "display:block;");
      var dos = document.getElementById("dos");
      dos.style.backgroundColor = "#572ee5";
      dos.style.color = "white";
      uno.style.backgroundColor = "white";
      uno.style.color = "#572ee5";
    });
  }

  if (grabacion == 2) {
    // document.querySelector("h1").innerHTML =
    // "Esperando para la grabacion del GIF...";
    recorder = RecordRTC(miVideo.srcObject, {
      type: "gif",
      frameRate: 1,
      quality: 10,
      width: 480,
      hidden: 240 // onGifRecordingStarted: function () {
      //   document.querySelector("h1").innerHTML = "Gif record iniciado.";
      // },

    });
    recorder.startRecording(); // release camera on stopRecording

    recorder.stream = miVideo.srcObject;
    console.log("estoy grabando");
    document.getElementById('start').textContent = "Finalizar";
    transcurrido();
    cintauno = document.getElementById("element-cinta1"); //cintauno.classList.toggle("element-cinta1");

    cintauno.classList.toggle("element-cinta1-active");
    cintados = document.getElementById("element-cinta2"); //cintados.classList.toggle("element-cinta2");

    cintados.classList.toggle("element-cinta2-active");
    luzcam = document.getElementById("element-luz-camara"); //luzcam.classList.toggle("element-luz-camara");

    luzcam.classList.toggle("element-luz-camara-active");
  }

  if (grabacion == 3) {
    recorder.stopRecording(stopRecordingCallback);
    document.getElementById('start').textContent = "Subir Gifo";
    document.getElementById("repetir").setAttribute("style", "display:block;");
    document.getElementById("reloj").setAttribute("style", "display:none;");
    cintauno = document.getElementById("element-cinta1");
    cintauno.classList.toggle("element-cinta1-active");
    cintauno.classList.toggle("element-cinta1");
    cintados = document.getElementById("element-cinta2");
    cintados.classList.toggle("element-cinta2-active");
    cintados.classList.toggle("element-cinta2");
    luzcam = document.getElementById("element-luz-camara");
    luzcam.classList.toggle("element-luz-camara");
    luzcam.classList.toggle("element-luz-camara-active");
  }

  if (grabacion == 4) {
    subirGif(form);
    console.log("estoy subiendo mi gyf");
    overlay = document.getElementById("overlay");
    overlay.setAttribute("style", "opacity:1;");
    tres.style.backgroundColor = "#572ee5";
    tres.style.color = "white";
    dos.style.backgroundColor = "white";
    dos.style.color = "#572ee5";
    document.getElementById("start").setAttribute("style", "display:none;");
  }
});
document.getElementById("repetir").addEventListener("click", function repeatCapture() {
  grabacion = 0;
  var previa = document.getElementById("gif");
  previa.setAttribute("style", "display:none;");
  document.getElementById('start').textContent = "Comenzar";
  document.getElementById('titleVideo').textContent = 'Aquí podrás crear tus propios GIFOS';
  document.getElementById('parrafVideo').textContent = '¡Crea tu GIFO en sólo 3 pasos! (sólo necesitas una cámara para grabar un video)';
  var uno = document.getElementById("uno");
  uno.style.backgroundColor = "white";
  uno.style.color = "#572ee5";
  dos.style.backgroundColor = "white";
  dos.style.color = "#572ee5";
});

function transcurrido() {
  document.getElementById("reloj").setAttribute("style", "display:block;");
  var segundos = 0;
  var minutos = 0;
  var timer = setInterval(function () {
    if (grabacion == 2) {
      if (segundos < 60) {
        if (segundos <= 9) {
          segundos = '0' + segundos;
        }

        reloj.innerHTML = "00:00:0".concat(minutos, ":").concat(segundos);
        segundos++;
      } else {
        minutos++;
        segundos = 0;
      }
    } else {
      clearInterval(timer);
    }
  }, 1000);
}