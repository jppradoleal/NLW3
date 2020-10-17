import React from 'react';
import logotipo from '../../images/Logotipo.svg';
import '../../styles/pages/Login/reset.css'

export default function Reset() {
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
        <form>
          <label>Nova senha</label>
          <input type="password" />

          <label>Repita a senha</label>
          <input type="password" />

          <button disabled>Enviar</button>
        </form>
      </aside>
    </div>
  );
};