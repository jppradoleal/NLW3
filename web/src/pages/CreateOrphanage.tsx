import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet'; 
import { FiPlus } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { motion } from 'framer-motion';

import happyMapIcon from '../utils/mapIcon';

import '../styles/pages/create-orphanage.css';
import Sidebar from '../components/Sidebar';
import api from '../services/api';

export default function CreateOrphanage() {

  
  const history = useHistory();
  
  const [ name, setName ] = useState('');
  const [ about, setAbout ] = useState('');
  const [ instructions, setInstructions ] = useState('');
  const [ opening_hours, setOpeningHours ] = useState('');
  const [ open_on_weekends, setOpenOnWeekends ] = useState(true);
  const [ whatsapp, setWhatsapp ] = useState('');
  const [ images, setImages ] = useState<File[]>([]);
  const [ previewImages, setPreviewImages ] = useState<string[]>([]);
  const [ isDarkMode, setIsDarkMode ] = useState(false);
  const [ position, setPosition ] = useState({ latitude: 0, longitude: 0 });
  const [ mapPosition, setMapPosition ] = useState({latitude: 0, longitude: 0 });

  function handleMapClick(event: LeafletMouseEvent) {
    const {lat, lng} = event.latlng;

    setPosition({
      latitude: lat,
      longitude: lng,
    })
  }

  useEffect(() => {
    setIsDarkMode(localStorage.getItem('darkMode') === 'true');

    navigator.geolocation.getCurrentPosition((data) => {
      const {latitude, longitude} = data.coords;

      setMapPosition({latitude, longitude});
    });

  }, [])
  
  function handleDarkModeButton() {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', String(!isDarkMode));
  }

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if(!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files); 

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map(image => URL.createObjectURL(image));

    setPreviewImages(selectedImagesPreview);
  }

  async function handleSubmit(event:FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    const data = new FormData();

    data.append('name', name);
    data.append('about', about);
    data.append('whatsapp', whatsapp);
    data.append('latitude', String(latitude));
    data.append('longitude', String(longitude));
    data.append('instructions', instructions);
    data.append('opening_hours', opening_hours);
    data.append('open_on_weekends', String(open_on_weekends));
    images.forEach(image => {
      data.append('images', image);
    })
    try {
      await api.post('orphanages', data);
    } catch(err) {
      console.error(err.response);
    }

    alert('Cadastro realizado com sucesso');
    history.push('/orphanages/create/success');

  }

  return (
    <div id="page-create-orphanage" className={isDarkMode ? 'dark' : ''}>
      <Sidebar isDarkMode={isDarkMode} handleDarkModeButton={handleDarkModeButton} />

      <main>
        <form 
          className="create-orphanage-form"
          onSubmit={handleSubmit}
        >
          <motion.fieldset
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1}}
          >
            <legend>Dados</legend>

            <Map 
              center={[mapPosition.latitude, mapPosition.longitude]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/${isDarkMode ? 'dark' : 'light'}-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
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
                  previewImages.map(image => {
                    return (
                      <motion.img 
                        src={image} 
                        alt={name} 
                        key={image} 

                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 1}}
                      />
                    )
                  })
                }
                <label className="new-image" htmlFor="image[]">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input type="file" id="image[]" multiple onChange={handleSelectImages}/>
            </div>
          </motion.fieldset>

          <motion.fieldset
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1}}
          >
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
          </motion.fieldset>

          <motion.button
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1}} 
            className="confirm-button" 
            type="submit"
          >
            Confirmar
          </motion.button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
