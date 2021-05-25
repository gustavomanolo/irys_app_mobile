import React from "react";
import { Image, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import Categories from "./Categories";
import Subcategories from "./Subcategories";

// Define Stack Navigator
const Stack = createStackNavigator();

export default function () {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={({ navigation, route }) => ({
          // title: "Categories",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#27B29E",
          },
          headerTintColor: "#fff",
          headerTitle: (props) => (
            <Image
              source={require("../assets/irys_logo_white.png")}
              style={styles.imgLogo}
            />
          ),
        })}
      />
      <Stack.Screen
        name="Subcategories"
        component={Subcategories}
        options={({ navigation, route }) => ({
          // headerShown: true,
          // headerBackTitle: i18n.t("back"),
          title: "Agregar nuevo",
          headerTransparent: false,
          headerBackTitleVisible: false,
          // headerTitle: "Historial",
          headerTintColor: "#333",
          headerTitleStyle: {
            // fontWeight: 'bold',
            color: "#333",
          },
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: "#fff",
  },
  imgLogo: {
    height: 25,
    width: 100,
    resizeMode: "contain",
  },
});
