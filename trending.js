// selector
var menu = document.querySelector(".hamburger");

// method
function toggleMenu(event) {
  this.classList.toggle("is-active");
  document.querySelector(".menuppal").classList.toggle("is_active");
  event.preventDefault();
}

// event
menu.addEventListener("click", toggleMenu, false);

// addEventListener version
// trending
let apiKey = "bw24LFlb3BXkhx9uB9goI91bEaW3Sm8H";
var count = 0;
let arraygifs = new Array();
let arrayTitle = new Array();
let arrayUser = new Array();
fetch(`https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=6`)
  .then((response) => response.json())
  .then((json) => {
    json.data.map((gif) => gif.images.original.url) 
      .forEach((url) => {
        arraygifs[count] = url;
        count++;
        console.log(arraygifs.length);
      });
      count=0;
      json.data.map((data) => data.title)
        .forEach((title) => {
          arrayTitle[count] = title;
          console.log(arrayTitle[count]);
        count++;
        
        
        });
        count=0;
        json.data
        .map((user) => user.username)
        .forEach((username) => {
          arrayUser[count] = username;
        count++;    
     
        });
        
    for (var a = 0; a < 3; a++) {
      document.getElementById("img" + a).src= arraygifs[a];
      document.getElementById("user" + a).textContent= arrayUser[a];
      document.getElementById("tit" + a).textContent= arrayTitle[a];
      
    }
  })
  .catch((error) => (document.body.appendChild = error));
console.log(arraygifs.length);


////////////////////////////////////////////////////////////////////////
// Carousel de GIFS
////////////////////////////////////////////////////////////////////////
var forward = document.getElementById("right");
let counti = 0;
forward.addEventListener("click", () => {
  counti++;
  adelante();
});

var reward = document.getElementById("left");
reward.addEventListener("click", () => {
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
      document.getElementById("user" + i).textContent= arrayUser[i + counti - arraygifs.length];
      document.getElementById("tit" + i).textContent=  arrayTitle[i + counti - arraygifs.length];
    } else {
      document.getElementById("img" + i).setAttribute("src", arraygifs[counti + i]);
      document.getElementById("user" + i).textContent= arrayUser[counti + i];
      document.getElementById("tit" + i).textContent=  arrayTitle[counti + i];
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
      document.getElementById("user" + i).textContent= arrayUser[i + counti - arraygifs.length];
      document.getElementById("tit" + i).textContent=  arrayTitle[i + counti - arraygifs.length];
    } else {
      document.getElementById("img" + i).setAttribute("src", arraygifs[i + counti]);
      document.getElementById("user" + i).textContent= arrayUser[counti + i];
      document.getElementById("tit" + i).textContent=  arrayTitle[counti + i];
    }
  }
  console.log(counti);
}
