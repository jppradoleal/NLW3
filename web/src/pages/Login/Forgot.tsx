import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom'
import logotipo from '../../images/Logotipo.svg';
import { FiArrowLeft } from 'react-icons/fi';
import '../../styles/pages/Login/forgot.css'
import api from '../../services/api';

export default function Forgot() {
  const history = useHistory();

  const [email, setEmail] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      await api.post('/forgot', { email });
    } catch {
      alert('Erro ao enviar token');
    }
  }
  return (
    <div id="page-forgot">
      <div className="banner">
        <img src={logotipo} alt="happy"/>
        <div className="location">
          <strong>Jacareí</strong>
          <span>São Paulo</span>
        </div>
      </div>
      <aside className="forgot-area">
        <button className="goBackButton" onClick={() => history.push('/login')}>
          <FiArrowLeft size={24} color="#15C3D6" className="icon"/>
        </button>
        <h1>Esqueci a senha</h1>
        <p>Sua redefinição de senha será enviada para o email cadastrado.</p>
        <form onSubmit={handleSubmit}>
          <label>E-mail</label>
          <input 
            type="text"
            value={email}
            onChange={event => setEmail(event.target.value)} 
          />

          <button disabled>Enviar</button>
        </form>
      </aside>
    </div>
  );
};