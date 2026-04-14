import axios from "axios";
const api_key = import.meta.env.VITE_WEATHER_API_KEY

export const getWeather = (capital) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`
  return axios.get(url).then(response => response.data)
}