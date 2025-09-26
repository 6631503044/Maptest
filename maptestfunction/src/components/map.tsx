import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw';
import { useEffect } from 'react';

const DrawControl = () => {
  const map = useMap();

  useEffect(() => {
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    const drawControl: any = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
      },
      draw: {
        polygon: true,
        polyline: true,
        rectangle: false,
        circle: false,
        marker: true,
        circlemarker: false,
      },
    });

    map.addControl(drawControl);

    const handleCreate = (e: any) => {
      const layer = e.layer;
      const name = window.prompt("Enter name for this shape:");
      const description = window.prompt("Enter description:");

      const geojson = layer.toGeoJSON();
      geojson.properties = { name, description };

      drawnItems.addLayer(layer);
      console.log('New shape:', geojson);

      layer.bindPopup(`<b>${name}</b><br>${description}`);
    };

    map.on(L.Draw.Event.CREATED, handleCreate);

    // 🔑 Cleanup on unmount so no duplicate listeners/controls
    return () => {
      map.removeControl(drawControl);
      map.off(L.Draw.Event.CREATED, handleCreate);
      map.removeLayer(drawnItems);
    };
  }, [map]); // run once

  return null;
};

const Map = () => (
  <MapContainer center={[19.9, 99.8]} zoom={13} style={{ height: '100vh' }}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <DrawControl />
  </MapContainer>
);

export default Map;
