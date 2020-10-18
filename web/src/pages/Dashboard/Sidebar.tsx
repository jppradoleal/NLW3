import React, { useState, useContext } from 'react';
import { FiMapPin, FiAlertCircle, FiPower } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import mapMarkerImg from '../../images/map-marker.svg';

import { UserContext } from '../../App';

import '../../styles/components/sidebar.css';

export default function Sidebar() {
  const { push } = useHistory();

  const {token, setToken} = useContext(UserContext);

  const [isOnApproved, setIsOnApproved] = useState(true);

  function handleLogout() {
    localStorage.removeItem('token');
    setToken('');
  }


  return (
    <aside className="app-sidebar">
      <img src={mapMarkerImg} alt="Happy" />

      <div className="icons">
        <button onClick={() => {
            setIsOnApproved(true)
            push('/dashboard')
          }}
          className={isOnApproved ? 'active' : ''}
        >
          <FiMapPin size={24} color="#FFFFFF" />
        </button>
        <button onClick={() => {
            setIsOnApproved(false)
            push('/dashboard/unapproved')
          }}

          className={!isOnApproved ? 'active' : ''}
        >
          <FiAlertCircle size={24} color="#FFFFFF" />
        </button>
      </div>

      <footer>
      <button type="button" onClick={handleLogout} className="inactive">
          <FiPower size={24} color="#FFF" />
      </button>
      </footer>
    </aside>
  )
}