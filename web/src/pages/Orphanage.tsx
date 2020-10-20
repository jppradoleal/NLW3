import React, { useEffect, useState } from 'react';
// import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { useParams } from 'react-router-dom';

import { motion } from 'framer-motion';

import happyMapIcon from '../utils/mapIcon';

import '../styles/pages/orphanage.css';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

interface Orphanage {
  name: string;
  about: string;
  whatsapp: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  latitude: number;
  longitude: number;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface OrphanageParams {
  id: string;
}

export default function Orphanage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const params = useParams<OrphanageParams>();
  const [ orphanage, setOrphanage ] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0); 

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then(response => {
      setOrphanage(response.data);
    });
    setIsDarkMode(localStorage.getItem('darkMode') === 'true');
  }, [params.id]);
  
  if(!orphanage) {
    return <p>Carregando...</p>
  }
  
  function handleDarkModeButton() {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', String(!isDarkMode));
  }



  return (
    <div id="page-orphanage" className={`${isDarkMode ? 'dark' : ''}`}>
      <Sidebar isDarkMode={isDarkMode} handleDarkModeButton={handleDarkModeButton}/>

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImageIndex].url} alt="Lar das meninas" />

          <div className="images">
            {orphanage.images.map((image, index) => {
              return(
                <button 
                  className={activeImageIndex === index ? 'active' : ''}
                  type="button" 
                  key={ image.id }
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                >
                  <img src={ image.url } alt={orphanage.name} />
                </button>
              );
            })}
          </div>
          
          <div className="orphanage-details-content">
            <motion.h1 
              initial={{opacity: 0}} 
              animate={{opacity: 1}}
              transition={{duration: 1}}
            >
              {orphanage.name}
            </motion.h1>
            <motion.p initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 1}}>
              {orphanage.about}
            </motion.p>

            <div className="map-container">
              <Map 
                center={[orphanage.latitude, orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/${isDarkMode ? 'dark' : 'light'}-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={happyMapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <footer>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                >Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2
            >
              Instruções para visita
            </h2>
            <p
            >
              {orphanage.instructions}
            </p>

            <div className="open-details">
              <div 
                className="hour"
              >
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              { orphanage.open_on_weekends ? (
                <div 
                  className="open-on-weekends"
                >
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div 
                  className="open-on-weekends dont-open"
                >
                  <FiInfo size={32} color="#FF6690" />
                  Não atendemos <br />
                  fim de semana
                </div>
              )}
            </div>
            <a 
              href={`http://wa.me/send?phone=+55${orphanage.whatsapp}&text=Oi,gostaria%20de%20visita-los`} 
              className="contact-button"                
            >
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}