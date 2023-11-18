import React from 'react'

const WeatherDetails = ({ details }) => {

// console.log("details: ");

// console.log(details);

  

  return (
    <div className='weather-details'>
        <div className="left">
            <p>Select Date: </p>
            <input type="date" ></input>

            <div className="content">
                <h4>High Temparature</h4>
                <h4>Low Temparature</h4>
                <h4>Humidity</h4>
                <h4>Sunrise Time</h4>
                <h4>Sunset Time</h4>
            </div>
        </div>

        <div className="right">
            <div className="cards">

              {
                details?.filter((fil, i) => i < 5).map((item, index) => {

                  const date = item.dt_txt.split(" ")[0];
                  const humidity = item.main.humidity;
                  const temp_min = item.main.temp_min;

                  return (
                    <div className="card" key={index}>
                                <h3>{date}</h3>
                                <div className="content">
                                    <div className="icon">
                                         <img src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                          alt="weather-icon"  />
                                        <h4>{item.weather[0].description}</h4>
                                    </div>
                                    <div className="content-separator"></div>
                                    
                                    <div className="details">
                                        <h4>23°C / 63°F</h4>
                                        <h4>17°C / 43°F</h4>
                                        <h4>{humidity}%</h4>
                                        <h4>06:21 AM</h4>
                                        <h4>05:93 PM</h4>
                                    </div>
                                </div>
                            </div>
                   )
                })
              }    
                          

                            {/* <ul>
                              {
                                details?.map((item, i) => {
                                  return <li key={i}>{item.dt_txt.split(" ")[0]}</li>
                                })
                              }
                            </ul> */}
                
            </div>
        </div>
    </div>
  )
}

export default WeatherDetails

