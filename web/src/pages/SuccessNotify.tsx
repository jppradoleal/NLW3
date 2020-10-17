import React from 'react';
import '../styles/pages/success-notify.css';
import successImage from '../images/success-image.svg';
import { useHistory } from 'react-router-dom';

export default function SuccessNotify() {
  const history = useHistory();
  function handleGoBack() {
    history.push('/app')
  }

  return (
    <div id="success-page">
      <div className="text-container">
        <h1>Ebaaa!</h1>
        <p>O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é só esperar :)</p>
        <button onClick={handleGoBack}>Voltar para o mapa</button>
      </div>
      <img src={successImage} alt="Cadastro feito com sucesso"/>
    </div>
  );
}
