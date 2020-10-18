import React, { useState, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import ChangeDarkMode from '../components/ChangeDarkMode';

import '../styles/pages/landing.css';

import logoImg from '../images/Logo.svg';

function Landing() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(localStorage.getItem('darkMode') === 'true');
    console.log(localStorage.getItem('token'));
  }, [isDarkMode])
  
  function handleDarkModeButton() {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', String(!isDarkMode));
  }

  return (
    <div id="page-landing" className={isDarkMode ? 'dark' : ''}>
      <div className="content-wrapper">
        <img src={logoImg} alt="Happy" className="logoImg"/>

        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças</p>
        </main>

        <div className="location">
          <strong>Jacareí</strong>
          <span>São Paulo</span>
          
          <ChangeDarkMode 
            isDarkMode={isDarkMode} 
            handleDarkModeButton={handleDarkModeButton}
            styles={{marginLeft: "auto"}}
          />
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(1, 1, 1, .6)" />
        </Link>

      </div>
    </div>
  );
}

export default Landing;