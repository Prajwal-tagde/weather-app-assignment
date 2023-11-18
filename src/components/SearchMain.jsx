import React, { useEffect, useState } from 'react'
import axios from 'axios';
import WeatherDetails from './WeatherDetails';

const GEOCODING_API_URL = import.meta.env.GEOCODING_API_URL;
// const API_KEY = import.meta.env.VITE_API_KEY;
const WEATHER_API_URL = import.meta.env.WEATHER_API_URL;

// let API_KEY = import.meta.env.VITE_API_KEY;

const SearchMain = () => {

  const [cityName, setCityName] = useState("mumbai");
  const [details, setDetails] = useState();
  // console.log(cityName);
 const [info, setInfo] = useState();
  
  const locale = 'en-GB';

  function getFormattedTime(timestamp, locale) {
    
    // Create a date from the timestamp
    const date = new Date(timestamp);

    // Restrict the formatting to hour & minute
    const options = { hour: 'numeric', minute: 'numeric' };

    // Return appropriately formatted time
    return new Intl.DateTimeFormat(locale, options).format(date);

  }


  const getWeatherInfo = async (name, lat, lon) => {
    console.log(name, lat, lon);

    try {
      // https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=5a04db1d894633b7ef4c3de187f5b852

      await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=5a04db1d894633b7ef4c3de187f5b852`)
      .then((data) => {
        console.log(data);
        // console.log(data.data.list);

       const {sunrise, sunset } = data.data.city;
       
        const time = getFormattedTime(1700288121, locale);
        const sunse = getFormattedTime(1700322430, locale);

        // console.log("Time: ", time);
        // console.log("sunset: ", sunse);
        

        const uniqueForecastDays = [];

        const fiveDaysForecast = data.data.list.filter((forecast) => {
            const forecastDate = new Date(forecast.dt_txt).getDate();
            // console.log("date"+forecastDate);

            if(!uniqueForecastDays.includes(forecastDate)){
                return uniqueForecastDays.push(forecastDate);
            }
        })

      // console.log(fiveDaysForecast);
      setDetails(fiveDaysForecast);


      })
      .catch((err) => {
        console.log(err);
      });

      
    } catch (error) {
      console.log(error);
    }
  }

  const getCityCoordinates = async () => {
    try {
      // if(!cityName) return;

      const geo_location_api = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=5a04db1d894633b7ef4c3de187f5b852`; 
      
      await axios(geo_location_api).then((data) => {
        // console.log(data);

        // if(!data.length) return alert(`No coordinates found for ${cityName}`);

        var { name, lat, lon, state, country } = data.data[0];
        
        setInfo(state);

        getWeatherInfo(name, lat, lon);

      })
      .catch((err) => {
        console.log(err);
      });

    } catch (error) {
      console.log(error);
    }
  }

  // useEffect(() => {
  //   getCityCoordinates();
  // }, []);


  return (
    <>
      <div className='search-container'>
        <div className="left">
          <h3>
            <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
              <path d="M16.2188 27.4375V24.9375C17.0938 24.8125 17.9425 24.5729 18.765 24.2188C19.5883 23.8646 20.3646 23.4167 21.0938 22.875L22.9063 24.6875C21.9271 25.4583 20.875 26.0783 19.75 26.5475C18.625 27.0158 17.4479 27.3125 16.2188 27.4375ZM24.6562 22.875L22.9063 21.125C23.4479 20.4375 23.8854 19.6821 24.2188 18.8587C24.5521 18.0362 24.7812 17.1667 24.9062 16.25H27.4688C27.3021 17.5417 26.9846 18.7446 26.5163 19.8587C26.0471 20.9737 25.4271 21.9792 24.6562 22.875ZM24.9062 13.75C24.7812 12.8125 24.5521 11.9321 24.2188 11.1087C23.8854 10.2863 23.4479 9.54167 22.9063 8.875L24.6562 7.125C25.4479 8.04167 26.0888 9.0625 26.5788 10.1875C27.0679 11.3125 27.3646 12.5 27.4688 13.75H24.9062ZM13.7188 27.4375C10.5313 27.0625 7.87 25.6929 5.735 23.3288C3.59917 20.9638 2.53125 18.1875 2.53125 15C2.53125 11.7708 3.59917 8.97917 5.735 6.625C7.87 4.27083 10.5313 2.91667 13.7188 2.5625V5.0625C11.2188 5.41667 9.14583 6.53125 7.5 8.40625C5.85417 10.2812 5.03125 12.4792 5.03125 15C5.03125 17.5 5.85417 19.6875 7.5 21.5625C9.14583 23.4375 11.2188 24.5625 13.7188 24.9375V27.4375ZM21.1562 7.125C20.4062 6.5625 19.6146 6.10417 18.7812 5.75C17.9479 5.39583 17.0938 5.16667 16.2188 5.0625V2.5625C17.4479 2.66667 18.625 2.95292 19.75 3.42125C20.875 3.89042 21.9271 4.52083 22.9063 5.3125L21.1562 7.125ZM15 21.25C13.3125 19.8125 12.0575 18.4842 11.235 17.265C10.4117 16.0467 10 14.9167 10 13.875C10 12.3125 10.5054 11.0679 11.5163 10.1412C12.5262 9.21375 13.6875 8.75 15 8.75C16.3125 8.75 17.4742 9.21375 18.485 10.1412C19.495 11.0679 20 12.3125 20 13.875C20 14.9167 19.5883 16.0467 18.765 17.265C17.9425 18.4842 16.6875 19.8125 15 21.25ZM15 15C15.375 15 15.6929 14.87 15.9537 14.61C16.2137 14.3492 16.3437 14.0312 16.3437 13.6562C16.3437 13.3021 16.2137 12.9896 15.9537 12.7188C15.6929 12.4479 15.375 12.3125 15 12.3125C14.625 12.3125 14.3075 12.4479 14.0475 12.7188C13.7867 12.9896 13.6562 13.3021 13.6562 13.6562C13.6562 14.0312 13.7867 14.3492 14.0475 14.61C14.3075 14.87 14.625 15 15 15Z" fill="#1D2540"/>
              </svg>
            </span>
            {cityName},{info}
          </h3>
          
          <p>27°10'36'' N & 78°0'29'' E</p>
          

        </div>

        <div className="right">
            <input type="text" placeholder='Search Your city here...' 
            value={cityName} onChange={(e) => setCityName(e.target.value) } />

            <button onClick={getCityCoordinates}>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 29 29" fill="none">
                  <path d="M18.7929 16.6517H17.86L17.5294 16.3328C18.7266 14.9442 19.3846 13.1714 19.3833 11.3379C19.3833 9.81986 18.9332 8.3359 18.0898 7.07368C17.2464 5.81147 16.0476 4.82769 14.6451 4.24676C13.2426 3.66582 11.6994 3.51382 10.2105 3.80998C8.72161 4.10614 7.35398 4.83715 6.28055 5.91058C5.20713 6.984 4.47611 8.35163 4.17996 9.84052C3.8838 11.3294 4.0358 12.8727 4.61673 14.2752C5.19766 15.6777 6.18144 16.8764 7.44366 17.7198C8.70587 18.5632 10.1898 19.0133 11.7079 19.0133C13.609 19.0133 15.3567 18.3166 16.7028 17.1594L17.0216 17.4901V18.4229L22.9258 24.3153L24.6852 22.5558L18.7929 16.6517ZM11.7079 16.6517C8.76762 16.6517 6.39414 14.2782 6.39414 11.3379C6.39414 8.39764 8.76762 6.02417 11.7079 6.02417C14.6482 6.02417 17.0216 8.39764 17.0216 11.3379C17.0216 14.2782 14.6482 16.6517 11.7079 16.6517Z" fill="#444444"/>
                </svg>
              </span>
            </button>
        </div>
      </div>

      <div className="separator"></div>

      <WeatherDetails details={details} />
    
    </>
  )
}

export default SearchMain

