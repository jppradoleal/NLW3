import React, { FormEvent, useState, useContext } from 'react';
import logotipo from '../../images/Logotipo.svg';
import { FiArrowLeft, FiCheck } from 'react-icons/fi'
import '../../styles/pages/Login/login.css'
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';
import UserContext from '../../context/UserContext';

export default function Login() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const {setToken} = useContext(UserContext);

  async function handleSubmit(event:FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post('/login', { 
        email, password
      })
      
      const { token: receivedToken } = response.data;
      if(remember) {
        await localStorage.setItem('token', receivedToken)
      }
      setToken(receivedToken);
      history.push('/dashboard');
    } catch {
      alert('User not found');
    }
  }

  return (
      <div id="page-login">
        <div className="banner">
          <img src={logotipo} alt="happy"/>
          <div className="location">
            <strong>Jacareí</strong>
            <span>São Paulo</span>
          </div>
        </div>
        <aside className="loginArea">
          <button className="goBackButton" onClick={() => history.push('/app')}>
            <FiArrowLeft size={24} color="#15C3D6" className="icon"/>
          </button>
          <h1>Fazer Login</h1>
          <form onSubmit={handleSubmit}>
            <label>E-mail</label>
            <input 
              type="email" 
              value={email}
              onChange={event => setEmail(event.target.value)}
            />

            <label>Senha</label>
            <input 
              type="password" 
              value={password}
              onChange={event => setPassword(event.target.value)}
            />

            <footer>
              <div className="checkbox-remember">
                <input 
                  type="checkbox" 
                  id="remember"
                  checked={remember}
                  onChange={event => {
                    setRemember(!remember);
                  }}
                />
                <label htmlFor="remember">
                  <span>
                    <FiCheck color="#FFF" size={16} />
                  </span>
                  Lembrar-me
                </label>
              </div>
              <Link className="forgot-pass" to="/forgot">Esqueci minha senha</Link>
            </footer>

            <button disabled={!(password && email)}>Entrar</button>
          </form>
        </aside>
      </div>
  );
};