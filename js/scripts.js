let pokemonRepository = (function () {
  let repository = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector(".modal-container");

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
      showModal(pokemon);
    });
  }

  function properCasing(item) {
    return item.charAt(0).toUpperCase() + item.slice(1);
  }

  function showModal(pokemon) {
    let modalContainer = document.querySelector(".modal-container");
    modalContainer.innerHTML = "";

    //creates modal
    let modal = document.createElement("div");
    modal.classList.add("modal");
    modalContainer.classList.add("is-visible");

    //creates pokemon name
    let pokemonName = document.createElement("h1");
    pName = properCasing(pokemon.name);
    pokemonName.innerText = pName;
    pokemonName.classList.add("pokemon-name");

    //creates pokemon image
    let pokemonImage = document.createElement("img");
    pokemonImage.src = pokemon.imageUrl;
    pokemonImage.classList.add("pokemon-image");

    //creates pokemon height
    let pokemonHeight = document.createElement("p");
    let pHeightCm = pokemon.height * 10;
    pokemonHeight.innerText = `Height: ${pHeightCm} cm`;
    pokemonHeight.classList.add("pokemon-height");

    //creates type(s) of pokemon list
    let pokemonTypesLocation = document.createElement("p");
    let pokemonTypes = pokemon.types;
    let pokemonTypesList = "";
    if (!pokemonTypes) {
      pokemonTypesList = "None";
    } else {
      let firstType = properCasing(pokemonTypes[0].type.name);
      pokemonTypesList += `${firstType}`;
      for (i = 1; i < pokemonTypes.length; i++) {
        let type = properCasing(pokemonTypes[i].type.name);
        pokemonTypesList += `, ${type}`;
      }
    }
    let formatType = pokemonTypes.length < 2 ? "Type: " : "Types: ";
    pokemonTypesLocation.innerText = `${formatType}${pokemonTypesList}`;
    pokemonTypesLocation.classList.add("pokemon-types");

    //close button for modal
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    //appends all creations from above
    modalContainer.appendChild(modal);
    modal.appendChild(pokemonName);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonTypesLocation);
    modal.appendChild(pokemonImage);
    modal.appendChild(closeButtonElement);
    console.log(pokemon);
  }

  function hideModal() {
    let modalContainer = document.querySelector(".modal-container");
    modalContainer.classList.remove("is-visible");
  }

  //exits modal when clicking outside area
  modalContainer.addEventListener("click", (e) => {
    // Since this is also triggered when clicking INSIDE the modal container,
    // We only want to close if the user clicks directly on the overlay
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  //exits modal when pressing "escape key" and the modal is currently open
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  //adds a click listener and when a pokemon button is pressed it shows pokemon name
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
    pokemonName = properCasing(pokemon.name);
    button.innerText = pokemonName;
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
