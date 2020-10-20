import React from 'react';
import '../styles/pages/success-notify.css';
import successImage from '../images/success-image.svg';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function SuccessNotify() {
  const history = useHistory();
  function handleGoBack() {
    history.push('/app')
  }

  return (
    <div id="success-page">
      <motion.div 
        className="text-container"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 1}}
      >
        <h1>Ebaaa!</h1>
        <p>O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é só esperar :)</p>
        <button onClick={handleGoBack}>Voltar para o mapa</button>
      </motion.div>
      <motion.img 
        src={successImage} 
        alt="Cadastro feito com sucesso"
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 1}}
      />
    </div>
  );
}
