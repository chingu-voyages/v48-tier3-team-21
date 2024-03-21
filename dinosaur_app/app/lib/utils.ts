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

const getPastDate = (pastDays: number) => {
    const currentDate = new Date();
    const pastDate = new Date(currentDate.getTime() - (pastDays * 24 * 60 * 60 * 1000));

    const year = pastDate.getFullYear();
    const month = `${(pastDate.getMonth() - 1)}`.padStart(2, '0');
    const day = `${pastDate.getDate()}`.padStart(2, '0');

    return `${year}-${month}-${day}`;
}

// fetch latest news from news api
export const fetchLatestNews = async () => {
    try {
        const newsApiKey = process.env.NEWS_API_KEY
        const fromDate = getPastDate(29)
        const url = `https://newsapi.org/v2/everything?q=Dinosaur&from=${fromDate}&sortBy=popularity&apiKey=${newsApiKey}`;
        const response = await fetch(url);

        if (response.status === 200) {
            const data = await response.json();

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