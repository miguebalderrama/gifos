"use strict";

// Usar async y wait para una funcion asincrona que nos devuelve sugrencias de busqueda
//
//
//let apiKey = "bw24LFlb3BXkhx9uB9goI91bEaW3Sm8H";
var vermas = 1;
var cantGifs = 0;
var tags = document.querySelector('input[type="search"]');
var letterInput = null;
var indice = 0;
var contBusqueda = 0;
var gustados = new Array(); //////////////////////////////////////////// guardo en un objeto queda para la proxima//////////////////////
//////////////////////////////////////////////   Si guardaba los gifs como objetos era mas rapido//////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

var arrFavoriteGifs = [];

var addToFav = function addToFav(gif, username, title) {
  var objGif = {
    gif: gif,
    username: username,
    title: title
  };
  arrFavoriteGifs.push(objGif);
  localStorage.setItem('FavoriteGifs', JSON.stringify(arrFavoriteGifs));
}; ///////////////////////VOy a cargar mi local storage////////////////////


var record = JSON.parse(localStorage.getItem("favoritosLocal"));
console.log("Que hay en mi record??" + record);
gustados = record;

if (gustados == null) {
  gustados = new Array();
} //////////////////////////////////////////////


tags.addEventListener("input", function () {
  var url = "https://api.giphy.com/v1/tags/related/".concat(letterInput, "?api_key=").concat(apiKey, "&lang=es&limit=8");
  console.log("La tecla presionada fue " + tags.value);
  letterInput = tags.value;

  if (letterInput == 0) {
    console.log("campos vacio");
    document.getElementById("lupon").setAttribute("style", "visibility: hidden");

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
    document.getElementById("inpu").setAttribute("style", "border-bottom: solid 2px rgb(167, 167, 167)"); //document.getElementById("inpu").setAttribute("style", `background: url("..//assets/icon-search.svg") left no-repeat`);
    //let imgfavs = document.createElement("img");

    document.getElementById("lupon").setAttribute("style", "visibility: visible");
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
        div.style = "background: var(--lupa) left/4% no-repeat";
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
  document.getElementById("lupon").setAttribute("style", "visibility: hidden");
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

  fetch("https://api.giphy.com/v1/gifs/search?q=".concat(buscar, "&api_key=").concat(apiKey, "&limit=50")).then(function (response) {
    return response.json();
  }).then(function (json) {
    cantGifs = json.data.length;
    console.log(json);
    var e = document.getElementById("imagenes");
    var child = e.lastElementChild; /////////here remove last search

    while (child) {
      e.removeChild(child);
      child = e.lastElementChild;
    }

    json.data.map(function (gif) {
      return gif.images.fixed_height_downsampled.url;
    }).forEach(function (url) {
      //console.log(url)
      var div = document.createElement("div");
      div.id = identifier;
      div.className = "divi";
      div.style = "display:none"; ////////////ver mas............

      var overlay = document.createElement("div");
      overlay.className = "overlay";
      var img = document.createElement("img");
      img.src = url; // img.setAttribute("width", "260px");
      // img.setAttribute("height", "200px");

      img.className = "cards";
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
    json.data.map(function (data) {
      return data.images.downsized_large.url;
    }).forEach(function (urlorigin) {
      document.getElementById("download" + identifier).src = urlorigin; //document.getElementById("download"+identifier).download="tuGifo.gif"

      document.getElementById("download" + identifier).target = "_blank";
      identifier++; //console.log(title);
    });
    identifier = 0; //////////////////// prueba ids gifs /////////////////////////////

    json.data.map(function (data) {
      return data.id;
    }).forEach(function (id) {
      document.getElementById("favoritos" + identifier).name = id;
      identifier++;
      console.log(id);
    });
    identifier = 0; //////////////////////////////////////////////

    if (cantGifs <= 12) {
      for (var index = 0; index < cantGifs; index++) {
        var element = document.getElementById(index);
        element.style = "display:block";
        document.getElementById("boton_ver_mas").style = "display:block";
      }
    }

    if (cantGifs > 12) {
      for (var _index = 0; _index < 12; _index++) {
        var _element = document.getElementById(_index);

        _element.style = "display:block";
        document.getElementById("boton_ver_mas").style = "display:block";
      }
    }

    if (cantGifs == 0) {
      console.log("no hay nada que mostrar");
      var imgouch = document.createElement("img");
      imgouch.src = "assets/icon-busqueda-sin-resultado.svg";
      imgouch.setAttribute("width", "260px");
      imgouch.setAttribute("height", "200px");
      var message = document.createElement("p");
      message.innerText = "Intenta con otra busqueda";
      message.style = "color: #50E3C2 ; font-size: 22px";
      document.getElementById("imagenes").appendChild(imgouch);
      document.getElementById("imagenes").appendChild(message);
      document.getElementById("boton_ver_mas").style = "display:none";
    }
  })["catch"](function (error) {
    return document.body.appendChild = error;
  });
} //////////////////////////////////////////////
// let over= document.querySelector('.overlay')


document.querySelector(".imagenes").addEventListener("click", function (e) {
  console.log("hubo un click");

  if (e.target && e.target.matches("a.amp")) {
    console.log("presionamos algun ampliar");
    console.log(e.target);
    document.getElementById("modal").style = "display:block";
    var identifi = e.target.id.substring(7, e.target.id.length);
    console.log(identifi);
    var urlmodal = document.getElementById("download" + identifi).src;
    var titlemodal = document.getElementById("titulo" + identifi).textContent;
    var usermodal = document.getElementById("user" + identifi).textContent;
    document.getElementById("titulo_modal").textContent = titlemodal;
    document.getElementById("usuario_modal").textContent = usermodal;
    console.log(urlmodal);
    document.getElementById("imagen_ampliada").src = urlmodal;
  }

  if (e.target && e.target.matches("a.down")) {
    console.log("presionamos algun download");
    console.log(e.target.id);
    fetch(document.getElementById(e.target.id).src).then(function (response) {
      return response.blob();
    }).then(function (myBlob) {
      downloadGif(myBlob, e.target.id);
    });
  }

  if (e.target && e.target.matches("a.fav")) {
    console.log("presionamos algun favoritos");
    console.log(e.target.id);
    var favoritear = document.getElementById(e.target.id).name; //////////////////////////////en el futuro lo guardo como obj//////////////////////////////////////

    var identifierfav = e.target.id.substring(9, e.target.id.length);
    console.log(identifierfav);
    var gif = document.getElementById("download" + identifierfav).src;
    var title = document.getElementById("titulo" + identifierfav).textContent;
    var user = document.getElementById("user" + identifierfav).textContent;
    addToFav(gif, title, user); /////////////////////////////////////////////////////////////////////

    var imgfav = document.createElement("img");
    imgfav.src = "assets/icon-fav-active.svg";
    imgfav.setAttribute("width", "18px");
    imgfav.className = "imgfavs";
    document.getElementById(e.target.id).appendChild(imgfav);
    console.log(favoritear);
    gustados.push(favoritear);
    localStorage.setItem("favoritosLocal", JSON.stringify(gustados));
  } //document.getElementById("modal").style= "display:block";

}); ///////////////////////////FUNCION QUE DESCARGA GIF/////////////////////////////////

function downloadGif(blob, target) {
  var identifier = target.substring(8, target.length);
  console.log(identifier);
  var objectURL = URL.createObjectURL(blob);
  console.log(objectURL);
  var tag = document.createElement("a");
  tag.href = objectURL;
  tag.download = "".concat(document.getElementById("titulo" + identifier).textContent, ".gif");
  document.body.appendChild(tag);
  tag.click();
  document.body.removeChild(tag);
}

document.getElementById("boton_ver_mas").addEventListener("click", function () {
  console.log(cantGifs);
  var pags = Math.trunc(cantGifs / 12);
  var bloque = 12;
  var limits = bloque + bloque * vermas;

  if (vermas < pags) {
    console.log(pags);

    for (var index = bloque * vermas; index < limits; index++) {
      var element = document.getElementById(index);
      element.style = "display:block";
      document.getElementById("boton_ver_mas").style = "display:block";
    }

    vermas++;
    console.log(vermas);
  } else {
    for (var _index2 = bloque * vermas; _index2 < cantGifs; _index2++) {
      var _element2 = document.getElementById(_index2);

      _element2.style = "display:block";
    }

    vermas = 1;
    document.getElementById("boton_ver_mas").style = "display:none";
  }
}); /////////////////////////buscamos las sugerencias////////////

document.querySelector(".form").addEventListener("click", function (e) {
  var sugess = 0;
  console.log("hubo un click");

  if (e.target && e.target.matches("div.sug")) {
    console.log("presionamos alguna sugerencia");
    console.log(e.target.id);
    sugges = document.getElementById(e.target.id).innerText;
    console.log(sugges);
    document.querySelector('input[type="search"]').value = sugges;
    searchs();
  }
}); /////////////////cerrar modal////////////////

document.getElementById("cerrar_modal").addEventListener("click", function (e) {
  console.log("hubo un click cerrar modal");
  document.getElementById("modal").style = "display:none";
}); ////////////////busqueda por lupon//////////////

document.getElementById("lupon").addEventListener("click", function () {
  console.log("hubo un click en lupon");
  document.getElementById("lupon").setAttribute("style", "visibility: hidden");
  searchs();
});