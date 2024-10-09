import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapSection = ({ partner }) => {
  return (
    <section className="mb-16">
      <h2 className="text-4xl font-bold mb-8 text-white">Territory Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
          <MapContainer center={[partner.latitude, partner.longitude]} zoom={8} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[partner.latitude, partner.longitude]}>
              <Popup>{partner.name}</Popup>
            </Marker>
          </MapContainer>
        </div>
        <Card className="hover-lift bg-gradient-to-br from-gray-800 to-gray-900 border-none">
          <CardContent className="p-8">
            <h3 className="text-3xl font-semibold mb-4 text-white">Territory Statistics</h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-300">Size:</span>
                <span className="text-2xl font-bold text-cyan-400">{partner.territory_size} hectares</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-300">Population:</span>
                <span className="text-2xl font-bold text-cyan-400">{partner.population}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-300">Villages:</span>
                <span className="text-2xl font-bold text-cyan-400">{partner.villages}</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-300">Ethnic Groups:</span>
                <span className="text-2xl font-bold text-cyan-400">{partner.ethnic_groups.join(', ')}</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default MapSection;