import React from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const MapComponent = withGoogleMap((props) => (
  <GoogleMap
    defaultZoom={8}
    zoom={15}
    defaultCenter={{ lat: props.latitude, lng: props.longitude }}
  >
    <Marker position={{ lat: props.latitude, lng: props.longitude }} />
  </GoogleMap>
));

export default MapComponent;
