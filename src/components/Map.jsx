import React from "react";
import { GoogleMap, LoadScriptNext } from "@react-google-maps/api";
import {GOOGLE_MAPS_API_KEY} from "../../api/api"
import "../styles/Map.css"

const containerStyle = {
  width: "100%",
  height: "100%",
};

export default function Map({ lat, lng }) {
    const center = {
        lat: lat,
        lng: lng,
    }

  if (!GOOGLE_MAPS_API_KEY) {
    return <div>Error: Google Maps API key is missing or invalid.</div>;
  }

  return (
<>
  {lat !== undefined && lng !== undefined ? (
    <LoadScriptNext googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <div className="map-container">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
      </GoogleMap>
      </div>
    </LoadScriptNext>
  ) : null}
</>
  );
}
