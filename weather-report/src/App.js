import { useEffect, useState } from "react";
const initialCities = [{ name: "JinHua" }];

export default function App() {
  const apiKey = "d6d43386b6d746d382d4d552af6bc774";
  const apiUrl = `https://api.weatherbit.io/v2.0/current?key=${apiKey}&lang=zh&units=M&city=`;

  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState(initialCities);
  const [showForm, setShowForm] = useState(false);
  const [info, setInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(
    function () {
      async function getWeather() {
        if (!selectedCity) return;
        const URL = apiUrl + `${selectedCity.name}`;
        // console.log(selectedCity.name);
        setIsLoading(true);
        setInfo("");

        // fetch(URL)
        //   .then((response) => response.json())
        //   .then((data) => {
        //     setInfo(data.data[0]);
        //   })
        //   .catch((error) => console.error("fetch error", error))
        //   .finally(() => {
        //     setIsLoading(false);
        //     console.log(info);
        //   });

        try {
          const response = await fetch(URL);
          const data = await response.json();
          setInfo(data.data[0]);
        } catch (error) {
          console.error("fetch error", error);
        } finally {
          setIsLoading(false);
        }
      }
      getWeather();
      return function () {
        setInfo("");
        setIsLoading(false);
      };
    },
    [apiUrl, selectedCity]
  );

  function handleSelect(city) {
    setSelectedCity(city);
    setShowForm(false);
  }

  function handleShowForm() {
    setShowForm((cur) => !cur);
    setSelectedCity("");
  }

  function handleAddCity(newCity) {
    const cityExists = cities.some(
      (city) => city.name.toLowerCase() === newCity.name.toLowerCase()
    );
    if (cityExists) {
      setAdded(true);
      return;
    }

    setCities((cities) => [...cities, newCity]);
    // console.log(cities);
    setShowForm(false);
    setAdded(false);
  }

  return (
    <div>
      <Cities
        cities={cities}
        showForm={showForm}
        onShowForm={handleShowForm}
        onSelect={handleSelect}
      />
      {!showForm && selectedCity && isLoading && <Loader />}
      {showForm && <FormAddCity onAddCity={handleAddCity} added={added} />}
      {!showForm && !isLoading && info && <Weather info={info} />}
      {!showForm && selectedCity && !isLoading && !info && <Error />}
    </div>
  );
}

function Error() {
  return (
    <div>
      <p className="error" style={{ color: "red" }}>
        Fetch error!
      </p>
    </div>
  );
}

function Loader() {
  return <div className="loader">Loading...</div>;
}

function Cities({ cities, onShowForm, showForm, onSelect }) {
  return (
    <div className="cities">
      <h2>View Cities</h2>
      <ul>
        {cities.map((city) => (
          <City city={city} key={city.name} onSelect={() => onSelect(city)} />
        ))}
      </ul>
      <Button onclick={onShowForm}>{showForm ? "Close" : "Add City"}</Button>
      <Button onclick={() => console.log(cities)}>
        Show Cities(see the console)
      </Button>
    </div>
  );
}

function City({ city, onSelect }) {
  return (
    <div className="city">
      <li>
        <span>{city.name} </span>
        <Button onclick={onSelect}>Select</Button>
      </li>
    </div>
  );
}

function Weather({ info }) {
  const { city_name, temp, wind_spd, sunrise, sunset } = info;
  return (
    <div className="weather">
      <h2>{city_name} Weather Info</h2>
      <p>Temperature: {temp} ℃</p>
      <p>Wind_spd: {wind_spd}</p>
      <p>Sunrise: {sunrise}</p>
      <p>Sunset: {sunset}</p>
    </div>
  );
}

function FormAddCity({ onAddCity, added }) {
  const [newCityName, setNewCityName] = useState("");
  const newCity = {
    name: newCityName,
  };

  return (
    <div className="form">
      <h2>Add City</h2>
      <label>City Name: </label>
      <input
        type="text"
        placeholder="Enter City Name"
        value={newCityName}
        onChange={(e) => {
          setNewCityName(e.target.value);
          // console.log(newCity);
        }}
      />
      <Button
        onclick={() => {
          onAddCity(newCity);
          setNewCityName("");
        }}
      >
        Add
      </Button>
      {added && <p style={{ color: "red" }}>You have added this city!</p>}
    </div>
  );
}

function Button({ children, onclick }) {
  return (
    <button onClick={onclick} className="button">
      {children}
    </button>
  );
}
