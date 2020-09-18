import { ImageRequireSource } from "react-native";

export const getImageForWeatherState = (weatherState: string): ImageRequireSource => {
    switch(weatherState) {
        case 'Clear': return require('../assets/clear.png')
        case 'Hail': return require('../assets/hail.png')
        case 'Heavy Cloud': return require('../assets/heavy-cloud.png')
        case 'Light Cloud': return require('../assets/light-cloud.png')
        case 'Heavy Rain': return require('../assets/heavy-rain.png')
        case 'Light Rain': return require('../assets/light-rain.png')
        case 'Showers': return require('../assets/showers.png')
        case 'Sleet': return require('../assets/sleet.png')
        case 'Snow': return require('../assets/snow.png')
        case 'Thunder': return require('../assets/thunder.png')
        default: return require('../assets/clear.png')
    }
  };

  export const fetchLocationId = async (location: string): Promise<number> => {
    const response = await fetch(
      `https://www.metaweather.com/api/location/search/?query=${location}`,
    );
    const locations = await response.json();
    return locations[0].woeid;
  };

  export type Weather = {
    location: string
    weatherState: string
    temperature: number
  }

  export const fetchWeather = async (woeid: number): Promise<Weather>  => {
    const response = await fetch(
      `https://www.metaweather.com/api/location/${woeid}/`,
    );
     const { title, consolidated_weather } = await response.json();
     console.log(consolidated_weather)
     const { weather_state_name, the_temp } = consolidated_weather[0];
  
    return {
      location: title,
      weatherState: weather_state_name,
      temperature: the_temp,
    };
  };
  