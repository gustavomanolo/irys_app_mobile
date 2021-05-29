import React, { useState } from "react";
import { View, Text, Modal, StyleSheet, Alert } from "react-native";
import { Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

// i18n
import i18n from "../lib/i18n/i18n";

// lib
import { getUserLocation } from "../lib/lib";

export default function ModalLocation({
  showModal,
  successCallback,
  errorCallback,
}) {
  const [btnLoading, setBtnLoading] = useState(false);

  return (
    <Modal animationType="slide" transparent={true} visible={showModal}>
      <View style={styles.modalParent}>
        <View style={styles.modalView}>
          <Ionicons name="location" size={40} color="#75E4B9" />

          <Text style={styles.modalTextTitle}>{i18n.t("user_loc_title")}</Text>
          <Text style={styles.modalTextDesc}>
            {i18n.t("user_loc_subtitle")}
          </Text>

          <Button
            title={i18n.t("ok")}
            buttonStyle={{
              paddingHorizontal: 20,
              backgroundColor: "#75E4B9",
            }}
            titleStyle={{ color: "#141414" }}
            loading={btnLoading}
            disabled={btnLoading}
            onPress={() => {
              // Set loading status
              setBtnLoading(true);

              // Get user's location
              getUserLocation()
                .then((resL) => {
                  // OK getting user's location
                  setBtnLoading(false);
                  successCallback(resL) // OK callback
                })
                .catch((errL) => {
                  // Error: requestin user's location
                  console.log("Error: getting user location ", errL);
                  Alert.alert("Error", i18n.t("error_location"));

                  setBtnLoading(false);
                  errorCallback(resL) // Error callback
                });
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalParent: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 22,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalView: {
    width: "90%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTextTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  modalTextDesc: {
    marginVertical: 10,
    fontSize: 17,
    color: "#333",
    textAlign: "center",
  },
});
