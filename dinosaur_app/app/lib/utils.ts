export const getDinoLocation = async (locationName: string) => {
    try {
        const accessToken = process.env.MAPBOX_ACCESS_TOKEN;
        const geocodingAPI = `https://api.mapbox.com/geocoding/v5/mapbox.places/${locationName}.json?access_token=${accessToken}`;
        const response = await fetch(geocodingAPI);
        const data = await response.json();
        
        if (data.features.length > 0) {
            const coordinates = data.features[0].geometry.coordinates;
            return coordinates;
        } else {
            return null; // Handle location not found
        }   
    } catch (error) {
        console.log("Failed to convert location to geo Coordinates");
        return null
    }  
}