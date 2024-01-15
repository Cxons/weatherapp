import { React, useState, useEffect } from "react";
import searchImage from "./Images/icons8-search.gif";
import rainyImage from "./Images/weatherIcon/icons8-cloud-lightning-48.png";
import sunnyImage from "./Images/weatherIcon/icons8-summer-48.png";
import locationImage from "./Images/icons8-location-50.png";
import Search from "./search";

export default function App() {
  const [input, setInput] = useState("");
  const [search, setSearch] = useState(false);
  const [result, setResult] = useState("");
  const [display, setSearchDisplay] = useState("");
  const [locationResult, setlocationResult] = useState();
  const [locationDisplay, setLocationDisplay] = useState(null);
  const [displayDecider, setdisplayDecider] = useState(true);
  useEffect(() => {
    async function getCoordinates() {
      try {
        //converting input to long and lat
        const geoCodingDataFetch = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${input}&count=10&language=en&format=json`
        );
        const actualData = await geoCodingDataFetch.json();
        // end of converting

        //getting the real result
        const getCurrentData = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${actualData.results[0].latitude}&longitude=${actualData.results[0].longitude}&hourly=temperature_2m&current_weather=true`
        );
        const actualCurrentData = await getCurrentData.json();
        //end of getting real result lol
        setResult(actualCurrentData.current_weather.temperature);
        setSearchDisplay(actualData.results[0].name);
        //getting user location
        const userLocation = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${locationResult.latitude}&longitude=${locationResult.longitude}&hourly=temperature_2m&current_weather=true`
        );
        const userLocationData = await userLocation.json();
        setLocationDisplay(userLocationData.current_weather.temperature);
        //userLocationData.current_weather.temperature
        //actualCurrentData.current_weather.temperature
      } catch (err) {
        console.log(err);
      }
    }
    getCoordinates();
  }, [search]);

  function handleSearch() {
    setSearch((prev) => !prev);
  }
  function handleInputChange(e) {
    setInput(e.target.value);
  }
  function getLocation() {
    setdisplayDecider((prev) => !prev);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setlocationResult(position.coords);
        console.log(position.coords.latitude);
      },
      () => alert("Cannot access Location")
    );
  }

  return (
    <div className="bg-gradient-to-tr from-red-500  to-lime-400 min-h-screen flex flex-col items-center w-full">
      <Search
        search={handleSearch}
        image={locationImage}
        location={getLocation}
        locationImg={searchImage}
        inputChange={handleInputChange}
      />
      {result ? (
        <div>
          <img
            src={result > 25 ? sunnyImage : rainyImage}
            className="h-[10rem] w-[10rem] mt-24"
          />
        </div>
      ) : null}
      {result ? (
        displayDecider ? (
          <div className="text-center text-8xl mt-[3rem] ">{`${JSON.stringify(
            result,
            null,
            2
          )}℃`}</div>
        ) : (
          <div className="text-center text-8xl mt-[3rem] ">
            {locationDisplay && `${JSON.stringify(locationDisplay, null, 2)}℃`}
          </div>
        )
      ) : null}
      {display ? (
        locationDisplay ? (
          <div className="text-center text-6xl mt-[1rem]">Your Location</div>
        ) : (
          <div className="text-center text-6xl mt-[1rem]">{display}</div>
        )
      ) : null}
      <div>{locationDisplay}</div>
    </div>
  );
}
//℃
