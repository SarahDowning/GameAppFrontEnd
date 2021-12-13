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

                const gameTitle = document.createElement("p");
                gameTitle.innerText = `Game Title: ${game.gameTitle}`;
                gameContainer.appendChild(gameTitle);

                const genre = document.createElement("p");
                genre.innerText = `Genre: ${game.genre}`;
                gameContainer.appendChild(genre);

                const platform = document.createElement("p");
                platform.innerText = `Platform: ${game.platform}`;
                gameContainer.appendChild(platform);

                const publisher = document.createElement("p");
                publisher.innerText = `Publisher: ${game.publisher}`;
                gameContainer.appendChild(publisher);

                const releaseYear = document.createElement("p");
                releaseYear.innerText = `Release Year: ${game.releaseYear}`;
                gameContainer.appendChild(releaseYear);

                getOutput.appendChild(gameContainer);
            }
        })
        .catch(err => console.error(err));
}

document.querySelector("button#getAll").addEventListener("click", getAllGames);

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

// Delete request

// const deleteGame = document.createElement("button");
// deleteGame.innerText = "Delete";
// deleteGame.classList.add("btn");
// deleteGame.addEventListener("click", () => {
//     axios
//     .delete(`${gameApplication}/delete/${game.id}`)
//     .then(res => getAllGames())
//     .catch(err => console.error(err))
// });
// getOutput.appendChild(deleteGame);


// document.querySelector("#deleteGameForm").addEventListener("submit", function(event) {
//     event.preventDefault();

//     const form = event.target;
//     const gameId = form.gameId.value;
    
//     axios
//         .delete(`${gameApplication}/delete/${gameId}`)
//         .then(res => {
//             console.log(res)
//             form.reset();
//             form.gameId.focus();
//             getAllGames();
//         }).catch(err => console.error(err));
//     });
