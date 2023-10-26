const typeColors = {
    grass: '#78C850',
    fire: '#F08030',
    water: '#6890F0',
    flying: '#87CEFA',
    fighting: '#A52A2A',
    poison: '#8B008B',
    electric: '#FFFF00',
    ground: '#CD853F',
    rock: '#DEB887',
    psychic :'#BA55D3',
    ice: '#00FFFF',
    bug: '#ADFF2F',
    ghost: '#4B0082',
    steel: '#778899',
    dragon: '#8A2BE2',
    dark: '#1C1C1C',
    fairy: '#FF1493',
};

const pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon/';
const totalPokemon = 1208;
 
window.onload = () => {
  fetchPokemonSequentially(1);
};
 
async function fetchPokemonSequentially(id) {
  if (id <= totalPokemon) {
    try {
      const response = await fetch(`${pokeApiUrl}${id}`);
      if (!response.ok) {
        throw new Error(`Não foi possível encontrar o Pokémon com o ID: ${id}`);
      }
      const data = await response.json();
      displayPokemonInfo(data);
      fetchPokemonSequentially(id + 1);
    } catch (error) {
      console.error('Ocorreu um erro ao buscar os dados do Pokémon:', error);
    }
  }
}
 
function displayPokemonInfo(pokemon) {
  const pokeList = document.getElementById('poke-list');
  const pokeCard = document.createElement('div');
  pokeCard.classList.add('poke-card');

  const types = pokemon.types.map((type) => type.type.name).join(', ');

 
 const backgroundColor = typeColors[pokemon.types[0].type.name] || '#ccc';

 pokeCard.style.backgroundColor = backgroundColor;

 pokeCard.innerHTML = `
     <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
     <h3 class="bran">${pokemon.name}</h3>
     <p class="bran">Tipos: ${types}</p>
  
  `;
  pokeList.appendChild(pokeCard);
}





searchButton.addEventListener('click', () => {
    const pokemonName = searchInput.value.trim().toLowerCase();

    // Use a API do PokeAPI para buscar informações do Pokémon
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => response.json())
        .then((data) => {
            // Processar os dados do Pokémon e exibi-los na página
            const pokemonName = data.name;
            const pokemonTypes = data.types.map((type) => type.type.name);
            const pokemonImage = data.sprites.front_default;
            

            const typeColorsApplied = pokemonTypes.map((type) => {
            const colorClass = `type-${type}`; // Classe CSS correspondente ao tipo
            return `<span class="${colorClass}">${type}</span>`;
            }).join(' ');
            

            // Mapeie as habilidades
            const abilities = data.abilities.map((ability) => ability.ability.name).join(', ');

            

            const pokemonHTML = `
                <div>
                    <div class="carta">
                    <div class="img">
                    <img class="cent bran" src="${pokemonImage}" alt="${pokemonName}">
                    </div>
                    <h2 class="nome bran">${pokemonName}</h2>
                    <div class="tipo">
                    <p class="cen bran">Tipo(s): ${typeColorsApplied}</p>
                    <p class="lado1 bran">Height: ${data.height}</p>
                    <p class="lado bran">Weight: ${data.weight}</p>
                    <p class="habilidades">Habilidades: ${abilities}</p> <!-- Exibindo as habilidades -->
                    </div>
                    
                    </div>
                    
                </div>
            `;

            pokemonInfo.innerHTML = pokemonHTML;
        })
        .catch((error) => {
            console.error(error);
            pokemonInfo.innerHTML = 'Pokémon não encontrado.';
        });
});
// Função para adicionar uma pesquisa ao histórico
function addToSearchHistory(pokemonName) {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    // Verifique se o Pokémon já existe no histórico
    if (!searchHistory.includes(pokemonName)) {
        searchHistory.push(pokemonName);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
}

// Função para exibir o histórico de pesquisas
function displaySearchHistory() {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    if (searchHistory.length > 0) {
        const historyList = document.getElementById('searchHistoryList');
        historyList.innerHTML = '';

        searchHistory.forEach((search, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = search;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.addEventListener('click', () => {
                // Chame a função para remover a pesquisa do histórico
                removeFromSearchHistory(index);
            });

            listItem.appendChild(removeButton);
            historyList.appendChild(listItem);
        });
    }
}

searchButton.addEventListener('click', () => {
    const pokemonName = searchInput.value.trim().toLowerCase();

    // Adicione a pesquisa atual ao histórico
    addToSearchHistory(pokemonName);

    // Restante do código de pesquisa
    // ...

    displaySearchHistory(); // Atualize a exibição do histórico
});

function removeFromSearchHistory(index) {
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

    if (index >= 0 && index < searchHistory.length) {
        searchHistory.splice(index, 1);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
        displaySearchHistory(); // Atualize a exibição do histórico após a remoção
    }
}

