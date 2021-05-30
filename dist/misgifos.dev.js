"use strict";

var identifiergif = 0;
var misGifiados = []; /////////////////cerrar modal////////////////

document.getElementById("cerrar_modal").addEventListener("click", function (e) {
  console.log("hubo un click cerrar modal");
  document.getElementById("modal").style = "display:none";
});
gustados = new Array();
var recordfav = JSON.parse(localStorage.getItem("favoritosLocal"));
gustados = recordfav; /////////////////////////////

var recordgifo = JSON.parse(localStorage.getItem("misGifos"));
console.log("Que hay en mi record??  " + recordgifo);
misGifiados = recordgifo;

if (gustados == null) {
  gustados = new Array();
}

var urlfav = "https://api.giphy.com/v1/gifs?api_key=bw24LFlb3BXkhx9uB9goI91bEaW3Sm8H&ids=".concat(recordgifo);
fetch(urlfav).then(function (response) {
  return response.json();
}).then(function (json) {
  json.data.map(function (data) {
    return data.images.downsized_large.url;
  }).forEach(function (urlorigin) {
    console.log(urlorigin);
    var div = document.createElement("div");
    div.id = identifiergif;
    div.className = "divi";
    div.style = "display:block"; ////////////ver mas............

    var overlay = document.createElement("div");
    overlay.className = "overlay";
    var img = document.createElement("img");
    img.src = urlorigin;
    img.setAttribute("width", "260px");
    img.setAttribute("height", "200px");
    div.appendChild(img);
    div.appendChild(overlay);
    document.getElementById("imagenes").appendChild(div);
    var title = document.createElement("div");
    title.className = "titulo";
    title.id = "titulo" + identifiergif;
    overlay.appendChild(title);
    var user = document.createElement("div");
    user.className = "user";
    user.id = "user" + identifiergif;
    overlay.appendChild(user);
    var iconos = document.createElement("div");
    iconos.className = "iconos";
    overlay.appendChild(iconos);
    var fav = document.createElement("a");
    fav.className = "fav";
    fav.id = "favoritos" + identifiergif;
    iconos.appendChild(fav);
    var adownload = document.createElement("a");
    adownload.className = "down";
    adownload.id = "download" + identifiergif;
    iconos.appendChild(adownload);
    var amp = document.createElement("a");
    amp.className = "amp";
    amp.id = "ampliar" + identifiergif;
    iconos.appendChild(amp);
    identifiergif++;
  });
  identifiergif = 0;
  json.data.map(function (data) {
    return data.title;
  }).forEach(function (title) {
    document.getElementById("titulo" + identifiergif).textContent = title;
    identifiergif++;
    console.log(title);
  });
  identifiergif = 0;
  json.data.map(function (user) {
    return user.username;
  }).forEach(function (username) {
    document.getElementById("user" + identifiergif).textContent = username;
    identifiergif++;
    console.log(username);
  });
  identifiergif = 0;
  json.data.map(function (data) {
    return data.images.downsized_large.url;
  }).forEach(function (urlorigin) {
    document.getElementById("download" + identifiergif).src = urlorigin; //document.getElementById("download"+identifier).download="tuGifo.gif"

    document.getElementById("download" + identifiergif).target = "_blank";
    identifiergif++; //console.log(title);
  });
  identifiergif = 0; //////////////////// prueba ids gifs /////////////////////////////

  json.data.map(function (data) {
    return data.id;
  }).forEach(function (id) {
    document.getElementById("favoritos" + identifiergif).name = id;
    identifiergif++;
    console.log(id);
  });
  identifiergif = 0; //////////////////////////////////////////////

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
})["catch"](function (error) {
  return document.body.appendChild = error;
}); //////////////////////detectamos eventos sobre cards/////////////////

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
      downloadGifos(myBlob, e.target.id);
    });
  }

  if (e.target && e.target.matches("a.fav")) {
    console.log("presionamos algun favoritos");
    console.log(e.target.id);
    var trashear = document.getElementById(e.target.id).name; //let imgfav = document.createElement("img");
    //imgfav.src = "assets/icon-trash-hover.svg";
    //imgfav.setAttribute("width", "18px");
    //imgfav.className = "imgfavs";
    //document.getElementById(e.target.id).appendChild(imgfav);
    //document.getElementById("favoritos"+e.target.id).remove;

    console.log("Elimine este gif" + trashear);
    var element = trashear;
    var idx = misGifiados.indexOf(element);
    misGifiados.splice(idx, 1);
    console.log(misGifiados);
    console.log("eliminamos este " + idx);
    localStorage.setItem("misGifos", JSON.stringify(misGifiados)); ///////////////////////////////////////////////////////////////////

    recordgifo = JSON.parse(localStorage.getItem("misGifos"));
    console.log("Que hay en mi record??  " + recordgifo);
    misGifiados = recordgifo;
    cantGifs = misGifiados.length;
    console.log("tenemos estos gustados " + misGifiados.length);

    if (misGifiados == null) {
      misGifiados = new Array();
    } ///////////////////////////////////////////////////////////////////
    // Eliminando todos los hijos de un elemento


    var elementrash = document.getElementById("imagenes");
    var identifier = e.target.id.substring(9, e.target.id.length);
    elementrash.removeChild(document.getElementById(identifier)); //while (elementrash.firstChild) {
    //  elementrash.removeChild(elementrash.firstChild);
    //}
    // pintar();
  } //document.getElementById("modal").style= "display:block";

});

function downloadGifos(blob, target) {
  var identifier = target.substring(8, target.length);
  console.log("user" + identifier);
  var objectURL = URL.createObjectURL(blob);
  console.log(objectURL);
  var tags = document.createElement("a");
  tags.href = objectURL;
  tags.download = "".concat(document.getElementById("user" + identifier).textContent, ".gif"); // document.body.appendChild(tags);

  tags.click(); //document.body.removeChild(tags);
}