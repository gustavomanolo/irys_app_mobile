import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-elements";

// i18n
import i18n from "../../lib/i18n/i18n";

const DESC_MAX_LENGTH = 200;
const DESC_MAX_WORDS = 29;

// Context
import { DataContext } from "../../context/DataContext";

export default function Description({ navigation }) {
  // Use App context
  const { dataContext, setDataContext } = useContext(DataContext);

  // State hooks
  const [description, setDescription] = useState("");

  const goToNextStep = () => {
    if (description.trim() !== "") {
      // Set context description
      setDataContext({
        ...dataContext,
        description: description,
      });

      // Go to next step
      navigation.navigate("userlocation", {});
    } else {
      // Error: must provide description
      Alert.alert(i18n.t("error_desc"));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}>{i18n.t("price_gouging_title")}</Text>
      <Text style={styles.textSubtitle}>{i18n.t("description_desc")}</Text>

      <TextInput
        style={styles.inputTextDesc}
        multiline={true}
        numberOfLines={5}
        placeholder={`${i18n.t("description_input")}.`}
        maxLength={DESC_MAX_LENGTH}
        value={description}
        onChangeText={(text) => {
          const wLength = text.trim().split(" ").length;

          // Check limit words
          if (wLength <= DESC_MAX_WORDS) {
            setDescription(text);
          } else {
            let nText = text.trim().split(" ").slice(0, DESC_MAX_WORDS);
            nText = nText.join(" ");
            setDescription(nText);
          }
        }}
      />

      <View style={styles.ViewButtons}>
        <Button
          title={i18n.t("back")}
          type="outline"
          buttonStyle={{
            paddingHorizontal: 20,
            borderWidth: 1,
            borderColor: "#099798",
          }}
          titleStyle={{ color: "#28B29E" }}
          onPress={() => {
            navigation.goBack();
          }}
        />

        <Button
          title={i18n.t("next")}
          buttonStyle={{
            paddingHorizontal: 20,
            borderWidth: 1,
            borderColor: "#197C89",
            backgroundColor: "#099798",
          }}
          onPress={() => {
            goToNextStep();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    padding: 10,
  },
  inputTextDesc: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 5,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: 18,
    minHeight: 150,
  },
  textTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 5,
  },
  textSubtitle: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
  },
  ViewButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    paddingVertical: 10,
  },
});
