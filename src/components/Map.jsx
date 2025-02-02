import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import {GOOGLE_MAPS_API_KEY} from "../../api/api"

const containerStyle = {
  width: "600px",
  height: "400px",
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
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={5}>
      </GoogleMap>
    </LoadScript>
  ) : null}
</>
  );
}
