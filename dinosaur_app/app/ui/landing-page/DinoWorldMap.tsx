"use client";
import { useState, useEffect, useRef, ChangeEvent, useCallback } from "react";
import { ConvertedLocations, DinoDataType } from "@/app/lib/definitions";
import mapboxgl, { LngLat } from "mapbox-gl";
import { createRoot } from "react-dom/client";
import Marker from "./Marker";
import clsx from "clsx";
import Loading from "../Loading";
import { getDigSites } from "@/app/lib/utils";
import { isNumber } from "chart.js/helpers";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "";

const DinoWorldMap = ({
  dinoData,
  digSites,
  decades,
}: {
  dinoData: DinoDataType[];
  digSites: ConvertedLocations[];
  decades: number[];
}) => {
  const mapContainer = useRef<any>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [lng, setLng] = useState(-5.5767);
  const [lat, setLat] = useState(-2.9796);
  const [zoom, setZoom] = useState(1.35);
  const [isDashVisible, setIsDashVisible] = useState(false);
  const [selectedDecade, setSelectedDecade] = useState("all");
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [digSitesStored, setDigSitesStored] = useState<
    ConvertedLocations[] | null
  >(null);
  const [dinoDataStored, setDinoDataStored] = useState<DinoDataType[] | null>(
    null
  );
  const [markers, setMarkers] = useState<mapboxgl.Marker[] | null>(null);

  useEffect(() => {
    setIsDashVisible(true);
    setTimeout(() => setIsDashVisible(false), 5000);
  }, [zoom]);

  // initialize map when component mounts
  useEffect(() => {
    setDinoDataStored(dinoData);
    setDigSitesStored(digSites);
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/jaweki/cltyhsap500e701mj2ex388vh",
      center: [lng, lat],
      zoom: zoom,
    });

    const minZoom = 1.35;
    map?.current.on("move", () => {
      const currentZoom = map?.current?.getZoom();
      setLng(Number(map?.current?.getCenter().lng.toFixed(4)));
      setLat(Number(map?.current?.getCenter().lat.toFixed(4)));
      setZoom(Number(currentZoom?.toFixed(2)));

      // Restrict minimum zoom
      if (currentZoom && currentZoom < minZoom) {
        map?.current?.setZoom(minZoom);
      }
    });

    // Add navigation control (the +/- zoom buttons)
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Clean up on unmount
    return () => map?.current?.remove();
  }, []);

  const anotateMap = useCallback(
    (digSiteByDecade?: ConvertedLocations[]) => {
      let imgArr: string[] = [];
      setIsMapLoading(true);
      let digSitesArr = null;

      if (!digSiteByDecade && digSitesStored) {
        digSitesArr = digSitesStored;
      } else {
        digSitesArr = digSiteByDecade;
      }

      if (digSitesArr) {
        if (markers?.length) {
          console.log("markers before", markers?.length);
          markers?.forEach((marker) => marker.remove());
        }
        const markersArr = [] as mapboxgl.Marker[];
        for (const site of digSitesArr) {
          const markerdiv = document.createElement("div");

          const count = Object.values(site)[0].count;
          const coordinates = Object.values(site)[0].coordinates;
          const foundIn = Object.keys(site)[0];

          let relativeData: DinoDataType | undefined;

          if (dinoDataStored) {
            do {
              relativeData = dinoDataStored.find(
                (dino) =>
                  dino.foundIn.includes(foundIn) &&
                  !imgArr.includes(dino.imageSrc) &&
                  !dino.imageSrc.includes("N/A")
              );

              if (!relativeData) {
                // Find the first available data that satisfies the conditions
                relativeData = dinoDataStored.find(
                  (dino) =>
                    !imgArr.includes(dino.imageSrc) &&
                    !dino.imageSrc.includes("N/A")
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
              const marker =
                map.current &&
                new mapboxgl.Marker(markerdiv)
                  .setLngLat(geoLocation)
                  .addTo(map.current);
              marker && markersArr.push(marker);

              setIsMapLoading(false);
            }
          }
        }
        console.log("new markersArr length", markersArr.length);
        setMarkers([...markersArr]);
      }
    },
    [digSitesStored, dinoDataStored]
  );
  // anotate map with makers
  useEffect(() => {
    anotateMap();
  }, [anotateMap]);

  const filterDinosByDecade = (decade: string | number) => {
    const matchedDinos = dinoData.filter(
      (dino) =>
        Number(
          dino.namedBy.split(" ").pop()?.split("(").pop()?.split(")")[0]
        ) >= Number(`${decade}0`) &&
        Number(dino.namedBy.split(" ").pop()?.split("(").pop()?.split(")")[0]) <
          Number(`${decade}0`) + 10
    );
    return matchedDinos;
  };
  const handleDecadeChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    const decadeChoosen = e.currentTarget.value;
    setSelectedDecade(decadeChoosen);

    if (decadeChoosen === "all-dinos") {
      anotateMap();
    } else if (isNumber(Number(decadeChoosen))) {
      const matchedDinos = filterDinosByDecade(decadeChoosen);
      const digSitesByDecade = await getDigSites(matchedDinos);
      anotateMap(digSitesByDecade);
    }
  };

  return (
    <section
      id="dino_dig_site_map"
      className="w-full h-full md:px-20  max-md:px-7 md:pt-10 flex flex-col gap-3"
    >
      <h2 className=" font-cabinSketch text-3xl max-md:text-xl max-sm:text-lg text-center">
        A World of T-Rexploration!
      </h2>
      <p className=" font-semibold text-sm mb-5">
        It&apos;s time to start digging! Using the map below, explore where
        fossils were found, and see the top most featured dinosaur at that
        location, and most probably seek to dig deeper to learn about; which
        other dinosaurs lived in that location, and their individual
        characteristics. Use the filter to see the decade each fossil was
        discovered.
      </p>

      <div className="w-full flex lg:flex-row  lg:justify-between lg:items-center max-lg:flex-col max-lg:gap-3">
        <h3 className="text-4xl max-sm:text-2xl font-bold">
          Explore Our Discovered Dino Digging Sites.
        </h3>

        <div className=" flex lg:flex-col gap-1 flex-row item-center">
          <span className=" font-cabinSketch">Dig by Decade Discovered: </span>
          <select
            id="dinosaur-discovery-decade"
            value={selectedDecade}
            onChange={handleDecadeChange}
            className=" border border-black rounded-sm bg-slate-400 max-lg:grow"
          >
            <option value="all-dinos" defaultChecked>
              All
            </option>
            {decades.map((decade) => (
              <option key={decade} value={String(decade)}>
                {String(decade) !== "NaN" ? decade + "0s" : "Unknown decade"}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-[85vh] relative">
        <div className="-z-20 absolute inset-0 bg-[rgb(193,156,129)] bg-opacity-60" />
        <div
          className={clsx(
            " z-50 absolute inset-0 bg-[rgb(193,156,129)] bg-opacity-60 flex items-center justify-center",
            {
              hidden: !isMapLoading,
            }
          )}
        >
          <Loading />
        </div>
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
