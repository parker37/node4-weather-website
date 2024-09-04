import got from 'got';

// Geocode API

export const getGeocode = async (address, callback) => {
    const url = "https://api.mapbox.com/search/geocode/v6/forward?q=" + 
    address + "&access_token=pk.eyJ1IjoidGFlbWlucCIsImEiOiJjbTBidDN3eXkwYTEwMnJvanJ3eWRpaXEzIn0.m8iS8Zf1lHWQrpBp_PLeyg&limit=1";

    try {
        const data = await got(url).json()
        var {
            full_address: location, 
            coordinates: { latitude, longitude }
        } = data.features[0].properties;

    } catch(error) {
        if (error instanceof TypeError) {
            //console.log(error);
            callback("Unable to find location. Try another search.", undefined);
        } else {
            callback("Unable to connect to Geocoding API.", undefined);
        }
        return;
    }

    callback(undefined, {
        location,
        latitude,
        longitude
    });
    return;
}