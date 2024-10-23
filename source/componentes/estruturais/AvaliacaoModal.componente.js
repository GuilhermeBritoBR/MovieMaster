import React, { useState } from "react"; // Importando useState
import { View, Text, StyleSheet, Modal, Dimensions } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
const AvaliacaoModal = ({ visible, onClose, id, dados }) => {
  useEffect(()=>{},[onClose, visible])
  const navigation = useNavigation();
  const { height } = Dimensions.get("window");

  const [olhoPreenchido, setOlhoPreenchido] = useState(false); // Estado para controlar o ícone
  const clicarNoOlho = () => {
    setOlhoPreenchido(!olhoPreenchido); // Alterna o estado
  };

  const [coracaoPreenchido, setCoracaoPreenchido] = useState(false); // Estado para controlar o ícone
  const clicarNoCoracao = () => {
    setCoracaoPreenchido(!coracaoPreenchido); // Alterna o estado
  };

  const [relogioPreenchido, setRelogioPreenchido] = useState(false); // Estado para controlar o ícone
  const clicarNoRelogio = () => {
    setRelogioPreenchido(!relogioPreenchido); // Alterna o estado
  };

  const [estrelaPreenchida, setEstrelaPreenchida] = useState(0); // Estado para controlar o ícone
  const clicarNaEstrela = (index) => {
    setEstrelaPreenchida(index + 1); // Alterna o estado
  };

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
          <View style={styles.titulodata}>
            <Text style={styles.titulofilme}>Akira</Text>
            <Text style={styles.datafilme}>1998</Text>
          </View>
          <TouchableOpacity onPress={onClose} style={styles.fecharmodal}>
            <AntDesign name="arrowleft" size={24} color="#bbccdd" />
          </TouchableOpacity>
        </View>
        <View style={styles.modalContent2}>
          <View style={styles.elementos}>
            {/* Olho */}
            <TouchableOpacity style={styles.iconesBotao} onPress={clicarNoOlho}>
              <Ionicons
                name={olhoPreenchido ? "eye" : "eye-off-outline"} // Muda o ícone baseado no estado
                size={45}
                color={olhoPreenchido ? "#ab49cc" : "#bbccdd"} // Muda a cor dependendo do estado
              />
            </TouchableOpacity>
            {/* Coração */}
            <TouchableOpacity
              style={styles.iconesBotao}
              onPress={clicarNoCoracao}
            >
              <Ionicons
                name={coracaoPreenchido ? "heart-sharp" : "heart-outline"} // Muda o ícone baseado no estado
                size={45}
                color={coracaoPreenchido ? "#ab49cc" : "#bbccdd"} // Muda a cor dependendo do estado
              />
            </TouchableOpacity>
            {/* Watchlist */}
            <TouchableOpacity
              style={styles.iconesBotao}
              onPress={clicarNoRelogio}
            >
              <MaterialCommunityIcons
                name={relogioPreenchido ? "clock-plus" : "clock-plus-outline"} // Muda o ícone baseado no estado
                size={45}
                color={relogioPreenchido ? "#ab49cc" : "#bbccdd"} // Muda a cor dependendo do estado
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.modalContent3}>
          <View style={styles.elementos}>
            {[...Array(5)].map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => clicarNaEstrela(index)}
              >
                <Entypo
                  name={index < estrelaPreenchida ? "star" : "star-outlined"}
                  size={45}
                  color={index < estrelaPreenchida ? "#ab49cc" : "#bbccdd"}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.modalContent4}>
          {/* Fazer Review */}
          <TouchableOpacity
           onPress={()=> {{onClose()};{navigation.navigate('PublicarPostagem',{id: id, dados: dados});}}}
            style={styles.addreview}
          >
            <Ionicons name="add" size={24} color="#bbccdd" />
            <Text style={styles.reviewText}>Fazer Review</Text>
          </TouchableOpacity>

          {/* Adicionar na Lista */}
          <TouchableOpacity
            onPress={()=> {{onClose()};{navigation.navigate('AdicionarLista',{id: id, dados: dados})}}}
            style={styles.addreview}
          >
            <Entypo name="add-to-list" size={24} color="#bbccdd" />
            <Text style={styles.reviewText}>Adicionar Na Lista</Text>
          </TouchableOpacity>
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
    height: "60%",
    backgroundColor: "#1A1A1A",
    bottom: 0,
    padding: 10,
  },
  modalContent1: {
    width: "100%",
    height: "10%",
    borderBottomColor: "#bbccdd",
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  titulofilme: {
    color: "#bbccdd",
    fontSize: 20,
    fontWeight: "bold",
  },
  datafilme: {
    color: "#bbccdd",
    fontSize: 18,
  },
  modalContent2: {
    width: "100%",
    height: "20%",
    borderBottomColor: "#bbccdd",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
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
    borderBottomColor: "#bbccdd",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent4: {
    height: "50%",
    width: "100%",
    marginHorizontal: 20,
    justifyContent: "flex-start",
    padding: 10,
  },
  fecharmodal: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 30, // Ajuste a posição para a esquerda
  },
  addreview: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10, // Espaçamento entre os botões
  },
  reviewText: {
    color: "#bbccdd",
    marginLeft: 10,
  },
  titulodata: {
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
});

export default AvaliacaoModal;
