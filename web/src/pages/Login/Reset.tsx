import React, { FormEvent, useState } from 'react';
import { useParams } from 'react-router-dom';
import logotipo from '../../images/Logotipo.svg';
import api from '../../services/api';
import '../../styles/pages/Login/reset.css'

interface ResetParams {
  resetToken: string;
}

export default function Reset() {
  const {resetToken: token} = useParams<ResetParams>();

  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  async function handleSubmit(event: FormEvent) {
    if(password === passwordConfirmation) {
      try {
        await api.post('/reset', { 
          password,
          token
        })
      } catch {
        alert('Error resetting password');
      }
    } else {
      alert('Password are\'nt equal');
    }
  }

  return (
    <div id="page-reset">
      <div className="banner">
        <img src={logotipo} alt="happy"/>
        <div className="location">
          <strong>Jacareí</strong>
          <span>São Paulo</span>
        </div>
      </div>
      <aside className="reset-area">
        <h1>Redefinição de Senha</h1>
        <p>Escolha uma nova senha para você acessar o dashboard do Happy.</p>
        <form onSubmit={handleSubmit}>
          <label>Nova senha</label>
          <input 
            type="password" 
            value={password}
            onChange={event => setPassword(event.target.value)}
          />

          <label>Repita a senha</label>
          <input 
            type="password" 
            value={passwordConfirmation}
            onChange={event => setPasswordConfirmation(event.target.value)}
          />

          <button disabled>Enviar</button>
        </form>
      </aside>
    </div>
  );
};