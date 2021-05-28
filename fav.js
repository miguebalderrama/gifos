var identifierfav = 0;
/////////////////cerrar modal////////////////
document.getElementById("cerrar_modal").addEventListener("click", function (e) {
  console.log("hubo un click cerrar modal");
  document.getElementById("modal").style = "display:none";
});

/////////////////////////////
gustados = new Array();
let recordfa = JSON.parse(localStorage.getItem("favoritosLocal"));
console.log("Que hay en mi record??  " + recordfa);
const recordfav = recordfa.filter((valor, indice) => {///elimino valores repetidos
  return recordfa.indexOf(valor) === indice;
}
)
gustados = recordfav;
let cantGifs=gustados.length;
console.log("tenemos estos gustados "+gustados.length);
if (gustados == null) {
  gustados = new Array();
}

let urlfav = `https://api.giphy.com/v1/gifs?api_key=bw24LFlb3BXkhx9uB9goI91bEaW3Sm8H&ids=${recordfav}`;

fetch(urlfav)
  .then((response) => response.json())
  .then((json) => {
    json.data
      .map((data) => data.images.downsized_large.url)
      .forEach((urlorigin) => {
        console.log(urlorigin);
        let div = document.createElement("div");
        div.id = identifierfav;
        div.className = "divi";
        div.style = "display:none"; ////////////ver mas............
        let overlay = document.createElement("div");
        overlay.className = "overlay";
        let img = document.createElement("img");
        img.src = urlorigin;
        img.setAttribute("width", "260px");
        img.setAttribute("height", "200px");
        div.appendChild(img);
        div.appendChild(overlay);
        document.getElementById("imagenes").appendChild(div);
        let title = document.createElement("div");
        title.className = "titulo";
        title.id = "titulo" + identifierfav;
        overlay.appendChild(title);
        let user = document.createElement("div");
        user.className = "user";
        user.id = "user" + identifierfav;
        overlay.appendChild(user);
        let iconos = document.createElement("div");
        iconos.className = "iconos";
        overlay.appendChild(iconos);
        let fav = document.createElement("a");
        fav.className = "fav";
        fav.id = "favoritos" + identifierfav;
        iconos.appendChild(fav);
        let adownload = document.createElement("a");
        adownload.className = "down";
        adownload.id = "download" + identifierfav;
        iconos.appendChild(adownload);
        let amp = document.createElement("a");
        amp.className = "amp";
        amp.id = "ampliar" + identifierfav;
        iconos.appendChild(amp);
        identifierfav++;
      });
    identifierfav = 0;
    json.data
      .map((data) => data.title)
      .forEach((title) => {
        document.getElementById("titulo" + identifierfav).textContent = title;
        identifierfav++;
        console.log(title);
      });
    identifierfav = 0;
    json.data
      .map((user) => user.username)
      .forEach((username) => {
        document.getElementById("user" + identifierfav).textContent = username;
        identifierfav++;
        console.log(username);
      });
    identifierfav = 0;
    json.data
      .map((data) => data.images.downsized_large.url)
      .forEach((urlorigin) => {
        document.getElementById("download" + identifierfav).src = urlorigin;
        //document.getElementById("download"+identifier).download="tuGifo.gif"
        document.getElementById("download" + identifierfav).target = "_blank";

        identifierfav++;
        //console.log(title);
      });
    identifierfav = 0;
    //////////////////// prueba ids gifs /////////////////////////////
    json.data
      .map((data) => data.id)
      .forEach((id) => {
        document.getElementById("favoritos" + identifierfav).name = id;
        identifierfav++;
        console.log(id);
      });
    identifierfav = 0;

    //////////////////////////////////////////////
    if (cantGifs <= 12) {
      for (let index = 0; index < cantGifs; index++) {
        const element = document.getElementById(index);
        element.style = "display:block";
        document.getElementById("boton_ver_mas").style = "display:block";
      }
    }

    if (cantGifs > 12) {
      for (let index = 0; index < 12; index++) {
        const element = document.getElementById(index);
        element.style = "display:block";
        document.getElementById("boton_ver_mas").style = "display:block";
      }
    }
    if (cantGifs == 0) {
      console.log("no hay nada que mostrar");
      let imgouch = document.createElement("img");
      imgouch.src = "assets/icon-busqueda-sin-resultado.svg";
      imgouch.setAttribute("width", "260px");
      imgouch.setAttribute("height", "200px");
      let message = document.createElement("p");
      message.innerText = "Intenta con otra busqueda";
      message.style = "color: #50E3C2 ; font-size: 22px";
      document.getElementById("imagenes").appendChild(imgouch);
      document.getElementById("imagenes").appendChild(message);
      document.getElementById("boton_ver_mas").style = "display:none";
    }
  })

  .catch((error) => (document.body.appendChild = error));
////////////////////////7 boton ver mas//////////
let vermasfav=1;
document.getElementById("boton_ver_mas").addEventListener("click", function () {
  console.log(cantGifs);
  let pags = Math.trunc(cantGifs / 12);
  let bloque = 12;
  let limits = bloque + bloque * vermasfav;
  if (vermasfav < pags) {
    console.log(pags);
    for (let index = bloque * vermasfav; index < limits; index++) {
      const element = document.getElementById(index);
      element.style = "display:block";
      document.getElementById("boton_ver_mas").style = "display:block";
    }
    vermasfav++;
    console.log(vermasfav);
  } else {
    for (let index = bloque * vermasfav; index < cantGifs; index++) {
      const element = document.getElementById(index);
      element.style = "display:block";
    }
    vermasfav = 1;
    document.getElementById("boton_ver_mas").style = "display:none";
  }
});