const cityName = document.getElementById("cityName");
const search = document.getElementById("search");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity")
const wind = document.getElementById("wind");

const container = document.querySelector('.container');
const weatherBox = document.querySelector('.container__weatherBox');
const weatherDetails = document.querySelector('.container__weatherDetails');
const notFound = document.querySelector(".container__notFound");
const image = document.querySelector(".container__weatherBox img");


search.addEventListener("click", () => {
    if(cityName.value === '')
        return;

    const APIKEY = "9fd8c3eb38bdd8f6428ae4a612d2393d";
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&units=metric&lang=pt_br&appid=${APIKEY}`

    fetch(URL)
        .then((response) => response.json())
        .then((json) => {
            if(json.cod === "404"){
                container.style.height = "400px";
                weatherBox.style.display = "none";
                weatherDetails.style.display = "none"
                notFound.style.display = "flex";
                notFound.classList.add("container__fadeIn")
                return;
            }else{
                notFound.style.display = "none";
                notFound.classList.remote = "container__fadeIn";
                container.classList.add("container__fadeIn");
                weatherBox.style.display = "flex";
                weatherDetails.style.display = "flex";

                switch(json.weather[0].main){
                    case "Rain":
                        image.src = "./images/rain.png";
                        break;
                    case "Clear":
                        image.src = "./images/clear.png";
                        break;
                    case "Clouds":
                        image.src = "./images/cloud.png";
                        break;
                    case "Haze":
                        image.src = "./images/mist.png";
                        break;
                    case "Snow":
                        image.src = "./images/snow.png";
                        break;
                    default:
                        image.src = "";
                }
                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.textContent = json.weather[0].description;
                humidity.textContent = `${json.main.humidity}%`;
                wind.textContent = `${parseInt(json.wind.speed)} Km/h`;

                weatherBox.classList.add("container__fadeIn");
                weatherDetails.classList.add("container__fadeIn");
                container.style.height = "600px";
            }

        })
        .catch((e) =>{
            console.error("Error: " + e);
        });
})