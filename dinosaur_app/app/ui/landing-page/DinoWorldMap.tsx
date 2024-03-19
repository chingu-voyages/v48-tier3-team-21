"use client";
import ReactMapboxGL, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ReactMapboxGL({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "",
});

const DinoWorldMap = () => {
  return (
    <section className="w-full h-screen px-20 pt-10 flex flex-col gap-3">
      <h2 className="text-4xl font-bold">
        Explore Our Discovered Dino Digging Sites.
      </h2>
      <Map
        style={"mapbox://styles/jaweki/cltyhsap500e701mj2ex388vh"}
        containerStyle={{
          height: "100%",
          width: "100%",
        }}
      >
        {/* To add more layers */}
      </Map>
    </section>
  );
};

export default DinoWorldMap;
