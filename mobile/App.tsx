import React, { createContext, useState, useEffect } from 'react';

import { useFonts} from 'expo-font';
import { Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';

import Routes from './src/routes';

export default function App() {
  const UserContext = createContext({});
  const [ token, setToken ] = useState('');

  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });

  if(!fontsLoaded) {
    return null;
  }

  return (
    <UserContext.Provider value={{ token, setToken }}>
      <Routes />
    </UserContext.Provider>
  );
}


