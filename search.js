// Usar async y wait para una funcion asincrona que nos devuelve sugrencias de busqueda
//
//
//let apiKey = "bw24LFlb3BXkhx9uB9goI91bEaW3Sm8H";

let tags = document.querySelector('input[type="search"]');
let letterInput = null;
let indice = 0;
var contBusqueda=0;
tags.addEventListener("input", () => {
  let url = `https://api.giphy.com/v1/tags/related/${letterInput}?api_key=${apiKey}&lang=es&limit=8`;
  console.log("La tecla presionada fue " + tags.value);
  letterInput = tags.value;
  if (letterInput == 0) {
    console.log("campos vacio");
    for (let flag = 0; flag < indice; flag++) {
      var d = document.getElementById("busqueda");
      var d_nested = document.getElementById("sug" + flag);
      d.removeChild(d_nested);
    }
    indice = 0;
    document
      .getElementById("inpu")
      .setAttribute("style", "border-bottom: none");
  }
  if (letterInput.length > 2) {
    console.log("fecheamos");
    document
      .getElementById("inpu")
      .setAttribute("style", "border-bottom: solid 2px rgb(167, 167, 167)");
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        for (let index = 0; index < indice; index++) {
          var d = document.getElementById("busqueda");
          var d_nested = document.getElementById("sug" + index);
          d.removeChild(d_nested);
        }
        indice = 0;
        json.data.forEach((element) => {
          console.log(element.name);
          let div = document.createElement("div");
          div.innerText = element.name;
          div.setAttribute("class", "sug");
          div.setAttribute("id", "sug" + indice);
          document.getElementById("busqueda").appendChild(div);
          indice++;
        });
      })
      .catch((error) => (document.body.appendChild = error));
  }
  {
    console.log("todavia nada");
  }
});

//////////////////////////////////
//////////////////////////////////

const input = document.querySelector('input[type="search"]');
var buscar = null;
input.addEventListener("search", () => {
  console.log("The term searched for was " + input.value);
  event.preventDefault();
  buscar = input.value;
  document.getElementById("inpu").setAttribute("style", "border-bottom: none");
  //////
  for (let fla = 0; fla < indice; fla++) {
    var d = document.getElementById("busqueda");
    var d_nested = document.getElementById("sug" + fla);
    d.removeChild(d_nested);
  }
  indice = 0;

  /////

  fetch(
    `https://api.giphy.com/v1/gifs/search?q=${buscar}&api_key=${apiKey}&limit=12`
  )
    .then((response) => response.json())
    .then((json) => {
      var e = document.getElementById("imagenes");
        //e.firstElementChild can be used.
        var child = e.lastElementChild; /////////here remove last search
        while (child) {
            e.removeChild(child);
            child = e.lastElementChild;
        }   
      json.data.map((gif) => gif.images.fixed_height.url)      
        .forEach((url) => {    
                        let img = document.createElement("img");
          img.id = "searchis";
          img.src = url;
          img.setAttribute("width", "260px");
          img.setAttribute("height", "200px");
          document.getElementById("imagenes").appendChild(img);
        });
      // document.getElementById("titleTrending").style="display:none";
      // document.getElementById("parrafTrending").style="display:none";
      let titleSearch = document.getElementById("titleSearchs");
      titleSearch.style = "display.block";
      titleSearch.textContent = buscar;
    })
    .catch((error) => (document.body.appendChild = error));
});
