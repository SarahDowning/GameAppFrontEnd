"Use strict"

const gameApplication = "http://localhost:8080"
const getOutput = document.querySelector("#getOutput");

// Get All games request
const getAllGames = () => {
    
    axios
        .get(`${gameApplication}/getAll`)
        .then(res => {
            console.log(res);

            const games = res.data;
            getOutput.innerHTML = "";
            for (let game of games) {
                const gameContainer = document.createElement("div");
                gameContainer.classList.add("column");

                const gameList = document.createElement("div");
                gameList.classList.add("card");

                const gameBody = document.createElement("div");
                gameBody.classList.add("card-body");

                const gameTitle = document.createElement("p");
                gameTitle.classList.add("card-title");
                gameTitle.innerText = `Game Title: ${game.gameTitle}`;
                gameBody.appendChild(gameTitle);

                const genre = document.createElement("p");
                genre.classList.add("card-text");
                genre.innerText = `Genre: ${game.genre}`;
                gameBody.appendChild(genre);

                const platform = document.createElement("p");
                platform.classList.add("card-text");
                platform.innerText = `Platform: ${game.platform}`;
                gameBody.appendChild(platform);

                const publisher = document.createElement("p");
                publisher.classList.add("card-text");
                publisher.innerText = `Publisher: ${game.publisher}`;
                gameBody.appendChild(publisher);

                const releaseYear = document.createElement("p");
                releaseYear.classList.add("card-text");
                releaseYear.innerText = `Release Year: ${game.releaseYear}`;
                gameBody.appendChild(releaseYear);

                const deleteGame = document.createElement("button");
                deleteGame.innerText = "Delete";
                deleteGame.classList.add("btn", "btn-dark");
                deleteGame.addEventListener("click", () => {
                    axios
                    .delete(`${gameApplication}/delete/${game.id}`)
                    .then(res => getAllGames())
                    .catch(err => console.error(err))
                });

                gameBody.appendChild(deleteGame);
                gameList.appendChild(gameBody)
                gameContainer.appendChild(gameList);

                getOutput.appendChild(gameContainer);
                
            }
        })
        .catch(err => console.error(err));
}

getAllGames();

document.querySelector("button#getAll").addEventListener("click", getOutput);

// Post request for create
document.querySelector("#addGameForm").addEventListener('submit', function(event) {
    event.preventDefault();

    const form = event.target;
    const gameData = {
        gameTitle: form.gameTitle.value,
        genre: form.genre.value,
        platform: form.platform.value,
        publisher: form.publisher.value,
        releaseYear: form.releaseYear.value
    };

    console.log(gameData);

    axios
        .post(`${gameApplication}/create`, gameData)
        .then((res) => {
            form.reset();
            form.gameTitle.focus();
            console.log(res);
        }).catch(err => console.error(err));
});