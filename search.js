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
var identifier=0;
input.addEventListener("search", () => {
  searchs();
});

  function searchs (){
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
      console.log(json.data)
      var e = document.getElementById("imagenes");
        var child = e.lastElementChild; /////////here remove last search
        while (child) {
            e.removeChild(child);
            child = e.lastElementChild;
        }   
        
      json.data.map((gif) => gif.images.fixed_height.url)      
        .forEach((url) => { 
          console.log(url)   
          let div = document.createElement("div"); 
          div.id= identifier;        
          div.className="divi";
          let overlay = document.createElement("div");
          overlay.className="overlay";          
          let img = document.createElement("img");          
          img.src = url;
          img.setAttribute("width", "260px");
          img.setAttribute("height", "200px");
          div.appendChild(img);
          div.appendChild(overlay);
          document.getElementById("imagenes").appendChild(div);

          let title = document.createElement("div");                  
          title.className="titulo";
          title.id= "titulo"+identifier;           
          overlay.appendChild(title);
          let user = document.createElement("div");                  
          user.className="user";
          user.id= "user"+identifier;           
          overlay.appendChild(user);
          let iconos = document.createElement("div");
          iconos.className="iconos"
          overlay.appendChild(iconos);
          let fav = document.createElement("a");
          fav.className="fav";
          fav.id= "favoritos"+identifier;           
          iconos.appendChild(fav);
          let adownload = document.createElement("a");
          adownload.className="down";
          adownload.id= "download"+identifier;           
          iconos.appendChild(adownload);
          let amp = document.createElement("a");
          amp.className="amp";
          amp.id= "ampliar"+identifier;           
          iconos.appendChild(amp);
          identifier++;
        });
        identifier=0;
      // document.getElementById("titleTrending").style="display:none";
      // document.getElementById("parrafTrending").style="display:none";
      let titleSearch = document.getElementById("titleSearchs");
      titleSearch.style = "display.block";
      titleSearch.textContent = buscar;
      json.data.map((data) => data.title)      
      .forEach((title) => { 
        document.getElementById("titulo"+identifier).textContent=title;
        identifier++;
        console.log(title);         
      });
      identifier=0;
      json.data.map((user) => user.username).forEach((username) => { 
        document.getElementById("user"+identifier).textContent=username;
        identifier++;
        console.log(username)   
        
      });
      identifier=0;
    })
    .catch((error) => (document.body.appendChild = error));
  }
  //////////////////////////////////////////////
  ////////////modal///////////////
 // let over= document.querySelector('.overlay')
 document.querySelector('.imagenes').addEventListener("click", function ampliarModal(e){

  console.log("hubo un click");
  if (e.target && e.target.matches("a.amp")) {
    console.log("presionamos algun ampliar");    
    console.log(e.target.id);
  }
  if (e.target && e.target.matches("a.down")) {
    console.log("presionamos algun download");    
    console.log(e.target.id);
  }
  if (e.target && e.target.matches("a.fav")) {
    console.log("presionamos algun favoritos");    
    console.log(e.target.id);
  }
  //document.getElementById("modal").style= "display:block";
} ); 

 

  