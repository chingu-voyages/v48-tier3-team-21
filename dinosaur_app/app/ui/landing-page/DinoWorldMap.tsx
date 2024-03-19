"use client";
import ReactMapboxGL, { Layer, Feature } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ReactMapboxGL({
  accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? "",
});

const DinoWorldMap = () => {
  return (
    <section className="w-full h-full md:px-20  max-md:px-7 md:pt-10 flex flex-col gap-3">
      <h2 className="text-4xl max-sm:text-2xl font-bold">
        Explore Our Discovered Dino Digging Sites.
      </h2>
      <Map
        style={"mapbox://styles/jaweki/cltyhsap500e701mj2ex388vh"}
        containerStyle={{
          height: "100%",
          width: "100%",
        }}
        zoom={[2]}
        center={[-100.994031, 43.719235]}
      >
        {/* <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
        </Layer> */}
      </Map>
    </section>
  );
};

export default DinoWorldMap;
