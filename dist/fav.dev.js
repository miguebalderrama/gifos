"use strict";

var identifierfav = 0;
var cantGifs = 0; /////////////////cerrar modal////////////////

document.getElementById("cerrar_modal").addEventListener("click", function (e) {
  console.log("hubo un click cerrar modal");
  document.getElementById("modal").style = "display:none";
}); /////////////////////////////

gustados = new Array();
var recordfa = JSON.parse(localStorage.getItem("favoritosLocal"));
console.log("Que hay en mi record??  " + recordfa);
var recordfav = recordfa.filter(function (valor, indice) {
  ///elimino valores repetidos
  return recordfa.indexOf(valor) === indice;
});
gustados = recordfav;
cantGifs = gustados.length;
console.log("tenemos estos gustados " + gustados.length);

if (gustados == null) {
  gustados = new Array();
}

function pintar() {
  if (recordfav != 0) {
    var urlfav = "https://api.giphy.com/v1/gifs?api_key=bw24LFlb3BXkhx9uB9goI91bEaW3Sm8H&ids=".concat(recordfav);
    fetch(urlfav).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.data.map(function (data) {
        return data.images.downsized_large.url;
      }).forEach(function (urlorigin) {
        console.log(urlorigin);
        var div = document.createElement("div");
        div.id = identifierfav;
        div.className = "divi";
        div.style = "display:none"; ////////////ver mas............

        var overlay = document.createElement("div");
        overlay.className = "overlay";
        var img = document.createElement("img");
        img.src = urlorigin;
        img.className = "cards";
        img.setAttribute("width", "260px");
        img.setAttribute("height", "200px");
        div.appendChild(img);
        div.appendChild(overlay);
        document.getElementById("imagenes").appendChild(div);
        var title = document.createElement("div");
        title.className = "titulo";
        title.id = "titulo" + identifierfav;
        overlay.appendChild(title);
        var user = document.createElement("div");
        user.className = "user";
        user.id = "user" + identifierfav;
        overlay.appendChild(user);
        var iconos = document.createElement("div");
        iconos.className = "iconos";
        overlay.appendChild(iconos);
        var fav = document.createElement("a");
        fav.className = "fav";
        fav.id = "favoritos" + identifierfav;
        iconos.appendChild(fav);
        var adownload = document.createElement("a");
        adownload.className = "down";
        adownload.id = "download" + identifierfav;
        iconos.appendChild(adownload);
        var amp = document.createElement("a");
        amp.className = "amp";
        amp.id = "ampliar" + identifierfav;
        iconos.appendChild(amp);
        identifierfav++;
      });
      identifierfav = 0;
      json.data.map(function (data) {
        return data.title;
      }).forEach(function (title) {
        document.getElementById("titulo" + identifierfav).textContent = title;
        identifierfav++;
        console.log(title);
      });
      identifierfav = 0;
      json.data.map(function (user) {
        return user.username;
      }).forEach(function (username) {
        document.getElementById("user" + identifierfav).textContent = username;
        identifierfav++;
        console.log(username);
      });
      identifierfav = 0;
      json.data.map(function (data) {
        return data.images.downsized_large.url;
      }).forEach(function (urlorigin) {
        document.getElementById("download" + identifierfav).src = urlorigin; //document.getElementById("download"+identifier).download="tuGifo.gif"

        document.getElementById("download" + identifierfav).target = "_blank";
        identifierfav++; //console.log(title);
      });
      identifierfav = 0; //////////////////// prueba ids gifs /////////////////////////////

      json.data.map(function (data) {
        return data.id;
      }).forEach(function (id) {
        document.getElementById("favoritos" + identifierfav).name = id;
        identifierfav++;
        console.log(id);
      });
      identifierfav = 0; //////////////////////////////////////////////

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
    });
  }

  if (cantGifs === 0) {
    console.log("no hay nada que mostrar");
    var imgouch = document.createElement("img");
    imgouch.src = "assets/icon-fav-sin-contenido.svg";
    imgouch.setAttribute("width", "200px");
    imgouch.setAttribute("height", "200px");
    imgouch.style = "display:block";
    var message = document.createElement("p");
    message.innerHTML = "¡Guarda tu primer GIFO en Favoritos" + "<br/>" + "para que se muestre aquí!";
    message.style = "color: #50E3C2 ; font-size: 22px";
    document.getElementById("imagenes").appendChild(imgouch);
    document.getElementById("imagenes").appendChild(message);
    document.getElementById("boton_ver_mas").style = "display:none";
  }
}

pintar(); ////////////////////////7 boton ver mas//////////

var vermasfav = 1;
document.getElementById("boton_ver_mas").addEventListener("click", function () {
  console.log(cantGifs);
  var pags = Math.trunc(cantGifs / 12);
  var bloque = 12;
  var limits = bloque + bloque * vermasfav;

  if (vermasfav < pags) {
    console.log(pags);

    for (var index = bloque * vermasfav; index < limits; index++) {
      var element = document.getElementById(index);
      element.style = "display:block";
      document.getElementById("boton_ver_mas").style = "display:block";
    }

    vermasfav++;
    console.log(vermasfav);
  } else {
    for (var _index2 = bloque * vermasfav; _index2 < cantGifs; _index2++) {
      var _element2 = document.getElementById(_index2);

      _element2.style = "display:block";
    }

    vermasfav = 1;
    document.getElementById("boton_ver_mas").style = "display:none";
  }
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
      downloadGif(myBlob, e.target.id);
    });
  }

  if (e.target && e.target.matches("a.fav")) {
    console.log("presionamos algun favoritos");
    console.log(e.target.id);
    var favoritear = document.getElementById(e.target.id).name; //let imgfav = document.createElement("img");
    //imgfav.src = "assets/icon-trash-hover.svg";
    //imgfav.setAttribute("width", "18px");
    //imgfav.className = "imgfavs";
    //document.getElementById(e.target.id).appendChild(imgfav);
    //document.getElementById("favoritos"+e.target.id).remove;

    console.log("Elimine este gif" + favoritear);
    var element = favoritear;
    var idx = gustados.indexOf(element);
    gustados.splice(idx, 1);
    console.log(gustados);
    console.log("eliminamos este " + idx);
    localStorage.setItem("favoritosLocal", JSON.stringify(gustados)); ///////////////////////////////////////////////////////////////////

    recordfa = JSON.parse(localStorage.getItem("favoritosLocal"));
    console.log("Que hay en mi record??  " + recordfa);
    recordfav = recordfa.filter(function (valor, indice) {
      ///elimino valores repetidos
      return recordfa.indexOf(valor) === indice;
    });
    gustados = recordfav;
    cantGifs = gustados.length;
    console.log("tenemos estos gustados " + gustados.length);

    if (gustados == null) {
      gustados = new Array();
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