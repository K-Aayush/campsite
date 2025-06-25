"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L, { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";

const fixLeafletIcon = () => {
  if (typeof window !== "undefined") {
    const LAny = L as any;
    delete LAny.Icon.Default.prototype._getIconUrl;
    LAny.Icon.Default.mergeOptions({
      iconRetinaUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
  }
};

function LocationMap() {
  const position: LatLngTuple = [27.6772, 85.3155];

  useEffect(() => {
    fixLeafletIcon();
  }, []);

  return (
    <MapContainer
      center={position}
      zoom={15}
      style={{ height: "100%", width: "100%", minHeight: "400px" }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          <div>
            <h3 className="font-bold text-lg">Mayur Wellness Camp</h3>
            <p>123 Forest Path Road</p>
            <p>Tranquil Valley</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default LocationMap;
