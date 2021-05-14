"use strict";

// selector
var menu = document.querySelector(".hamburger"); // method

function toggleMenu(event) {
  this.classList.toggle("is-active");
  document.querySelector(".menuppal").classList.toggle("is_active");
  event.preventDefault();
} // event


menu.addEventListener("click", toggleMenu, false); // addEventListener version
// trending

var apiKey = "bw24LFlb3BXkhx9uB9goI91bEaW3Sm8H";
var count = 0;
var arraygifs = new Array();
fetch("https://api.giphy.com/v1/gifs/trending?api_key=".concat(apiKey, "&limit=12")).then(function (response) {
  return response.json();
}).then(function (json) {
  json.data.map(function (gif) {
    return gif.images.original.url;
  }).forEach(function (url) {
    arraygifs[count] = url;
    count++;
    console.log(arraygifs.length);
  });

  for (var a = 0; a < 3; a++) {
    document.getElementById("img" + a).setAttribute("src", arraygifs[a]);
  }
})["catch"](function (error) {
  return document.body.appendChild = error;
});
console.log(arraygifs.length); ////////////////////////////////////////////////////////////////////////
// Carousel de GIFS
////////////////////////////////////////////////////////////////////////

var forward = document.getElementById("right");
var counti = 0;
forward.addEventListener("click", function () {
  counti++;
  adelante();
});
var reward = document.getElementById("left");
reward.addEventListener("click", function () {
  counti--;
  atras();
});

function atras() {
  for (var i = 0; i < 3; i++) {
    if (counti < 0) {
      counti = 4;
    }

    if (counti + i >= arraygifs.length) {
      document.getElementById("img" + i).setAttribute("src", arraygifs[i + counti - arraygifs.length]);
    } else {
      document.getElementById("img" + i).setAttribute("src", arraygifs[counti + i]);
    }
  }

  console.log(counti);
}

function adelante() {
  if (counti >= arraygifs.length) {
    counti = 0;
  }

  for (var i = 0; i < 3; i++) {
    if (counti + i >= arraygifs.length) {
      document.getElementById("img" + i).setAttribute("src", arraygifs[i + counti - arraygifs.length]);
    } else {
      document.getElementById("img" + i).setAttribute("src", arraygifs[i + counti]);
    }
  }

  console.log(counti);
}