"use strict";

// Usar async y wait para una funcion asincrona que nos devuelve sugrencias de bisqueda
//
//let apiKey = "bw24LFlb3BXkhx9uB9goI91bEaW3Sm8H";
var tags = document.querySelector('input[type="search"]');
var letterInput = null;
var indice = 0;
tags.addEventListener("input", function () {
  var url = "https://api.giphy.com/v1/tags/related/".concat(letterInput, "?api_key=").concat(apiKey, "&lang=es&limit=8");
  console.log("La tecla presionada fue " + tags.value);
  letterInput = tags.value;

  if (letterInput == 0) {
    console.log("campos vacio");
  }

  if (letterInput.length > 2) {
    fetch(url).then(function (response) {
      return response.json();
    }).then(function (json) {
      for (var index = 0; index < indice; index++) {
        var d = document.getElementById("busqueda");
        var d_nested = document.getElementById("sug" + index);
        d.removeChild(d_nested);
      }

      indice = 0;
      json.data.forEach(function (element) {
        console.log(element.name);
        var div = document.createElement("div");
        div.innerText = element.name;
        div.setAttribute("class", "sug");
        div.setAttribute("id", "sug" + indice);
        document.getElementById("busqueda").appendChild(div);
        indice++;
      });
    })["catch"](function (error) {
      return document.body.appendChild = error;
    });
  }

  {
    console.log("todavia nada");
  }
}); //////////////////////////////////
////////////////////////////////

var input = document.querySelector('input[type="search"]');
var buscar = null;
input.addEventListener("search", function () {
  console.log("The term searched for was " + input.value);
  event.preventDefault();
  buscar = input.value;
  fetch("https://api.giphy.com/v1/gifs/search?q=".concat(buscar, "&api_key=").concat(apiKey, "&limit=3")).then(function (response) {
    return response.json();
  }).then(function (json) {
    json.data.map(function (gif) {
      return gif.images.fixed_height.url;
    }).forEach(function (url) {
      var img = document.createElement("img");
      img.src = url;
      document.getElementById("imagenes").appendChild(img);
    });
  })["catch"](function (error) {
    return document.body.appendChild = error;
  });
});