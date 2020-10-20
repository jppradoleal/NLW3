import React, { useState, useEffect, FormEvent, useContext } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'; 

import { useHistory, useLocation, useParams } from "react-router-dom";

import happyMapIcon from '../../utils/mapIcon';

import '../../styles/pages/create-orphanage.css';
import Sidebar from './Sidebar';
import api from '../../services/api';
import UserContext from '../../context/UserContext';
import { motion } from 'framer-motion';

interface UpdateParams {
  id: string;
}

interface ImageInterface {
  id: string;
  url: string;
}

interface LocationType {
  pending: boolean;
}

export default function Update() {
  const { id } = useParams<UpdateParams>();
  const location = useLocation<LocationType>();


  const { token } = useContext(UserContext);
  
  const history = useHistory();
  const [ position, setPosition ] = useState({ latitude: 0, longitude: 0 });

  const [oldName, setOldName] = useState('');
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  const [whatsapp, setWhatsapp] = useState('');
  const [images, setImages] = useState<ImageInterface[]>([]);

  function handleMapClick(event: LeafletMouseEvent) {
    const {lat, lng} = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    })
  }

  useEffect(() => {
      api.get(!location.state.pending ? `/orphanages/${id}` : `/orphanages/dashboard/${id}`, {
        headers: {
          'Authorization': 'Bearer ' + String(token)
        }
      })
        .then(response => {
          const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            whatsapp,
            images
          } = response.data;

          setName(name);
          setOldName(name);
          setPosition({
            latitude,
            longitude
          })
          setAbout(about);
          setInstructions(instructions);
          setOpeningHours(opening_hours);
          setOpenOnWeekends(open_on_weekends);
          setWhatsapp(whatsapp);
          setImages(images);  
        }).catch(error => {
          history.push('/dashboard');
          console.log(error.response);
        })
  }, [id, history, token, location.state.pending]);

  function handleSubmit(event:FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = {
      id,
      name,
      about,
      whatsapp,
      latitude,
      longitude,
      instructions,
      opening_hours,
      open_on_weekends,
    }
    api.put('orphanages/update', data, {
      headers: {
        'Authorization': 'Bearer ' + String(token)
      }
    }).then(() => {
      alert('Cadastro atualizado com sucesso');
      history.push('/dashboard/approved');
    }).catch(error => {
      console.log(error.response);
      history.push('/dashboard');
    })


  }

  return (
    <div id="page-create-orphanage">
      <Sidebar isOnApproved={true}/>

      <main>
        <p></p>
        <form 
          className="create-orphanage-form"
          onSubmit={handleSubmit}
        >
          <motion.fieldset
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1}}
          >
            <legend>Atualizar o Orfanato {oldName}</legend>

            <Map 
              center={[position.latitude,position.longitude]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              { position.latitude!== 0 && (
                  <Marker 
                    interactive={false} 
                    icon={happyMapIcon} 
                    position={[position.latitude, position.longitude]} 
                  />
                )
              }

              
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="name" 
                maxLength={300} 
                value={about}
                onChange={(event) => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {
                  images.map(image => {
                    return (
                      <img src={image.url} alt={name} key={image.id} />
                    )
                  })
                }
              </div>
            </div>
          </motion.fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions"
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input 
                id="opening_hours"
                value={opening_hours}
                onChange={(event) => setOpeningHours(event.target.value)} 
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button 
                  type="button"
                  className={!open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>

            <div className="input-block">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input 
                id="whatsapp"
                value={whatsapp}
                onChange={(event) => setWhatsapp(event.target.value)} 
              />
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
