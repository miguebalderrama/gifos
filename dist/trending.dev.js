"use strict";

// selector
var menu = document.querySelector(".hamburger"); // method

function toggleMenu(event) {
  this.classList.toggle("is-active");
  document.querySelector(".menuppal").classList.toggle("is_active");
  event.preventDefault();
} // event


menu.addEventListener("click", toggleMenu, false);
var favtrend0 = 0;
var favtrend0 = 1;
var favtrend0 = 2; // addEventListener version
// trending

var apiKey = "bw24LFlb3BXkhx9uB9goI91bEaW3Sm8H";
var count = 0;
var arraygifs = new Array();
var arrayTitle = new Array();
var arrayUser = new Array();
var arrayUrl = new Array();
var arrayId = new Array();
var arrayLike = new Array();
fetch("https://api.giphy.com/v1/gifs/trending?api_key=".concat(apiKey, "&limit=5")).then(function (response) {
  return response.json();
}).then(function (json) {
  json.data.map(function (gif) {
    return gif.images.original.url;
  }).forEach(function (url) {
    arraygifs[count] = url;
    count++;
    console.log(arraygifs.length);
  });
  count = 0;
  json.data.map(function (data) {
    return data.title;
  }).forEach(function (title) {
    arrayTitle[count] = title;
    console.log(arrayTitle[count]);
    count++;
  });
  count = 0;
  json.data.map(function (user) {
    return user.username;
  }).forEach(function (username) {
    arrayUser[count] = username;
    count++;
  });
  count = 0;
  json.data.map(function (data) {
    return data.images.downsized_large.url;
  }).forEach(function (urlorigin) {
    arrayUrl[count] = urlorigin;
    count++;
  });
  count = 0;
  json.data.map(function (data) {
    return data.id;
  }).forEach(function (id) {
    arrayId[count] = id;
    count++;
  });
  count = 0;

  for (var a = 0; a < 3; a++) {
    document.getElementById("img" + a).src = arraygifs[a];
    document.getElementById("user" + a).textContent = arrayUser[a];
    document.getElementById("tit" + a).textContent = arrayTitle[a];
    document.getElementById("downtrend" + a).src = arrayUrl[a];
    document.getElementById("favtrend" + a).name = arrayId[a];
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

  if (favtrend0 === 1) {
    var d = document.getElementById("favtrend0");
    var d_nested = document.getElementById("imgfav0");
    d.removeChild(d_nested);
    favtrend0 = 0;
  }

  if (favtrend1 === 1) {
    var _d = document.getElementById("favtrend1");

    var _d_nested = document.getElementById("imgfav1");

    _d.removeChild(_d_nested);

    favtrend1 = 0;
  }

  if (favtrend2 === 1) {
    var _d2 = document.getElementById("favtrend2");

    var _d_nested2 = document.getElementById("imgfav2");

    _d2.removeChild(_d_nested2);

    favtrend2 = 0;
  }

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
      document.getElementById("user" + i).textContent = arrayUser[i + counti - arraygifs.length];
      document.getElementById("tit" + i).textContent = arrayTitle[i + counti - arraygifs.length];
      document.getElementById("downtrend" + i).src = arrayUrl[i + counti - arraygifs.length];
      document.getElementById("favtrend" + i).name = arrayId[i + counti - arraygifs.length];
    } else {
      document.getElementById("img" + i).setAttribute("src", arraygifs[counti + i]);
      document.getElementById("user" + i).textContent = arrayUser[counti + i];
      document.getElementById("tit" + i).textContent = arrayTitle[counti + i];
      document.getElementById("downtrend" + i).src = arrayUrl[counti + i];
      document.getElementById("favtrend" + i).name = arrayId[i + counti];
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
      document.getElementById("user" + i).textContent = arrayUser[i + counti - arraygifs.length];
      document.getElementById("tit" + i).textContent = arrayTitle[i + counti - arraygifs.length];
      document.getElementById("downtrend" + i).src = arrayUrl[i + counti - arraygifs.length];
      document.getElementById("favtrend" + i).name = arrayId[i + counti - arraygifs.length];
    } else {
      document.getElementById("img" + i).setAttribute("src", arraygifs[i + counti]);
      document.getElementById("user" + i).textContent = arrayUser[counti + i];
      document.getElementById("tit" + i).textContent = arrayTitle[counti + i];
      document.getElementById("downtrend" + i).src = arrayUrl[counti + i];
      document.getElementById("favtrend" + i).name = arrayId[i + counti];
    }
  }

  console.log(counti);

  if (arrayLike.find(function (element) {
    return element == document.getElementById("favtrend0").name;
  })) {
    console.log("hay un gustado en card 0");
    favtrend0 = 1;
    var imgfavs = document.createElement("img");
    imgfavs.src = "..//assets/icon-fav-active.svg";
    imgfavs.setAttribute("width", "18px");
    imgfavs.className = "imgfavs";
    imgfavs.id = "imgfav0";
    document.getElementById("favtrend0").appendChild(imgfavs);
  }
} ///////////// listener de los icinos de los trending/////////////////////////


var downtrend = document.getElementById("downtrend0");
downtrend.addEventListener("click", function (e) {
  e.preventDefault();
  downloadTrend(downtrend.id);
});
var downtrenduno = document.getElementById("downtrend1");
downtrenduno.addEventListener("click", function (e) {
  e.preventDefault();
  downloadTrend(downtrenduno.id);
});
var downtrenddos = document.getElementById("downtrend2");
downtrenddos.addEventListener("click", function (e) {
  e.preventDefault();
  downloadTrend(downtrenddos.id);
});
var amptrenddos = document.getElementById("amptrend2");
amptrenddos.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("hice click en el modal 2");
  var urlmodal = document.getElementById("downtrend2").src;
  document.getElementById("modal").style = "display:block";
  document.getElementById("imagen_ampliada").src = urlmodal;
});
var amptrenduno = document.getElementById("amptrend1");
amptrenduno.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("hice click en el modal 1");
  var urlmodal = document.getElementById("downtrend1").src;
  document.getElementById("modal").style = "display:block";
  document.getElementById("imagen_ampliada").src = urlmodal;
});
var amptrendcero = document.getElementById("amptrend0");
amptrendcero.addEventListener("click", function (e) {
  e.preventDefault();
  console.log("hice click en el modal 0");
  var urlmodal = document.getElementById("downtrend0").src;
  document.getElementById("modal").style = "display:block";
  document.getElementById("imagen_ampliada").src = urlmodal;
});
var favtrend = document.getElementById("favtrend0");
favtrend.addEventListener("click", function (e) {
  e.preventDefault();
  favtrend0 = 1;
  console.log("detectamos el primer fav");
  var favoritrend = document.getElementById("favtrend0").name;
  arrayLike.push(favoritrend);
  var imgfav = document.createElement("img");
  imgfav.src = "..//assets/icon-fav-active.svg";
  imgfav.setAttribute("width", "18px");
  imgfav.className = "imgfavs";
  imgfav.id = "imgfav0";
  document.getElementById("favtrend0").appendChild(imgfav);
  console.log(favoritrend);
  gustados.push(favoritrend);
  localStorage.setItem("favoritosLocal", JSON.stringify(gustados));
});

function downloadTrend(card) {
  console.log("presionamos la " + card);
  fetch(document.getElementById(card).src).then(function (response) {
    return response.blob();
  }).then(function (blobs) {
    var identifier = card.substring(9, card.length);
    console.log(identifier);
    console.log(blobs);
    var objectURLtrend = URL.createObjectURL(blobs);
    console.log(objectURLtrend);
    var tagtrend = document.createElement("a");
    tagtrend.href = objectURLtrend;
    tagtrend.download = "".concat(document.getElementById("tit" + identifier).textContent, ".gif");
    document.body.appendChild(tagtrend);
    tagtrend.click();
    document.body.removeChild(tagtrend);
  });
}