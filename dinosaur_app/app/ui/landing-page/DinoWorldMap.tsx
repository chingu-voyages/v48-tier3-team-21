"use client";
import { useState, useEffect, useRef } from "react";
import { ConvertedLocations, DinoDataType } from "@/app/lib/definitions";
import mapboxgl, { LngLat } from "mapbox-gl";
import { createRoot } from "react-dom/client";
import Marker from "./Marker";
import clsx from "clsx";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "";

const DinoWorldMap = ({
  dinoData,
  digSites,
}: {
  dinoData: DinoDataType[];
  digSites: ConvertedLocations[];
}) => {
  const mapContainer = useRef<any>(null);
  const map = useRef<any>(null);
  const [lng, setLng] = useState(-5.5767);
  const [lat, setLat] = useState(-2.9796);
  const [zoom, setZoom] = useState(1.27);
  const [isDashVisible, setIsDashVisible] = useState(false);

  useEffect(() => {
    setIsDashVisible(true);
    setTimeout(() => setIsDashVisible(false), 5000);
  }, [zoom]);

  // initialize map when component mounts
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/jaweki/cltyhsap500e701mj2ex388vh",
      center: [lng, lat],
      zoom: zoom,
    });

    const minZoom = 1.27;
    map.current.on("move", () => {
      const currentZoom = map.current.getZoom();
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(currentZoom.toFixed(2));

      // Restrict minimum zoom
      if (currentZoom < minZoom) {
        map.current.setZoom(minZoom);
      }
    });

    // Add navigation control (the +/- zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up on unmount
    return () => map.current.remove();
  }, []);

  useEffect(() => {
    let imgArr: string[] = [];

    for (const site of digSites) {
      const markerdiv = document.createElement("div");

      const count = Object.values(site)[0].count;
      const coordinates = Object.values(site)[0].coordinates;
      const foundIn = Object.keys(site)[0];

      let relativeData: DinoDataType | undefined;

      do {
        relativeData = dinoData.find(
          (dino) =>
            dino.foundIn.includes(foundIn) &&
            !imgArr.includes(dino.imageSrc) &&
            !dino.imageSrc.includes("N/A")
        );

        if (!relativeData) {
          // Find the first available data that satisfies the conditions
          relativeData = dinoData.find(
            (dino) =>
              !imgArr.includes(dino.imageSrc) && !dino.imageSrc.includes("N/A")
          );
        }

        if (relativeData) {
          // Add the image source to the array to prevent reusing it
          imgArr.push(relativeData.imageSrc);
        }
      } while (!relativeData);

      if (relativeData && coordinates.length) {
        createRoot(markerdiv).render(
          <Marker
            count={count}
            foundIn={`${foundIn}`}
            relativeData={relativeData}
          />
        );

        const geoLocation = new LngLat(coordinates[0], coordinates[1]);
        new mapboxgl.Marker(markerdiv)
          .setLngLat(geoLocation)
          .addTo(map.current);
      }
    }
  }, [digSites, dinoData]);

  return (
    <section
      id="dino_dig_site_map"
      className="w-full h-full md:px-20  max-md:px-7 md:pt-10 flex flex-col gap-3"
    >
      <h2 className="text-4xl max-sm:text-2xl font-bold">
        Explore Our Discovered Dino Digging Sites.
      </h2>

      <div className="h-full relative">
        <div
          className={clsx(
            "absolute text-white bg-slate-900 bg-opacity-80 rounded-lg font-mono m-3 top-0 left-0 z-50 px-3 py-2 max-sm:text-sm",
            {
              hidden: !isDashVisible,
            }
          )}
        >
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
        <div ref={mapContainer} className="h-full" />
      </div>
    </section>
  );
};

export default DinoWorldMap;
