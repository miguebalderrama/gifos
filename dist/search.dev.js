"use strict";

// Usar async y wait para una funcion asincrona que nos devuelve sugrencias de busqueda
//
//
//let apiKey = "bw24LFlb3BXkhx9uB9goI91bEaW3Sm8H";
var tags = document.querySelector('input[type="search"]');
var letterInput = null;
var indice = 0;
var contBusqueda = 0;
tags.addEventListener("input", function () {
  var url = "https://api.giphy.com/v1/tags/related/".concat(letterInput, "?api_key=").concat(apiKey, "&lang=es&limit=8");
  console.log("La tecla presionada fue " + tags.value);
  letterInput = tags.value;

  if (letterInput == 0) {
    console.log("campos vacio");

    for (var flag = 0; flag < indice; flag++) {
      var d = document.getElementById("busqueda");
      var d_nested = document.getElementById("sug" + flag);
      d.removeChild(d_nested);
    }

    indice = 0;
    document.getElementById("inpu").setAttribute("style", "border-bottom: none");
  }

  if (letterInput.length > 2) {
    console.log("fecheamos");
    document.getElementById("inpu").setAttribute("style", "border-bottom: solid 2px rgb(167, 167, 167)");
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
//////////////////////////////////

var input = document.querySelector('input[type="search"]');
var buscar = null;
var identifier = 0;
input.addEventListener("search", function () {
  searchs();
});

function searchs() {
  console.log("The term searched for was " + input.value);
  event.preventDefault();
  buscar = input.value;
  document.getElementById("inpu").setAttribute("style", "border-bottom: none"); //////

  for (var fla = 0; fla < indice; fla++) {
    var d = document.getElementById("busqueda");
    var d_nested = document.getElementById("sug" + fla);
    d.removeChild(d_nested);
  }

  indice = 0; /////

  fetch("https://api.giphy.com/v1/gifs/search?q=".concat(buscar, "&api_key=").concat(apiKey, "&limit=12")).then(function (response) {
    return response.json();
  }).then(function (json) {
    console.log(json.data);
    var e = document.getElementById("imagenes");
    var child = e.lastElementChild; /////////here remove last search

    while (child) {
      e.removeChild(child);
      child = e.lastElementChild;
    }

    json.data.map(function (gif) {
      return gif.images.fixed_height.url;
    }).forEach(function (url) {
      console.log(url);
      var div = document.createElement("div");
      div.id = identifier;
      div.className = "divi";
      var overlay = document.createElement("div");
      overlay.className = "overlay";
      var img = document.createElement("img");
      img.src = url;
      img.setAttribute("width", "260px");
      img.setAttribute("height", "200px");
      div.appendChild(img);
      div.appendChild(overlay);
      document.getElementById("imagenes").appendChild(div);
      var title = document.createElement("div");
      title.className = "titulo";
      title.id = "titulo" + identifier;
      overlay.appendChild(title);
      var user = document.createElement("div");
      user.className = "user";
      user.id = "user" + identifier;
      overlay.appendChild(user);
      var iconos = document.createElement("div");
      iconos.className = "iconos";
      overlay.appendChild(iconos);
      var fav = document.createElement("a");
      fav.className = "fav";
      fav.id = "favoritos" + identifier;
      iconos.appendChild(fav);
      var adownload = document.createElement("a");
      adownload.className = "down";
      adownload.id = "download" + identifier;
      iconos.appendChild(adownload);
      var amp = document.createElement("a");
      amp.className = "amp";
      amp.id = "ampliar" + identifier;
      iconos.appendChild(amp);
      identifier++;
    });
    identifier = 0; // document.getElementById("titleTrending").style="display:none";
    // document.getElementById("parrafTrending").style="display:none";

    var titleSearch = document.getElementById("titleSearchs");
    titleSearch.style = "display.block";
    titleSearch.textContent = buscar;
    json.data.map(function (data) {
      return data.title;
    }).forEach(function (title) {
      document.getElementById("titulo" + identifier).textContent = title;
      identifier++;
      console.log(title);
    });
    identifier = 0;
    json.data.map(function (user) {
      return user.username;
    }).forEach(function (username) {
      document.getElementById("user" + identifier).textContent = username;
      identifier++;
      console.log(username);
    });
    identifier = 0;
  })["catch"](function (error) {
    return document.body.appendChild = error;
  });
} //////////////////////////////////////////////
////////////modal///////////////
// let over= document.querySelector('.overlay')


document.querySelector('.imagenes').addEventListener("click", function ampliarModal(e) {
  console.log("hubo un click");

  if (e.target && e.target.matches("a.amp")) {
    console.log("presionamos algun ampliar");
    console.log(e.target.id);
    document.getElementById("modal").style = "display:block";
  }

  if (e.target && e.target.matches("a.down")) {
    console.log("presionamos algun download");
    console.log(e.target.id);
  }

  if (e.target && e.target.matches("a.fav")) {
    console.log("presionamos algun favoritos");
    console.log(e.target.id);
  } //document.getElementById("modal").style= "display:block";

});