var identifiergif=0;
let misGifiados=[];
/////////////////cerrar modal////////////////
document.getElementById("cerrar_modal").addEventListener("click", function (e) {
  console.log("hubo un click cerrar modal");
  document.getElementById("modal").style = "display:none";
});
gustados = new Array();
let recordfav = JSON.parse(localStorage.getItem("favoritosLocal"));
gustados = recordfav;
/////////////////////////////
let recordgifo = JSON.parse(localStorage.getItem("misGifos"));
console.log("Que hay en mi record??  " + recordgifo);
misGifiados= recordgifo;
cantGifs=misGifiados.length;///probando

if (gustados == null) {
  gustados = new Array();
   
 }
let urlfav = `https://api.giphy.com/v1/gifs?api_key=bw24LFlb3BXkhx9uB9goI91bEaW3Sm8H&ids=${recordgifo}`;

fetch(urlfav)
  .then((response) => response.json())
  .then((json) => {
    json.data.map((data) => data.images.downsized_large.url).forEach((urlorigin) => {
    console.log(urlorigin);
    let div = document.createElement("div");
          div.id = identifiergif;
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
          title.id = "titulo" + identifiergif;
          overlay.appendChild(title);
          let user = document.createElement("div");
          user.className = "user";
          user.id = "user" + identifiergif;
          overlay.appendChild(user);
          let iconos = document.createElement("div");
          iconos.className = "iconos";
          overlay.appendChild(iconos);
          let fav = document.createElement("a");
          fav.className = "fav";
          fav.id = "favoritos" + identifiergif;
          iconos.appendChild(fav);
          let adownload = document.createElement("a");
          adownload.className = "down";
          adownload.id = "download" + identifiergif;
          iconos.appendChild(adownload);
          let amp = document.createElement("a");
          amp.className = "amp";
          amp.id = "ampliar" + identifiergif;
          iconos.appendChild(amp);
          identifiergif++;

  });
 identifiergif=0;
 json.data
      .map((data) => data.title)
      .forEach((title) => {
        document.getElementById("titulo" + identifiergif).textContent = title;
        identifiergif++;
        console.log(title);
      });
    identifiergif = 0;
    json.data
      .map((user) => user.username)
      .forEach((username) => {
        document.getElementById("user" + identifiergif).textContent = username;
        identifiergif++;
        console.log(username);
      });
    identifiergif = 0;
    json.data
      .map((data) => data.images.downsized_large.url)
      .forEach((urlorigin) => {
        document.getElementById("download" + identifiergif).src = urlorigin;
        //document.getElementById("download"+identifier).download="tuGifo.gif"
        document.getElementById("download" + identifiergif).target = "_blank";

        identifiergif++;
        //console.log(title);
      });
    identifiergif = 0;
    //////////////////// prueba ids gifs /////////////////////////////
    json.data
      .map((data) => data.id)
      .forEach((id) => {
        document.getElementById("favoritos" + identifiergif).name = id;
        identifiergif++;
        console.log(id);
      });
    identifiergif = 0;
  
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
    
    
  
})
  .catch((error) => (document.body.appendChild = error));


  //////////////////////detectamos eventos sobre cards/////////////////

document.querySelector(".imagenes").addEventListener("click", function (e) {
  console.log("hubo un click");
  if (e.target && e.target.matches("a.amp")) {
    console.log("presionamos algun ampliar");
    console.log(e.target);
    document.getElementById("modal").style = "display:block";
    let identifi = e.target.id.substring(7, e.target.id.length);
    console.log(identifi);
    let urlmodal = document.getElementById("download" + identifi).src;
    let titlemodal = document.getElementById("titulo" + identifi).textContent;
    let usermodal = document.getElementById("user" + identifi).textContent;
    document.getElementById("titulo_modal").textContent=titlemodal;
    document.getElementById("usuario_modal").textContent=usermodal;
    console.log(urlmodal);
    document.getElementById("imagen_ampliada").src = urlmodal;
  }
  if (e.target && e.target.matches("img.cards")) {//////////amplia card al presionar sin overlay
    console.log("presionamos alguna imagen");
    console.log(e.target);
    document.getElementById("modalfav").style = "display:block";
    let identifi = e.target.id.substring(3, e.target.id.length);
    console.log(identifi);
    let urlmodal = document.getElementById("download" + identifi).src;
    let titlemodal = document.getElementById("titulo" + identifi).textContent;
    let usermodal = document.getElementById("user" + identifi).textContent;
    document.getElementById("titulo_modalfav").textContent=titlemodal;
    document.getElementById("usuario_modalfav").textContent=usermodal;
    console.log(urlmodal);
    document.getElementById("imagen_ampliadafav").src = urlmodal;
    document.getElementById("imagen_ampliadafav").name = identifi;
  }
  if (e.target && e.target.matches("a.down")) {
    console.log("presionamos algun download");
    console.log(e.target.id);
    fetch(document.getElementById(e.target.id).src)
      .then((response) => response.blob())
      .then(function (myBlob) {
        downloadGifos(myBlob, e.target.id);
      });
  }
  if (e.target && e.target.matches("a.fav")) {
    console.log("presionamos algun favoritos");
    console.log(e.target.id);
    let trashear = document.getElementById(e.target.id).name;
    //let imgfav = document.createElement("img");
    //imgfav.src = "assets/icon-trash-hover.svg";
    //imgfav.setAttribute("width", "18px");
    //imgfav.className = "imgfavs";
    //document.getElementById(e.target.id).appendChild(imgfav);
    //document.getElementById("favoritos"+e.target.id).remove;
    console.log("Elimine este gif"+trashear);
    let element = trashear;
    let idx = misGifiados.indexOf(element);
    misGifiados.splice(idx,1);
    console.log(misGifiados);
    console.log("eliminamos este "+idx);
    localStorage.setItem("misGifos", JSON.stringify(misGifiados));

    ///////////////////////////////////////////////////////////////////

     recordgifo = JSON.parse(localStorage.getItem("misGifos"));
    console.log("Que hay en mi record??  " + recordgifo);
    
    
    misGifiados = recordgifo;
     cantGifs=misGifiados.length;
    console.log("tenemos estos gustados "+misGifiados.length);
    if (misGifiados == null) {
      misGifiados = new Array();
    }
    ///////////////////////////////////////////////////////////////////

  // Eliminando todos los hijos de un elemento
  let elementrash  = document.getElementById("imagenes");
  let identifier = e.target.id.substring(9, e.target.id.length);
  elementrash.removeChild (document.getElementById(identifier))

  }
  //document.getElementById("modal").style= "display:block";
});



function downloadGifos(blob, target) {
  let identifier = target.substring(8, target.length);
  console.log("user"+identifier);
  var objectURL = URL.createObjectURL(blob);
  console.log(objectURL);
  let tags = document.createElement("a");
  tags.href = objectURL;
  tags.download = `${document.getElementById("user" + identifier).textContent}.gif`;
 // document.body.appendChild(tags);
  tags.click();
  //document.body.removeChild(tags);
}

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
