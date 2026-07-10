import { useState, useEffect } from "react"
const Weather = () => {

const [ weather, setWeather] = useState(null)
const [ isLoading, setIsLoading ] = useState(true)
const lat = 37.5
const lon = 127

useEffect(() => {
fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,wind_direction_10m,uv_index&daily=sunrise,sunset&timezone=Asia/Seoul`)
.then((res) => res.json()).then((data) => { setWeather(data); 
    setIsLoading(false) }).catch((error) => { console.error('기온 로딩 실패:', error) })
  }, [])

if (isLoading) return <p>'불러오는 중...'</p>
  return (
    <div>
    <p> 기온 : {weather?.current.temperature_2m}°C</p>
    <p> 습도 : {weather?.current.relative_humidity_2m}%</p>
    <p> 강수량 : {weather?.current.precipitation}mm</p>
    <p> 풍속 : {weather?.current.wind_speed_10m}km</p>
    <p> 풍향 : {weather?.current.wind_direction_10m}°</p>
    <p> 자외선 : {weather?.current.uv_index}</p>
    <p> 일출 : {weather?.daily.sunrise[0]}</p>
    <p> 일몰 : {weather?.daily.sunset[0]}</p>
    </div>
  )

}
export default Weather