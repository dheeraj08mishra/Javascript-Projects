document.addEventListener("DOMContentLoaded", () => {
  console.log("loaded");

  const search = document.getElementById("search_placeholder");
  const showSearchData = document.getElementById("showSearchData");
  document
    .getElementById("search_placeholder")
    .addEventListener("keypress", (event) => {
      //   if (event.key === "Enter") {
      //     console.log("pressed enter");
      //   }
      if (event.key === " ") {
        event.preventDefault();
      }
      if (parseInt(event.key) >= 0 && parseInt(event.key) <= 9) {
        event.preventDefault();
      } else {
        console.log(event.key);
      }
    });
  document.getElementById("search_btn").addEventListener("click", () => {
    console.log("clicked search button");
    showSearchData.innerHTML = "";
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=35af7ff606db422880d141328231305&q=${search.value.trim()}&aqi=no`
    )
      .then((res) => {
        return res.json();
      })
      .then((response) => {
        console.log(response);
        let img = document.createElement("img");
        img.src = response.current.condition.icon;

        let temp = document.createElement("p");
        temp.textContent = "Current Temp:" + response.current.temp_c + "°C";

        let condition = document.createElement("p");
        condition.textContent =
          "Current Condition: " + response.current.condition.text;

        let wind = document.createElement("p");
        wind.textContent = "Wind Speed: " + response.current.wind_kph + " km/h";

        let region = document.createElement("h4");
        region.textContent = "Region: " + response.location.region;

        let country = document.createElement("h3");
        country.textContent = "Country: " + response.location.country;

        showSearchData.appendChild(img);
        showSearchData.appendChild(temp);
        showSearchData.appendChild(condition);
        showSearchData.appendChild(wind);
        showSearchData.appendChild(region);
        showSearchData.appendChild(country);
      })
      .catch((error) => {
        console.log(error);
      });
  });
});
