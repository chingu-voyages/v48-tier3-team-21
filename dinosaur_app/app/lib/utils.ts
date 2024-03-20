'use server';

// Converts a Dino found-in location into a geoJSON coordinate compatible with mapbox
export const convertDinoLocation = async (locationName: string) => {
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

// fetch latest news from news api
export const fetchLatestNews = async () => {
    try {
        const newsApiKey = process.env.NEWS_API_KEY
        const url = `${process.env.NEWS_API_URL}${newsApiKey}`;
        const response = await fetch(url);

        if (response.status === 200) {
            const data = await response.json() as any;

            // return the first ten news articles
            
            const importantArticles = data.articles.filter((item: any) => (
                item.urlToImage !== null 
            ))
            
            return importantArticles.slice(0, 10);
        } else {
            return null
        }
    } catch (error) {
        console.log("Attempt to fetch news failed: ", error);
        return null;
    }
}