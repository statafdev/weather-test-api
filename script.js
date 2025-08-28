let weather = null;

// async function funzies() {
const funzies = async () => {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=is_day,apparent_temperature,temperature_2m,wind_speed_10m,relative_humidity_2m,wind_direction_10m,rain,cloud_cover,surface_pressure,precipitation&timezone=Europe%2FLondon"
    );

    if (res.ok) {
      weather = await res.json();
      console.log("from results: ", weather);
      display(weather);
    } else {
      throw new Error("http: ", res.status);
    }
  } catch (e) {
    console.error(e);
  }
};

funzies();
const display = (w) => {
  document.getElementById("weather").innerHTML =
    w.current.apparent_temperature + " " + w.current_units.apparent_temperature;

  console.log(w.current.time.trim().split("T"));
  const date = w.current.time.split("T");
  document.getElementById("time").innerHTML = date[0];

  document.getElementById("wind").innerHTML =
    w.current.wind_speed_10m + " " + w.current_units.wind_speed_10m;

  console.log(w.current.wind_direction_10m);

  document.getElementById(
    "direction"
  ).style.transform = `rotate(${w.current.wind_direction_10m}deg)`;
};
