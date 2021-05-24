var identifierfav=0;
/////////////////cerrar modal////////////////
document.getElementById("cerrar_modal").addEventListener("click", function (e) {
  console.log("hubo un click cerrar modal");
  document.getElementById("modal").style = "display:none";
});

/////////////////////////////
let recordfav = JSON.parse(localStorage.getItem("favoritosLocal"));
console.log("Que hay en mi record??  " + recordfav);

let urlfav = `https://api.giphy.com/v1/gifs?api_key=bw24LFlb3BXkhx9uB9goI91bEaW3Sm8H&ids=${recordfav}`;

fetch(urlfav)
  .then((response) => response.json())
  .then((json) => {
    json.data.map((data) => data.images.downsized_large.url).forEach((urlorigin) => {
    console.log(urlorigin);
    let div = document.createElement("div");
          div.id = identifierfav;
          div.className = "divi";
          div.style = "display:block"; ////////////ver mas............
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
 idetifier==0;
})
  .catch((error) => (document.body.appendChild = error));
