// URL base de api

const API_URL = 'https://swapi.dev/api/';

//Elementos del DOM

const content = document.getElementById('content');
const buttons = document.querySelectorAll('nav button');
const itemSelector = document.getElementById('item-selector');
const selectorContainer = document.getElementById('selector-container');

//Funcion para obtener los datos de API

async function fetchData(endpoint){
    try{
        const response = await fetch(API_URL + endpoint);
        if(!response.ok){
            throw new Error('Network response  was  not ok');
        }
        const data = await response.json();
        console.log(`Fetched data from ${endpoint}`, data);
        return data.results;

    }catch(error){
        console.error('Error fetching data: ', error);
        return[];
    }
}

//Cards para los personajes
function createCharacterCard(character){
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
    <h2>${character.name}</h2>
    <p>Altura: ${character.height} cm</p>
    <p>Peso: ${character.mass} Kg</p>
    <p>Año de nacimiento: ${character.birth_year}</p>
    <p>Genero: ${character.gender}</p>
    `
    return card;
}

//Cards para los planetas
function createPlanetCard(planet){
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
    <h2>${planet.name}</h2>
    <p>Periodo de rotacion: ${planet.rotation_period}º</p>
    <p>Periodo de orbita: ${planet.orbital_period}º</p>
    <p>Diametro: ${planet.diameter}</p>
    <p>Clima: ${planet.climate}</p>
    <p>Gravedad: ${planet.gravity}</p>
    <p>Terreno: ${planet.terrain}</p>
    <p>Agua: ${planet.surface_water}</p>
    <p>Poblacion: ${planet.population}</p>
    `
    return card;
}
//Cards para los naves
function createdStarshipCard(starships){
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
    <h2>${starships.name}</h2>
    <p>Modelo: ${starships.model}</p>
    <p>Fabricante: ${starships.manufacturer}</p>
    <p>Costo: ${starships.cost_in_credits}</p>
    <p>Longitud: ${starships.length}</p>
    <p>Tripulacion: ${starships.crew}</p>
    <p>Pasajeros: ${starships.passengers}</p>
    <p>Capacidad: ${starships.cargo_capacity}</p>
    <p>Consumibles: ${starships.consumables}</p>
    <p>MGTL: ${starships.MGTL}</p>
    `
    return card;
}
//Funcion para mostrar los datos

async function displayData(type){
    content.innerHTML = '';
    itemSelector.style.display = 'block';
    itemSelector.innerHTML = '<option value = "" disabled selected> Seleccione un item</option>';
    const endpoint = type === 'characters' ? 'people' : type;
    console.log(`Fetching data for endpoint: ${endpoint}`);

    const data = await fetchData(endpoint);
    if (data.length === 0){
        itemSelector.innerHTML = '<option value="" disabled>No se encontraron datos</option>';
        return;
    }
    data.forEach(item =>{
        const option = document.createElement('option');
        option.value = item.url;
        option.textContent = item.name || item.title; 
        itemSelector.appendChild(option);
    });
    itemSelector.onchange = async function (){
        const url = this.value;
        const response = await fetch (url);
        const item = await response.json();
        content.innerHTML = '';

        let card;
        if (type === 'people'){
            card = createCharacterCard(item);
        }else if (type === 'planets') {
            card = createPlanetCard(item);
        }else if (type === 'starships'){
            card = createdStarshipCard(item);
        }
        if (card){
            content.appendChild(card);
        }else{
            console.error('Error: card undefined');
        }
    };
}

//Agregar eventos  a los botones
buttons.forEach(buttons =>{
    buttons.addEventListener('click', (event) =>{
        const type = event.target.id === 'characters' ? 'people' : event.target.id;
        displayData(type);
    });
});