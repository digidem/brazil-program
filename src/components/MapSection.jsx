import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Search, Menu } from 'lucide-react';

// const mapUrl = 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
// const mapUrl = "https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg"
const mapUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'

const MapSection = ({ mapRef, filteredPartners, searchTerm, setSearchTerm, setIsSidebarOpen, className, noSideBar }) => {
  return (
    <div ref={mapRef} className={className || "h-[100vh] w-full relative overflow-hidden"}>
      <MapContainer center={[-4.5, -60]} zoom={5} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url={mapUrl}
          minZoom={0}
          maxZoom={20}
          attribution='&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {filteredPartners.map((partner) => (
          <Marker key={partner.slug} position={[partner.latitude, partner.longitude]}>
            <Popup>
              <div className="text-center">
                <img src={partner.logo} alt={partner.name} className="w-16 h-16 mx-auto mb-2 rounded-full" />
                <h3 className="font-bold">{partner.name}</h3>
                <p className="text-sm">{partner.description}</p>
                <button
                  className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition-colors"
                  onClick={() => window.location.href = `#partners/${partner.slug}`}
                >
                  Learn More
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {!noSideBar && <div className="absolute top-4 right-4 flex items-center z-[1000]">
        <div className="mr-2 relative">
          <input
            type="text"
            placeholder="Search partners..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 rounded-full bg-gray-800 text-gray-200 border border-gray-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 pr-10 placeholder-gray-500"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyan-400" />
        </div>
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="p-2 bg-gray-800 rounded-full shadow-lg hover:bg-gray-700 transition-all duration-200 border border-gray-700 hover:border-cyan-500 group"
        >
          <Menu className="h-6 w-6 text-cyan-400 group-hover:text-cyan-300" />
        </button>
      </div>}
    </div>
  );
};

export default MapSection;