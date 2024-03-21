"use client";
import ReactMapboxGL from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { ConvertedLocations, DinoDataType } from "@/app/lib/definitions";

const DinoWorldMap = ({
  dinoData,
  digSites,
}: {
  dinoData: DinoDataType[];
  digSites: ConvertedLocations[];
}) => {
  const MapLayout = ReactMapboxGL({
    accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "",
  });

  return (
    <section className="w-full h-full md:px-20  max-md:px-7 md:pt-10 flex flex-col gap-3">
      <h2 className="text-4xl max-sm:text-2xl font-bold">
        Explore Our Discovered Dino Digging Sites.
      </h2>
      <MapLayout
        style={"mapbox://styles/jaweki/cltyhsap500e701mj2ex388vh"}
        containerStyle={{
          height: "100%",
          width: "100%",
        }}
        zoom={[1]}
        center={[-30, 0]}
      >
        {/* <ZoomControl />
        <Marker coordinates={[23.9137106762068, -28.3782721906973]}>
          <img
            src={markerUrl}
            alt="Dino Marker"
            style={{ width: 25, height: 25 }}
          />
        </Marker> */}
      </MapLayout>
    </section>
  );
};

export default DinoWorldMap;
