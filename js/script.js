const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonShiny = document.querySelector('.btn-shiny');
const pokemonType0 = document.querySelector('.pokemon_type_0');
const pokemonType1 = document.querySelector('.pokemon_type_1');

let searchPokemon = 1;


const fetchPokemon =  async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    
    if (APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Carregando...'
    pokemonNumber.innerHTML = '';
    pokemonType0.innerHTML = '';
    pokemonType1.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    if (data.id <= 649){
        if (data){
            
                pokemonImage.style.display = 'block'
                pokemonName.innerHTML = data.name;
                pokemonNumber.innerHTML = data.id;     
                pokemonType0.innerHTML = data['types']['0']['type']['name'];
                if (data['types']['1']){
                    pokemonType1.innerHTML = data['types']['1']['type']['name'];     
                }    
                input.value = '' /* limpar campo para não precisar ficar removendo manualmente */;
                searchPokemon = data.id;
                if (buttonShiny.value === "Shiny: OFF"){
                    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
                } else {
                    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny'];
                }
            
        } 
    }    
    else {
        pokemonImage.style.display = 'none'
        pokemonName.innerHTML = 'Não encontrado';
        pokemonNumber.innerHTML = 'Erro';
        input.value = '';
    }
}


const enviar = (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());    
}

const voltar = () => {
    if (searchPokemon > 1){
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
}

const avancar = () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
}

const brilhar = () => {    
    if (buttonShiny.value === "Shiny: OFF"){
        buttonShiny.value = "Shiny: ON"
    } else {
        buttonShiny.value = "Shiny: OFF"
    }
    renderPokemon(searchPokemon);
}

form.addEventListener('submit', enviar);

buttonPrev.addEventListener('click', voltar);

buttonNext.addEventListener('click', avancar);

buttonShiny.addEventListener('click', brilhar)


renderPokemon(searchPokemon); /* Para começar já chamando um popkemon ao invés de deixar vazio */










