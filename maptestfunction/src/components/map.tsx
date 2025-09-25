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

    const drawControl: any  = new L.Control.Draw({
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

    map.on(L.Draw.Event.CREATED, (e: any) => {
      const layer = e.layer;
      drawnItems.addLayer(layer);
      console.log('New shape:', layer.toGeoJSON());
    });
  }, [map]);

  return null;
};

const Map = () => (
  <MapContainer center={[19.9, 99.8]} zoom={13} style={{ height: '100vh' }}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <DrawControl />
  </MapContainer>
);

export default Map;
