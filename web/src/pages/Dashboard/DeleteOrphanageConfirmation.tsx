import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import UserContext from '../../context/UserContext';

import warningImage from '../../images/warning-image.svg';
import api from '../../services/api';
import '../../styles/pages/delete-notify.css';

interface LocationType {
  id: string;
  name: string;
}

export default function DeleteOrphanageConfirmation() {
  const {goBack} = useHistory();
  const location = useLocation<LocationType>();
  const {token} = useContext(UserContext);

  const [ name, setName ] = useState('');

  useEffect(() => {
    setName(location.state.name);
  }, [location.state.name]);

  async function handleDelete() {
    try {
      await api.delete(`/orphanages/delete/${location.state.id}`, {
        headers: {
          'Authorization': 'Bearer ' + String(token)
        }
      });
    } catch(error) {
      alert('Error deleting, check browser log for more details.')
      console.log(error.response);
      return;
    }
    alert('Successfully deleted');
    goBack();
  }

  return (
    <div id="warning-page">
      <div className="text-container">
        <h1>Excluir!</h1>
        <p>Você tem certeza que quer excluir o orfanato {name}?</p>
        <div className="btn-group">
          <button onClick={() => goBack()}>Voltar para o dashboard</button>
          <button onClick={handleDelete}>DELETAR</button>
        </div>
      </div>
      <img src={warningImage} alt="Tem certeza que quer excluir?"/>
    </div>
  )
}
