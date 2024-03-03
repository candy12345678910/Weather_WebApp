import React, { useState } from "react";
import "./Weather.css";
import location from "./img/location.png";
import humid_img from "./img/humid.png";
import wind_img from "./img/wind.png";
import cloud_img from "./img/cloud.png";
import sunrise_img from "./img/sunrise.png";
import sunset_img from "./img/sunset.png";
import mascot from "./img/mascot.png";
import clear_day from "./img/clear.png";
import clear_night from "./img/clear_night.png";
import all_cloud from "./img/cloud.png";
import heavy_rain from "./img/heavy_rain.png";
import thunder_storm from "./img/thunder_storm.png";
import mist from "./img/mist.png";
import snow from "./img/snow.png";




const Weather=()=>{
    const [wicon,seticon] = useState(mascot);
    const [city,setcity]=useState("Location");
    const [temp,settemp]=useState("--");
    const [feel,setfeel]=useState("--");
    const [weather,setweather]=useState("Weather");
    const [humid,sethumid]=useState("--");
    const [wind,setwind]=useState("--");
    const [cloud,setcloud]=useState("--");
    const [sunrise,setsunrise]=useState("--:--:-- AM");
    const [sunset,setsunset]=useState("--:--:-- PM");
   
    const search=async ()=>{
        const location=document.getElementById("search");
        const body = document.getElementById("body");
        const contain = document.getElementById("contain");
        const searchbutton = document.getElementById("button");
        try{
            if(location.value===""){
                return 0;
            }
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${location.value}&units=Metric&appid=${process.env.REACT_APP_KEY}`;

            const response=await fetch(url);
            const data=await response.json();

            let sun=`https://api.sunrise-sunset.org/json?lat=${data.coord.lat}&lng=${data.coord.lat}`;

            const res = await fetch(sun);
            const result = await res.json();
            
            sethumid(data.main.humidity);
            setwind(Math.floor(data.wind.speed));
            setcloud(data.clouds.all);
            setsunrise(result.results.sunrise);
            setsunset(result.results.sunset);
            setweather(data.weather[0].main);
            setcity(data.name);
            settemp(Math.floor(data.main.temp));
            setfeel(Math.floor(data.main.feels_like));

            if(data.weather[0].icon === "01n" || data.weather[0].icon === "02n" || data.weather[0].icon === "03n" || data.weather[0].icon === "04n" || data.weather[0].icon === "09n" || data.weather[0].icon === "10n" || data.weather[0].icon === "11n" || data.weather[0].icon === "13n" || data.weather[0].icon === "50n"){
                body.style.backgroundColor = "rgba(224, 158, 255, 0.644)";
                contain.style.backgroundImage = "linear-gradient(to left bottom,rgb(17, 7, 73),rgb(70, 30, 165),rgb(202, 111, 255))";
                searchbutton.style.backgroundColor = "rgba(83, 0, 207, 0.644)";
            }
            else{
                body.style.backgroundColor = "rgba(158, 200, 255, 0.644)";
                contain.style.backgroundImage = "linear-gradient(to left bottom,rgb(10, 39, 94),rgb(39, 88, 179),rgb(88, 187, 253))";
                searchbutton.style.backgroundColor = "rgba(36, 71, 146, 1)";
            }
            
            if(data.weather[0].icon === "01n"){
                seticon(clear_night);
            }
            else if(data.weather[0].icon === "01d"){
                seticon(clear_day);
            }
            else if(data.weather[0].icon === "02d" || data.weather[0].icon === "02n" || data.weather[0].icon === "03d" || data.weather[0].icon === "03n" || data.weather[0].icon === "04d" || data.weather[0].icon === "04n"){
                seticon(all_cloud);
            }
            else if(data.weather[0].icon === "09d" || data.weather[0].icon === "09n" ||data.weather[0].icon === "10d" || data.weather[0].icon === "10n"){
                seticon(heavy_rain);
            }
            else if(data.weather[0].icon === "11d" || data.weather[0].icon === "11n"){
                seticon(thunder_storm);
            }
            else if(data.weather[0].icon === "13d" || data.weather[0].icon === "13n"){
                seticon(snow);
            }
            else if(data.weather[0].icon === "50d" || data.weather[0].icon === "50n"){
                seticon(mist);
            }            
        }
        catch(e){
            alert("Sorry!! we don't have information");
            // alert(e);
        }
    }
    
    return(
        <div id="body" className="body">
            <div id="contain" className="contain">
                <p className="heading">Weather</p>
                {/* search div */}
                <div className="search-box">   
                    <input className="search" id="search" placeholder="Enter Location" ></input>
                    <button className="button" id="button" onClick={search}>Search</button>
                </div>

                {/* location */}
                <div className="location_box">
                    <img className="location" src={location} alt="img"></img>
                    <p id="city" className="city">{city}</p>
                    <p id="haze" className="haze">{weather}</p>
                </div>
                <img className="temp-pic" src={wicon} alt="pic"></img>
                {/* temperature div */}
                <div className="temp-box">
                    <p className="temp"><span id="temp">{temp}</span>°c</p>
                    <p className="feel">Feels Like <span id="feel">{feel}</span>°c</p>
                </div>

                {/* List */}
                <ul className="list-box">
                    <li><h4><img className="list_image" src={humid_img} alt="pic"></img>Humidity:</h4> <h4><span id="humid">{humid}</span>%</h4> </li><hr></hr>
                    <li><h4><img className="list_image" src={wind_img} alt="pic"></img> Wind:</h4><h4><span id="wind">{wind}</span> km/h</h4> </li><hr></hr>
                    <li><h4><img className="list_image" src={cloud_img} alt="pic"></img> Cloud:</h4><h4 id="cloud">{cloud}</h4> </li><hr></hr>
                    <li><h4><img className="list_image" src={sunrise_img} alt="pic"></img> Sunrise:</h4><h4 id="sunrise">{sunrise}</h4> </li><hr></hr>
                    <li><h4><img className="list_image" src={sunset_img} alt="pic"></img> Sunset:</h4><h4 id="sunset">{sunset}</h4> </li><hr></hr>
                </ul>
            </div>
            <p className="copyright">&copy;Copyright Abhijit/Candy</p>
        </div>
    );
}
export default Weather;