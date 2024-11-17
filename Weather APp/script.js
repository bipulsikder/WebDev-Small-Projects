const apikey = "0e9bef886f7bd2c4c6054600be6616c6";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");
const searchbtn = document.querySelector(".search button");

async function fetchData(city) {
  try {
    const response = await fetch(`${apiurl}${city}&appid=${apikey}`);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = data.main.temp + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";
  } catch (error) {
    console.error(error);
    document.querySelector(".city").innerHTML = "City not found!";
    document.querySelector(".temp").innerHTML = "-";
    document.querySelector(".humidity").innerHTML = "-";
    document.querySelector(".wind").innerHTML = "-";
  }
}

searchbtn.addEventListener("click", () => {
  const city = searchbox.value.trim();
  if (city) {
    fetchData(city);
  } else {
    alert("Please enter a city name.");
  }
});

// Add functionality to trigger search with Enter key
searchbox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") { // Check if the pressed key is Enter
    const city = searchbox.value.trim();
    if (city) {
      fetchData(city);
    } else {
      alert("Please enter a city name.");
    }
  }
});