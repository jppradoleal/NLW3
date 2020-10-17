import React, { createContext, Dispatch, SetStateAction, useState } from 'react';

import './styles/global.css';
import 'leaflet/dist/leaflet.css';

import Routes from './routes';

interface UserContextObject {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
}

export const UserContext = createContext<UserContextObject>({} as UserContextObject);

function App() {

  const [token, setToken] = useState('');
  return (
    <UserContext.Provider value={{token, setToken}}>
      <Routes />
    </UserContext.Provider>
  );
}

export default App;