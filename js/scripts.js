let pokemonRepository = (function () {
  //list of pokemon
  let pokemonList = [
    {
      name: "Weedle",
      number: 13,
      height: 1.0,
      types: ["Bug", "Poison"],
      weaknesses: ["Fire", "Psychic", "Flying", "Rock"],
    },
    {
      name: "Jigglypuff",
      number: 39,
      height: 1 + 2 / 3,
      types: ["Normal", "Fairy"],
      weaknesses: ["Steel", "Poison"],
    },
    {
      name: "Poliwag",
      number: 60,
      height: 2.0,
      types: ["Water"],
      weaknesses: ["Grass", "Electric"],
    },
  ];

  //adds a pokemon to the list
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  //gets the pokemon list
  function getAll() {
    return pokemonList;
  }

  //logs pokemon name when clicked
  function showDetails(pokemon) {
    console.log(pokemon.name);
  }

  //adds a click listener when a pokemon button is pressed and shows pokemon name
  function addListener(button, pokemon) {
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  //creates a button list of pokemon
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    addListener(button, pokemon);
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
  };
})();

//actually makes the respository full of pokemon
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});
