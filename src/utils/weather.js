import got from 'got';

export const getForecast = async ({ latitude, longitude }, callback) => {
    const latLong = latitude + "," + longitude;
    const url = "https://api.weatherstack.com/current?access_key=1af21d90615d3116717217b273acd79e&query=" + latLong + "&units=f";


    try {
        var {
        current: { 
            temperature, 
            feelslike: feelsLikeTemp, 
            precip: precipChance, 
            weather_descriptions: [ weatherDescription ] 
        }, 
        error 
    } = await got(url).json();
    } catch {
        callback("Unable to connect to Weather API.", undefined);
        return;
    }

    if(error) {
        callback(error.info, undefined);
        return;
    }
    
    callback(undefined, `${weatherDescription}. The current temperature is ${temperature} degrees, but it feels like ${feelsLikeTemp} degrees out. There is a ${precipChance}\% chance of rain.`);
    return;
}