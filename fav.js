/////////////////cerrar modal////////////////
document.getElementById("cerrar_modal").addEventListener("click", function (e) {
  
    console.log("hubo un click cerrar modal");
    document.getElementById("modal").style = "display:none";
    
  });

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
          div.style=`background: url("..//assets/icon-search.svg") left/4% no-repeat`;
          document.getElementById("busqueda").appendChild(div);
          indice++;
        });
      })
      .catch((error) => (document.body.appendChild = error));