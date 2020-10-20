import React, { useContext, useEffect, useState } from 'react';
import { Marker, TileLayer, Map } from 'react-leaflet';
import { FiEdit3, FiTrash } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import UserContext from '../../context/UserContext';
import happyMapIcon from '../../utils/mapIcon';
import Sidebar from './Sidebar';

import '../../styles/pages/dashboard.css';
import api from '../../services/api';
import Orphanage from '../Orphanage';
import { motion } from 'framer-motion';

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

export default function DashboardApproved() {
  const { token } = useContext(UserContext);
  const [orphanages, setOrphanages ] = useState<Orphanage[]>([]);
  const history = useHistory();

  useEffect(() => {
    if(!token) {
      history.push('/login');
    }

    api.get('/orphanages').then(response => {
      setOrphanages(response.data);
    })
  })

  return (
    <div id="page-dashboard">
      <Sidebar isOnApproved={true}/>
      <div className="orphanages-listing">

      {/* Cada card aprovado tem um mapa, um h1, um botão de editar, e um botão de deletar */}
          {orphanages.map((orphanage, index) => {
            return (
              <motion.div 
                className="card" 
                key={orphanage.id} 
                initial={{opacity: 0, y: -100}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: index/1.7+.5}}
              >
                <header className="card-header">
                <Map
                    center= {[orphanage.latitude,orphanage.longitude]}
                    zoom={15}
                    style={{
                      width: "100%",
                      height: "100%"
                    }}
                    dragging={false}
                    zoomControl={false}   
                    scrollWheelZoom={false}             
                  >
                      {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                    <TileLayer 
                      url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
                    />
                    <Marker 
                      position={[orphanage.latitude,orphanage.longitude]}
                      icon={happyMapIcon}
                      interactive={false}
                    >
                    </Marker>
                  </Map>
                </header>
                <footer>
                  <h1>
                    {orphanage.name}
                  </h1>
                  <div className="card-button-group">
                    <button onClick={() => history.push(`/dashboard/approved/${orphanage.id}`, { pending: false })}>
                      <FiEdit3 size={24} color="#29B6D1" />
                    </button>
                    <button onClick={() => {
                      history.push(`/dashboard/delete`, {
                        id: orphanage.id, 
                        name: orphanage.name
                      });
                    }}>
                      <FiTrash size={24} color="#29B6D1" />
                    </button>
                  </div>
                </footer>
              </motion.div>
            )
          })}
      </div>
    </div>
  )
}