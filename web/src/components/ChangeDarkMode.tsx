import React, { CSSProperties } from 'react';
import { FiMoon, FiSun } from 'react-icons/fi';

import '../styles/components/change-dark-mode.css'

interface Props {
  isDarkMode: boolean;
  handleDarkModeButton: () => void;
  styles ?: CSSProperties;
}

function ChangeDarkMode({isDarkMode, handleDarkModeButton, styles} : Props) {

  return (
    <button 
      className="changeDarkMode"
      onClick={handleDarkModeButton}
      style={styles}
    >
      <FiSun 
        className={`icon sun ${!isDarkMode ? 'active' : ''}`}  
        size={24} 
        color="#E89D05"
      />
      <FiMoon 
        className={`icon moon ${isDarkMode ? 'active' : ''}`}
        size={24} 
        color="#045DE9"
      />
    </button>
  )
}

export default ChangeDarkMode;
