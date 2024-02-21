import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { CitiesProvider, useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/UseGeolocation";
import Button from "./Button";
import { UseUrlPosition } from "../hooks/UseUrlPosition";

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([29.1, 119.6]);
  const { isLoading, position, getPosition } = useGeolocation();
  const [mapLat, mapLng] = UseUrlPosition();

  useEffect(
    function updatePosition() {
      if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  useEffect(
    function () {
      if (position) {
        setMapPosition([position.lat, position.lng]);
      }
    },
    [position]
  );

  return (
    <div className={styles.mapContainer}>
      <Button
        type="position"
        onClick={() => {
          getPosition();
          console.log(position);
        }}
      >
        {isLoading ? "Loading" : "Use your position"}
      </Button>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>
                {city.cityName}, {city.country}
              </span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();

  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
