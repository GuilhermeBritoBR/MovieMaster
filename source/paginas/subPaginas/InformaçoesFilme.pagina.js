import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

const InformaçoesFilme = () => {
  return (
    <View style={styles.container}>
      {/* 20% da tela para a imagem do filme */}
      <View style={[styles.imagemContainer, { height: height * 0.2 }]}>
        <Image 
          source={{ uri: "https://www.comboinfinito.com.br/principal/wp-content/uploads/2020/09/akira-4k.jpg" }} 
          style={styles.imagem} 
        />
      </View>

      {/* Container para informações do filme e imagem do lado */}
      <View style={[styles.infoContainer, { height: height * 0.2 }]}>
        <View style={styles.textContainer}>
          <Text style={styles.titulo}>Akira</Text>
          <Text style={styles.detalhes}>Dirigido por</Text>
          <Text style={styles.autor}>Katsuhiro Otomo</Text>
          <View style={styles.dataminuto}>
            <Text style={styles.detalhes}>1998</Text>
            <Text style={styles.detalhes}>   128 mins</Text>
          </View>
        </View>
        <Image 
          source={{ uri: "https://a.ltrbxd.com/resized/sm/upload/xk/25/lu/0m/mi2Axov7Hy20wieoGfrbqDWLjSr-0-1000-0-1500-crop.jpg?v=dd1e90619a" }} 
          style={styles.infoImage} 
        />
      </View>

      {/* 15% da tela para a sinopse */}
      <View style={[styles.sinopseContainer, { height: height * 0.15 }]}>
        <Text style={styles.sinopse}>A secret military project endangers Neo-Tokyo when it turns a biker gang member into a rampaging psychic psychopath that only two teenagers and a group of psychics can stop.</Text>
      </View>

      {/* Reviews */}
      <View style={{ flex: 1 }}>
        <Text style={{ color: 'white' }}>Reviews</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  imagemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  textContainer: {
    flex: 1,
  },
  infoImage: {
    width: 87,
    height: 112,
    marginLeft: 10,
  },
  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  detalhes: {
    fontSize: 16,
    marginVertical: 2,
    color: '#99aabb',
  },
  autor: {
    fontSize: 16,
    marginVertical: 2,
    color: '#99aabb',
    fontWeight: 'bold',
  },
  sinopseContainer: {
    padding: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  sinopse: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#99aabb',
  },
  dataminuto: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  button:{
borderRadius:180,
  },
});

export default InformaçoesFilme;
