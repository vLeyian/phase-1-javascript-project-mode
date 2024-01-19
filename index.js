const form = document.querySelector("#Ace-form");
const list = document.querySelector("#aircraft-list");
const repo = document.querySelector("#info-list");

function renderAircraft(aircraftData) {
    let card = document.createElement('li');
    card.className = 'card'
    card.innerHTML = `<h2> ${aircraftData.designation}</h2>
        <img
            src="${aircraftData.image}"
            alt="${aircraftData.name}"
        />

        <div class="content">
            <button>${aircraftData.name} Profile</button>
        </div>
    `

    card.querySelector("button").addEventListener('click', (e) => handleClick(aircraftData), {once: true});

    list.appendChild(card);

}

function handleClick(aircraftData) {
    fetch(`http://localhost:3000/Aircraft/${aircraftData.id}`)
        .then((response) => response.json())
        .then(data => renderInfo(data))
}

function renderInfo(aircraft) {
    let info = document.getElementById("info-list");
    const li = document.createElement('li');
   
    li.innerHTML = `<h2>${aircraft.sortie}</h2>
        <h3>${aircraft.description}</h3>
    `
    info.append(li);

}

function getAircraft() {
    console.log("hello")
    fetch(`http://localhost:3000/Aircraft`)
    .then((response) => response.json())
    .then((data) => {
        data.forEach(renderAircraft)
    });
}


const init = () => {
    getAircraft();

    const form = document.querySelector("#Ace-form");
    const list = document.querySelector("#aircraft-list");
    const info = document.querySelector("#info-list");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const input = document.querySelector("input#search");
        list.innerHTML = "";
        info.innerHTML = "";

        fetch(`http://localhost:3000/Aircraft/${input.value}`)
            .then((response) => response.json())
            .then(renderAircraft);
    });
};

document.addEventListener("DOMContentLoaded", init);