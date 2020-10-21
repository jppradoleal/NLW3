import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import firstImage from '../images/Ilustra01.png';
import secondImage from '../images/Ilustra02.png';
import { Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

function NextButton({...props}) {
  return (
    <TouchableOpacity style={styles.nextButton} {...props}>
      <Feather name='arrow-right' size={25} color="#15C3D6"/>
    </TouchableOpacity>
  )
}

function DotComponent() {
  return (
    <View />
  )
}

export default function HappyOnboarding() {
  const navigation = useNavigation();
  
  async function handleDone() {
    await AsyncStorage.setItem('hasOnboarded', 'true');


    navigation.navigate('OrphanagesMap');
  }

  return (
    <Onboarding
      containerStyles={styles.container}
      showSkip={false}
      NextButtonComponent={NextButton}
      DotComponent={DotComponent}
      DoneButtonComponent={NextButton}
      bottomBarColor="#F2F3F5"
      onDone={handleDone}

      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={firstImage} />,
          title: 'Leve felicidade para o mundo',
          subtitle: 'Visite orfanatos e mude o dia de muitas crianças',
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle
        },
        {
          backgroundColor: '#fff',
          image: <Image source={secondImage} />,
          title: '',
          subtitle: (
            <View style={styles.secondSubtitleContainer}>
              <Text style={styles.secondSubtitle}>
                Escolha um orfanato no mapa e faça uma visita
              </Text>
            </View>
          ),
        },
      ]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F2F3F5',
  },
  title: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 48,
    color: '#0089A5',
    lineHeight: 48,
    textAlign: 'left',
    width: 217,
    marginLeft: 46,
  },
  subtitle: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 20,
    color: '#5C8599',
    width: 238,
    textAlign: 'left',
    marginLeft: 46,
  },
  secondSubtitleContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: -76
  },
  secondSubtitle: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 30,
    color: '#5C8599',
    textAlign: 'right',
    width: 253,
    marginRight: 46,
  },
  nextButton: {
    width: 56,
    height: 56,
    backgroundColor: '#D1EDF2',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 40,
    marginBottom: 16
  }
})