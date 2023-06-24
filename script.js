      // Array di oggetti per i personaggi
      const characters = [
        { id: 1, name: "Harry Potter", category: "magician", gender: "male" },
        { id: 2, name: "Hermione Granger", category: "magician", gender: "female" },
        { id: 3, name: "Ron Weasley", category: "magician", gender: "male" },
        { id: 4, name: "Gandalf", category: "magician", gender: "male" },
        { id: 5, name: "Aragorn", category: "adventurer", gender: "male" },
        { id: 6, name: "Lara Croft", category: "adventurer", gender: "female" },
      ];

      const charactersContainer = document.getElementById("charactersContainer");
      const searchInput = document.getElementById("searchInput");
      const filterCategory = document.getElementById("filterCategory");
      const filterGender = document.getElementById("filterGender");

      // mostrare i personaggi
      const showCharacters = (charactersToShow) => {
        charactersContainer.innerHTML = "";

        if (charactersToShow.length > 0) {
          charactersToShow.forEach((character) => {
            const card = document.createElement("div");
            card.classList.add("card");

            // Creazione dei paragrafi per i dettagli del personaggio
            const name = document.createElement("p");
            name.textContent = `Nome: ${character.name}`;
            card.appendChild(name);

            const category = document.createElement("p");
            category.textContent = `Categoria: ${character.category}`;
            card.appendChild(category);

            const gender = document.createElement("p");
            gender.textContent = `Genere: ${character.gender}`;
            card.appendChild(gender);

          // Aggiunta della carta al contenitore dei personaggi
          charactersContainer.appendChild(card);
          });
        } else {
          // Messaggio di nessun risultato
          const noResults = document.createElement("div");
          noResults.textContent = "Nessun risultato trovato.";
          charactersContainer.appendChild(noResults);
        }
      };

      // filtrare i personaggi
      const filterCharacters = () => {
        const searchTerm = sanitizeInput(searchInput.value.toLowerCase());
        const selectedCategory = filterCategory.value;
        const selectedGender = filterGender.value;

        const filteredCharacters = characters.filter((character) => {
          const nameMatches = character.name.toLowerCase().includes(searchTerm);
          const categoryMatches =
            selectedCategory ? character.category === selectedCategory : true;
          const genderMatches = selectedGender ? character.gender === selectedGender : true;

          return nameMatches && categoryMatches && genderMatches;
        });

        showCharacters(filteredCharacters);
      };

      // sanificare l'input di ricerca
      const sanitizeInput = (input) => {
        const sanitizedInput = input.replace(/[^a-z]/g, "");
        const maxLength = 15;
        const truncatedInput = sanitizedInput.slice(0, maxLength);

        return truncatedInput;
      };

      // listener per l'evento "change" dei filtri
      filterCategory.addEventListener("change", filterCharacters);
      filterGender.addEventListener("change", filterCharacters);

      // ripristinare la visualizzazione di tutte le carte
      const resetSearch = () => {
        if (searchInput.value === "") {
          showCharacters(characters);
        }
      };

      // listener per l'evento "input" dell'input di ricerca
      searchInput.addEventListener("input", filterCharacters);

       // Mostra tutti i personaggi inizialmente
       showCharacters(characters);
