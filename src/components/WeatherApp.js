import { useState } from 'react'
import './style.css'
import api_file from './api.txt'
const axios = require('axios')
let api;

fetch(api_file)
    .then(r => r.text())
    .then(text => {
        api = text
    });


const WeatherApp = () => {
    const getWeather = async (value) => {
        const data = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${api}`)
        console.log(data.data)
        setData({ temp: (data.data.main.temp - 273).toFixed(2), city: data.data.name })
    }
    const [data, setData] = useState({ temp: 0, city: "" })
    const [city, setCity] = useState("")
    return (
        <div className="card">
            <input type="text" value={city} onChange={(e) => { getWeather(e.target.value); setCity(e.target.value) }} placeholder="Enter city name" />
            <h1 >Weather of {data.city}</h1>
            <p className="temp">{data.temp + '°C'}</p>
        </div>
    );
}
export default WeatherApp;

