import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import ChangeDarkMode from '../components/ChangeDarkMode';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanages-map.css';
import happyMapIcon from '../utils/mapIcon';

import api from '../services/api';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

function OrphanagesMap() {
  const [ orphanages, setOrphanages ] = useState<Orphanage[]>([]); 
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    api.get('orphanages').then(response => {
      setOrphanages(response.data);
    });
    setIsDarkMode(localStorage.getItem('darkMode') === 'true');
  }, []);
  
  function handleDarkModeButton() {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', String(!isDarkMode));
  }

  return (
    <div id="page-map" className={isDarkMode ? 'dark' : ''}>
      <aside>
        <header>
          <img src={mapMarkerImg} alt=""/>

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>Jacareí</strong>
          <span>São Paulo</span>
          <ChangeDarkMode 
            isDarkMode={isDarkMode} 
            handleDarkModeButton={handleDarkModeButton} 
          />
        </footer>
      </aside>

      <Map
        center= {[-23.3017096,-46.0086603]}
        zoom={15}
        style={{
          width: "100%",
          height: "100%"
        }}
        
      >
          {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
        <TileLayer 
          url={`https://api.mapbox.com/styles/v1/mapbox/${isDarkMode ? 'dark' : 'light'}-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
        />
        {orphanages.map(orphanage => {
          return (       
            <Marker 
              position={[ orphanage.latitude, orphanage.longitude ]}
              icon={happyMapIcon}
              key={orphanage.id}
            >
              <Popup 
                closeButton={false}
                minWidth={240}
                maxHeight={240}
                className="map-popup"
              >
                {orphanage.name}
                <Link to={`orphanages/${orphanage.id}`}>
                  <FiArrowRight size={20} color="#FFF" className="icon"/>
                </Link>
              </Popup>
            </Marker>
          )
        })}
      </Map>

      <Link className="create-orphanage" to="orphanages/create">
        <FiPlus size={32} color="#FFF"/>
      </Link>
    </div>
  );
}

export default OrphanagesMap;