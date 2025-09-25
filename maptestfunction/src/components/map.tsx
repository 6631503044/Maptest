'use client';

import { MapContainer, TileLayer, Marker, Popup, Polyline, Polygon } from 'react-leaflet';
import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

const Map = () => {
  useEffect(() => {
    // Fix for missing default icons in Next.js
    // @ts-ignore: Suppress type error for _getIconUrl
    delete (L.Icon.Default.prototype as any)._getIconUrl;
  }, []);

  const position: [number, number] = [19.9, 99.8]; // Example coordinates
  const markers = [
    { lat: 19.9, lng: 99.8, name: 'Marker 1', details: 'Details about Marker 1' },
    { lat: 19.91, lng: 99.81, name: 'Marker 2', details: 'Details about Marker 2' },
  ];
  const polyline: [number, number][] = [
    [19.9, 99.8],
    [19.91, 99.81],
  ];
  const polygon: [number, number][] = [
    [19.9, 99.8],
    [19.91, 99.81],
    [19.92, 99.82],
  ];

  return (
    <MapContainer center={position} zoom={13} style={{ height: '100vh' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {markers.map((marker, index) => (
        <Marker key={index} position={[marker.lat, marker.lng]}>
          <Popup>
            <strong>{marker.name}</strong>
            <p>{marker.details}</p>
          </Popup>
        </Marker>
      ))}
      <Polyline positions={polyline} color="blue" />
      <Polygon positions={polygon} color="green" />
    </MapContainer>
  );
};

export default Map;
