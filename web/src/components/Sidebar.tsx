import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import mapMarkerImg from '../images/map-marker.svg';

import '../styles/components/sidebar.css';
import ChangeDarkMode from './ChangeDarkMode';

interface Props {
  isDarkMode: boolean;
  handleDarkModeButton: () => void;
}

export default function Sidebar({isDarkMode, handleDarkModeButton} : Props) {
  const { goBack } = useHistory();

  return (
    <aside className={`app-sidebar ${isDarkMode ? 'dark' : ''}`}>
      <img src={mapMarkerImg} alt="Happy" />
      <ChangeDarkMode 
        handleDarkModeButton={handleDarkModeButton} 
        isDarkMode={isDarkMode}
        styles={{ width: 50 }}
      />

      <footer>
      <button type="button" onClick={goBack} className="goBack">
          <FiArrowLeft size={24} color="#FFF" />
      </button>
      </footer>
    </aside>
  )
}