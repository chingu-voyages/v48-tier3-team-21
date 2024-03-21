'use server';

import { ConvertedLocations, DinoDataType, geoLocation } from "./definitions";

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


// Converts a Dino found-in location into a geoJSON coordinate compatible with mapbox
export const convertDinoLocations = async (locations: string): Promise<geoLocation[]> => {
    try {
        const accessToken = process.env.MAPBOX_ACCESS_TOKEN;
        const locationsArray = locations.split(',').map(loc => loc.trim());
        const coordinatesPromises = locationsArray.map(async location => {
            const geocodingAPI = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${accessToken}`;
            const response = await fetch(geocodingAPI);
            const data = await response.json();
            if (data.features.length > 0) {
                const coordinates = data.features[0].geometry.coordinates;
                return { [location]: coordinates}
            } else {
                return {[location]: []}; // Handle location not found
            }
        });
        const geoLocations = await Promise.all(coordinatesPromises);
        return geoLocations
    } catch (error) {
        console.log("Failed to convert location to geo Coordinates");
        return [];
    }
}

export const fetchDinoData = async (): Promise<DinoDataType[] | null> => {
    try {
        const url = "https://chinguapi.onrender.com/dinosaurs";
        const response = await fetch(url);
        if (response.status === 200) {
            const data = await response.json();
            const processedData: DinoDataType[] = [];
            for (const element of data) {
                const locations = element.foundIn;
                const geoLocations = await convertDinoLocations(locations);
                processedData.push({ ...element, geoLocations });
            }
            // console.log(processedData);
            return processedData;
        } else {
            return null;
        }
    } catch (error) {
        console.log("Failed to fetch dino data: ", error);
        return null;
    }
}

export const getDigSites = async () => {
    const dinoData = await fetchDinoData();
    const dataGroupedByLocation = new Map();
    dinoData?.forEach(dino => {
        dino.geoLocations?.forEach((location: geoLocation[]) => {
            const locName: string = Object.keys(location)[0];
            const digSite = dataGroupedByLocation.get(locName);
            if (digSite) {
                digSite.count++;
            } else {
                const coordinates = JSON.stringify(Object.values(location)[0])
                dataGroupedByLocation.set(locName, {
                    coordinates,
                    count: 1
                });
            }
        });
    });

    const locationNestedObj = Array.from(dataGroupedByLocation.entries()).map(([country, data]) => ({ 
        [country]: data 
    }));
    // console.log(locationNestedObj);
    return locationNestedObj as ConvertedLocations[]
}
