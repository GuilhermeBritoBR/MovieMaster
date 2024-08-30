import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView } from "react-native";

export default function Perfil() {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/profile.jpg')} // Caminho para a imagem local
        style={styles.profileImage}
      />
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
    },
  });