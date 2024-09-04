const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const msg1 = document.querySelector("#msg1");
const msg2 = document.querySelector("#msg2");


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const location = search.value;
    let url = `http://localhost:3000/weather?address=${location}`;

    msg1.textContent = "Loading Forecast...";
    msg2.textContent = "";

    fetch(url).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            msg1.textContent = "";
            msg2.textContent = data.error;
            return;
        }
        msg1.textContent = data.location;
        msg2.textContent = data.forecast;
    });
});
});