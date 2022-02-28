let pokemonRepository = (function () {
  let repository = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  //adds a pokemon to the list
  function add(pokemon) {
    repository.push(pokemon);
  }

  //gets the pokemon list
  function getAll() {
    return repository;
  }

  //logs pokemon name when clicked
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
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

  function showLoadingMessage() {
    let loadingLocation = document.querySelector(".title");
    let loadingMessage = document.createElement("p");
    loadingMessage.classList.add("load-message");
    loadingMessage.innerHTML = "Loading";
    loadingLocation.appendChild(loadingMessage);
  }

  function hideLoadingMessage() {
    let loadingLocation = document.querySelector(".title");
    let loadingMessage = document.querySelector(".load-message");
    loadingLocation.removeChild(loadingMessage);
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })

      .then(function (json) {
        hideLoadingMessage();
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        hideLoadingMessage();
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    showDetails: showDetails,
    loadList: loadList,
    loadDetails: loadDetails,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
  };
})();

//actually makes the respository full of pokemon
pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
