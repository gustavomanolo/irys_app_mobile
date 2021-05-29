import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function covid() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/covid-mask-256.png")}
        style={styles.imgCovid}
      />

      <Text style={styles.textCovid}>Covid Test</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: "#fff",
  },
  imgCovid: {
    width: 150,
    height: 150
  },
  textCovid: {
    marginTop: 20,
    fontSize: 30,
    color: '#444'
  }
});