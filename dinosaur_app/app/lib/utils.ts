"use server";

import { unstable_noStore } from "next/cache";
import { ConvertedLocations, DinoDataType, geoLocation } from "./definitions";

const getPastDate = (pastDays: number) => {
  const currentDate = new Date();
  const pastDate = new Date(
    currentDate.getTime() - pastDays * 24 * 60 * 60 * 1000
  );

  const year = pastDate.getFullYear();
  const month = `${pastDate.getMonth() - 1}`.padStart(2, "0");
  const day = `${pastDate.getDate()}`.padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// fetch latest news from news api
export const fetchLatestNews = async () => {
  unstable_noStore();
  try {
    const newsApiKey = process.env.NEWS_API_KEY;
    const fromDate = getPastDate(29); // Assuming getPastDate function provides past date

    const topics = [ "cretaceous dinosaur", "dinosaur digging", "Jurassic dinosaur", "Triassic era dinosaur", "dinosaur fossils", "discovered dinosaur fossil"];

    // Make promises for each topic
    const newsPromises = topics.map(async (topic) => {
      const url = `https://newsapi.org/v2/everything?q=${topic}&from=${fromDate}&sortBy=popularity&apiKey=${newsApiKey}`;
      const response = await fetch(url);

      if (response.status === 200) {
        const data = await response.json();
        return data.articles; // Return all articles for now
      } else {
        return []; // Return empty array if request fails
      }
    });

    // Wait for all promises to resolve or reject
    const allNewsData = await Promise.all(newsPromises);

    // Combine articles from all topics
    const combinedArticles = allNewsData.flat();

    // Filter articles with unique urlToImage & exclude "dinosaur" in title (stricter check)
    const uniqueArticles = [];
    const uniqueArticlesUrls = new Set();
    for (const article of combinedArticles) {// Check for valid title and exclude articles that don't contain "dinosaur" (case-insensitive)
      if (article.title && !article.title.trim().toLowerCase().includes("dinosaur")) {      
        // Check if urlToImage starts with https://
        if (article.urlToImage && article.urlToImage.startsWith("https://")) {
          uniqueArticlesUrls.add(article.title?.toLowerCase()); // Add title for uniqueness
          uniqueArticles.push(article);
          // Limit to 30 unique articles
          if (uniqueArticles.length === 30) {
            break;
          }
        }
      }
    }

    return uniqueArticles;
  } catch (error) {
    console.log("Attempt to fetch news failed: ", error);
    return []; // Return empty array on error
  }
};




// Converts a Dino found-in location into a geoJSON coordinate compatible with mapbox
export const convertDinoLocations = async (
  locations: string
): Promise<geoLocation[]> => {
  try {
    const accessToken = process.env.MAPBOX_ACCESS_TOKEN;
    const locationsArray = locations.split(",").map((loc) => loc.trim());
    const coordinatesPromises = locationsArray.map(async (location) => {
      const geocodingAPI = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=${accessToken}`;
      const response = await fetch(geocodingAPI);
      const data = await response.json();
      if (data.features.length > 0) {
        const coordinates = data.features[0].geometry.coordinates;
        return { [location]: coordinates };
      } else {
        return { [location]: [] }; // Handle location not found
      }
    });
    const geoLocations = await Promise.all(coordinatesPromises);
    return geoLocations;
  } catch (error) {
    console.log("Failed to convert location to geo Coordinates");
    return [];
  }
};

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
};

export const getDigSites = async () => {
  const dinoData = await fetchDinoData();
  const dataGroupedByLocation = new Map();
  dinoData?.forEach((dino) => {
    dino.geoLocations?.forEach((location: geoLocation[]) => {
      const locName: string = Object.keys(location)[0];
      const digSite = dataGroupedByLocation.get(locName);
      if (digSite) {
        digSite.count++;
      } else {
        const coordinates = Object.values(location)[0];
        dataGroupedByLocation.set(locName, {
          coordinates,
          count: 1,
        });
      }
    });
  });

  const locationNestedObj = Array.from(dataGroupedByLocation.entries()).map(
    ([country, data]) => ({
      [country]: data,
    })
  );
  // console.log(locationNestedObj);
  return locationNestedObj as ConvertedLocations[];
};

export const getDinoById = async (id: number): Promise<DinoDataType | undefined> => {
    const url = "https://chinguapi.onrender.com/dinosaurs";
    const resp = await fetch(url);
    const dinoData: DinoDataType[] = await resp.json();
    return dinoData?.find((dino) => dino.id === Number(id));
};


export async function formatDate(dateString: any) {
  const options: any = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'UTC',
    hour12: true
  };
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', options); // Replace '/' with ', '
}