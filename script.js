let weather = null;

const funzies = async () => {
  try {
    const res = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=is_day,apparent_temperature,temperature_2m,wind_speed_10m,relative_humidity_2m,wind_direction_10m,rain,cloud_cover,surface_pressure,precipitation&timezone=Europe%2FLondon"
    );

    if (res.ok) {
      weather = await res.json();
      console.log("results: ", weather);
      display(weather);
    } else {
      throw new Error("http: ", res.status);
    }
  } catch (e) {
    console.error(e);
  }
};

funzies();
console.log("from global : ", weather);

const display = (w) => {
  document.getElementById("weather").innerHTML =
    w.current.apparent_temperature + " " + w.current_units.apparent_temperature;

  const date = w.current.time.split("T");
  document.getElementById("time").innerHTML = date[0];
};
