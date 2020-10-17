import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import successImage from '../../images/Success.png';

export default function SuccessNotify() {
  const navigation = useNavigation();

  function handleOkButton() {
    navigation.navigate('OrphanagesMap');
  }

  return (
    <View style={styles.container}>
      <Image 
        source={successImage}
        style={styles.successImage}
      />
      <View style={styles.successText}>
        <Text style={styles.header}>Ebaaa!</Text>
        <Text style={styles.paragraph}>O cadastro deu certo e foi enviado ao administrador para ser aprovado. Agora é só esperar :)</Text>
      </View>
      <TouchableOpacity 
        style={styles.okButton}
        onPress={handleOkButton}
      >
        <Text style={styles.okButtonText}>
          Ok
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#39CC83',
  },
  successImage: {

  },
  successText: {
    marginTop: 32,
    alignItems: 'center',
  },
  header: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 40,
    color: '#fff',
    marginBottom: 18
  },

  paragraph: {
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    width: 350,
  },
  okButton: {
    width: 120,
    height: 56,
    backgroundColor: '#19C06D',
    marginTop: 24,
    borderRadius: 20,
  },
  okButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 56,
    color: '#fff'
  }
})