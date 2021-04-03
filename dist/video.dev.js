"use strict";

/// variable globales
var image = document.getElementById('video');
var recorder;
var form = new FormData();

function captureCamera(callback) {
  navigator.mediaDevices.getUserMedia({
    video: true
  }).then(function (camera) {
    callback(camera);
  })["catch"](function (error) {
    alert('Unable to capture your camera. Please check console logs.');
    console.error(error);
  });
}

function stopRecordingCallback() {
  document.querySelector('h1').innerHTML = 'Grabacion de GIF detenido: ' + bytesToSize(recorder.getBlob().size);
  var previa = document.getElementById("previa");
  previa.src = URL.createObjectURL(recorder.getBlob());
  recorder.camera.stop();
  form.append('file', recorder.getBlob(), 'myGif.gif');
  console.log(form.get('file'));
  recorder.destroy();
  recorder = null;
}

function subirGif(myGyf) {
  var urlupload = 'https://upload.giphy.com/v1/gifs?api_key=bw24LFlb3BXkhx9uB9goI91bEaW3Sm8H';
  fetch(urlupload, {
    method: 'POST',
    // here put the method
    body: myGyf // data is a form file, this form is a blob video

  }).then(function (res) {
    return res.json();
  })["catch"](function (error) {
    return console.error('Error:', error);
  }).then(function (response) {
    return console.log('Success:', response);
  });
}

document.getElementById('btn-start-recording').onclick = function () {
  this.disabled = true;
  captureCamera(function (camera) {
    document.querySelector('h1').innerHTML = 'Esérando para la grabacion del GIF...';
    recorder = RecordRTC(camera, {
      type: 'gif',
      frameRate: 1,
      quality: 10,
      width: 360,
      hidden: 240,
      onGifRecordingStarted: function onGifRecordingStarted() {
        document.querySelector('h1').innerHTML = 'Gif record iniciado.';
      },
      onGifPreview: function onGifPreview(gifURL) {
        image.src = gifURL;
      }
    });
    recorder.startRecording(); // release camera on stopRecording

    recorder.camera = camera;
    document.getElementById('btn-stop-recording').disabled = false;
  });
};

document.getElementById('btn-stop-recording').onclick = function () {
  this.disabled = true;
  recorder.stopRecording(stopRecordingCallback);
  document.getElementById("subir").disabled = false;
};

document.getElementById("subir").addEventListener("click", function upload() {
  subirGif(form);
  console.log("estoy subiendo mi gyf");
});