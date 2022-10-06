let url = 'https://hp-api.herokuapp.com/api/characters'
let divCarts=document.getElementById('container-cards')
let arrayProtas=[]
let inputSearch=document.getElementById('search')
let house = []
let checksContain=document.getElementById('checks')
traerDatos(url)
let txtInput

// ---------------------------------- TRAER DATOS
function traerDatos(url) {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((personaje) => {
         arrayProtas=data;
        if (!house.includes(personaje.house) && personaje.house !='') {
          house.push(personaje.house);
        }
      });
      mostrarCartas(arrayProtas);
      crearChecks(house)
      console.log(arrayProtas);
    })
    .catch("hubo un error");
}




// ---------------------------------- MOSTRAR CARTAS
function mostrarCartas(arrayPibes) {
  divCarts.innerHTML = "";

  if(arrayPibes!=0){
    arrayPibes.forEach((pibe) => {
      let card = document.createElement("div");
      card.className = "card p-0 text-white";
      card.innerHTML = `<img src=${
        pibe.image == "" ? "assets/see.jpg" : pibe.image
      } class="card__img card-img-top" alt="${pibe.name}">
        <div class="card-body d-flex flex-column justify-content-center">
          <h5 class="card-title align-self-center">${pibe.name}</h5>
          <p class="card-text">${
            pibe.house == "" ? "" : "House: " + pibe.house
          }</p>
          <p class="card-text">${
            pibe.ancestry == "" ? "" : "Ancestry: " + pibe.ancestry
          }</p>
          <p class="card-text">${
            pibe.patronus == "" ? "" : "Patronus: " + pibe.patronus
          }</p>
          <p class="card-text">${
            pibe.wand.core == "" ? "" : "Wand: " + pibe.wand.core
          }</p>
        </div>`;
      divCarts.appendChild(card);
    });
  }else {
    let card = document.createElement("div");
    card.className = "text-center";
    card = `<img src="assets/felix.png" class="logo_error" alt="">
  <h3>Ni siquiera el encantamiento <span>Accio</span> encontro lo que buscabas</h3>
  <h5>Por favor, toma un poco de <span>Felix Felicis</span> e intentalo de nuevo</h5>`;
    divCarts.innerHTML = card;
  }
    
  
}
      
    


// ---------------------------------- EVENTOS INPUT/CHECKS
inputSearch.addEventListener('input', superFiltro)

checksContain.addEventListener('change', superFiltro)


// ---------------------------------- CREAR CHECKS

function crearChecks(array){
    checksContain.innerHTML=''

    
      array.forEach(elemento => {

        let divSwitch = document.createElement('div')
        divSwitch.className='form-checks form-switch'

        divSwitch.innerHTML=` <input class="form-check-input" type="checkbox" role="switch" id="${elemento}" value="${elemento}">
        <label class="form-check-label" for="${elemento}">${elemento}</label>`
    
        checksContain.appendChild(divSwitch)
    
        })
    
}

// ---------------------------------- FILTRO CHECKS

function filtrarCasas(arrayPersonajes){
    let casasFiltros=Array.from(document.querySelectorAll("input[type='checkbox']")).filter(checkbox => checkbox.checked).map(checkCheked => checkCheked.value)


    if(casasFiltros.length==0){
        return arrayPersonajes
    }else{
        let personajeFiltrado= arrayPersonajes.filter(personaje => casasFiltros.includes(personaje.house))
        return personajeFiltrado
    }
}
 

// ---------------------------------- FILTRO POR TEXTO
function filtroNombre(arrayPibes){
    let texto=inputSearch.value

    let arrayFilter=arrayPibes.filter(personaje => personaje.name.toLowerCase().includes(texto.toLowerCase()))

    return arrayFilter
}

// ---------------------------------- SUPER FILTRO

function superFiltro(){
   let primerFiltro = filtrarCasas(arrayProtas)
    let segundoFiltro = filtroNombre(primerFiltro)

    mostrarCartas(segundoFiltro)
}




// ----------------------------------------------- BOTONCITO PARA IR ARRIBA ----------------------------------------------

window.onscroll = function(){
  if(document.documentElement.scrollTop>100){
    document.querySelector('.go-top-container').classList.add('show')
  }else{
    document.querySelector('.go-top-container').classList.remove('show')
  }
}

document.querySelector('.go-top-container').addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
})
