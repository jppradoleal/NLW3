import React, { useState, useEffect } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { FaFingerprint } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// import ChangeDarkMode from '../components/ChangeDarkMode';

import '../styles/pages/landing.css';

import logoImg from '../images/Logo.svg';

function Landing() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(localStorage.getItem('darkMode') === 'true');
  }, [isDarkMode])
  
  // function handleDarkModeButton() {
  //   setIsDarkMode(!isDarkMode);
  //   localStorage.setItem('darkMode', String(!isDarkMode));
  // }

  return (
    <div 
      id="page-landing" 
      className={isDarkMode ? 'dark' : ''}
    >
      <motion.div 
        className="content-wrapper"
        initial={{opacity: 0}} 
        animate={{opacity: 1}} 
        transition={{duration: 1}}
        layout
      >
        <motion.img 
          src={logoImg} 
          alt="Happy" 
          className="logoImg"
        />

        <motion.main
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration:3}}
        >
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças</p>
        </motion.main>

        <motion.div 
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration:3}}
          className="location"
        >
          <strong>Jacareí</strong>
          <span>São Paulo</span>
          
          {/* <ChangeDarkMode 
            isDarkMode={isDarkMode} 
            handleDarkModeButton={handleDarkModeButton}
            styles={{marginLeft: "auto"}}
          /> */}

          <Link to="/login" className="enter-login">
            <FaFingerprint size={26} color="rgba(0, 0, 0, .6)" />
          </Link>
        </motion.div>

        <motion.div
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          transition={{duration:3}}
        >
          <Link to="/app" className="enter-app">
            <FiArrowRight size={26} color="rgba(1, 1, 1, .6)" />
          </Link>
        </motion.div>

      </motion.div>
    </div>
  );
}

export default Landing;