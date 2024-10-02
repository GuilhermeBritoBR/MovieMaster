import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Button,
  Dimensions,
} from "react-native";
//importando os icones
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AvaliaçaoModal = ({ visible, onClose, id, dados }) => {
    const navigation = useNavigation("");
    
  const { height } = Dimensions.get("window"); // Obter a altura da tela
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.modalContainer,
          { position: "absolute", bottom: 0, left: 0, height: height * 0.6 },
        ]}
      >
        <View style={styles.modalContent1}>
          <Text style={styles.titulofilme}>Akira</Text>
          <Text style={styles.datafilme}>1998</Text>
        </View>
        <View style={styles.modalContent2}>
          <View style={styles.elementos}>
            <TouchableOpacity style={styles.iconesBotao}>
              <Feather name="eye" size={45} color="#bbccdd" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconesBotao}>
              <AntDesign name="hearto" size={45} color="#bbccdd" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconesBotao}>
              <MaterialCommunityIcons
                name="clock-plus-outline"
                size={45}
                color="#bbccdd"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.modalContent3}>
          <View style={styles.elementos}>
            {[...Array(5)].map((_, index) => (
              <TouchableOpacity key={index}>
                <Entypo name="star" size={45} color="#bbccdd" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <TouchableOpacity onPress={()=> {navigation.navigate('PublicarPostagem',{id: id, dados: dados});{onClose}}}>
            <Text>
            FAZER RESENHA
            </Text>
            </TouchableOpacity>
        <View style={styles.modalContent4}>
          <Button title="Fechar" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: "60%", // Ocupar 60% da altura da tela
    backgroundColor: "#445566",
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
  },
  modalContent1: {
    width: "100%",
    height: "10%",
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  modalContent2: {
    width: "100%",
    height: "20%",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    justifyContent: "center", // Centraliza verticalmente
    alignItems: "center", // Centraliza horizontalmente
  },
  elementos: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconesBotao: {
    marginHorizontal: 20,
  },
  modalContent3: {
    height: "20%",
    width: "100%",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    justifyContent: "center", // Centraliza verticalmente
    alignItems: "center", // Centraliza horizontalmente
  },
  modalContent4: {
    height: "50%",
    width: "100%",
  },
});

export default AvaliaçaoModal;
