import React, { useContext } from 'react';
import { FiMapPin, FiAlertCircle, FiPower } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import mapMarkerImg from '../../images/map-marker.svg';

import UserContext from '../../context/UserContext';

import '../../styles/components/sidebar.css';

interface Props {
  isOnApproved: boolean;
}

export default function Sidebar({ isOnApproved }: Props) {
  const { push } = useHistory();

  const {setToken} = useContext(UserContext);

  function handleLogout() {
    localStorage.removeItem('token');
    setToken('');
    push('/app')
  }


  return (
    <aside className="app-sidebar">
      <img src={mapMarkerImg} alt="Happy" />

      <div className="icons">
        <button onClick={() => {
            push('/dashboard/approved')
          }}
          className={isOnApproved ? 'active' : ''}
        >
          <FiMapPin size={24} color="#FFFFFF" />
        </button>
        <button onClick={() => {
            push('/dashboard')
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