import React, { useContext, useEffect } from 'react';
import { Marker, TileLayer, Map } from 'react-leaflet';
import { FiArrowRight } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import UserContext from '../../context/UserContext';
import happyMapIcon from '../../utils/mapIcon';
import Sidebar from './Sidebar';

import '../../styles/pages/dashboard.css';

export default function DashboardPending() {
  const { token } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if(!token) {
      //history.push('/login');
    }
  })

  return (
    <div id="page-dashboard">
      <Sidebar isOnApproved={false}/>
      <div className="orphanages-listing">

      {/* Cada card aprovado tem um mapa, um h1, um botão de editar, e um botão de deletar */}
          <div className="card">
            <header className="card-header">
            <Map
                center= {[-23.3017096,-46.0086603]}
                zoom={15}
                style={{
                  width: "100%",
                  height: "100%"
                }}
                dragging={false}
                zoomControl={false}                
              >
                  {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} 
                />
                <Marker 
                  position={[-23.3017096,-46.0086603]}
                  icon={happyMapIcon}
                  interactive={false}
                >
                </Marker>
              </Map>
            </header>
            <footer>
              <h1>
                Orphanage Name
              </h1>
              <button>
                <FiArrowRight size={24} color="#29B6D1" />
              </button>
            </footer>
          </div>
      </div>
    </div>
  )
}