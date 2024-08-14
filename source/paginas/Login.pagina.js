import React from 'react';
import { View, TextInput, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Login() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../arquivos/imagensDeFundo/shawshank.jpg')}
        style={styles.image}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.9)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
        >
          <Text style={styles.title}>Entre No Movie Master!</Text>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.areadoinput}>
        <TextInput 
          style={styles.input}
          placeholder='Nome de Usuário/Email'
          keyboardType='email-address'
          placeholderTextColor='white'
        />
        <TextInput 
          style={styles.input}
          placeholder='Senha'
          secureTextEntry
          placeholderTextColor='white'
        />
        <TouchableOpacity style={styles.button} onPress={() => console.log("Sign in Pressionado!")}>
          <LinearGradient 
            colors={['#9754CB', '#6237A0']} 
            start={{ x: 0, y: 0 }}
            end={{ x: 0.68, y: 0.68 }} 
            style={styles.btnDegradw}
          >
            <Text style={styles.buttonText}>Entrar</Text>
          </LinearGradient>
        </TouchableOpacity>
       
        <TouchableOpacity style={styles.btnredirecionamento} onPress={() => console.log("Cadastro Pressionado!")}>
          <Text style={styles.buttonText}>Cadastro</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',  
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20, 
  },
  areadoinput: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20, 
    backgroundColor: 'black',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  input: {
    height: 50,
    width: '100%',
    maxWidth: 350, 
    borderBottomWidth: 2, 
    borderBottomColor: 'white',
    marginVertical: 10,
    color: 'white',
    paddingHorizontal: 10,
    backgroundColor: 'transparent', 
  },
  button: {
    width: 250,
    borderRadius: 15,
    backgroundColor: '#6237A0',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  btnredirecionamento: {
    paddingTop: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  btnDegradw:{
    width: 250,
    backgroundColor: '#6237A0',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderRadius: 15,
  },
});
