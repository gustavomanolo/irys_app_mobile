import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// i18n
import i18n from "../lib/i18n/i18n";

export default function MapSearchTop({ address = "" }) {
  return (
    <View style={styles.inputView}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="search" size={18} color="#333" />
        <Text style={styles.textLocation} numberOfLines={1}>
          {address !== "" ? address : i18n.t("location_search")}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputView: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textLocation: {
    marginLeft: 10,
    color: "#333",
    paddingRight: 10,
  },
});
