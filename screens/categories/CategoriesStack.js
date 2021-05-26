import React from "react";
import { Image, StyleSheet } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import Categories from "./Categories";
import Subcategories from "./Subcategories";
import Covid from "./covid/Covid";

// i18n
import i18n from "../../lib/i18n/i18n";

// Define Stack Navigator
const Stack = createStackNavigator();

export default function () {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="categories"
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
              source={require("../../assets/irys_logo_white.png")}
              style={styles.imgLogo}
            />
          ),
        })}
      />
      <Stack.Screen
        name="subcategories"
        component={Subcategories}
        options={({ navigation, route }) => ({
          // headerShown: true,
          // headerBackTitle: i18n.t("back"),
          title: i18n.t("subcategories"),
          // headerTransparent: false,
          headerBackTitleVisible: false,
          // headerTitle: "Historial",
          headerStyle: {
            backgroundColor: "#27B29E",
          },
          headerTintColor: "#fff",
        })}
      />
      <Stack.Screen
        name="covid"
        component={Covid}
        options={({ navigation, route }) => ({
          title: "Covid",
          headerBackTitleVisible: false,
          headerShown: true,
          headerStyle: {
            backgroundColor: "#27B29E",
          },
          headerTintColor: "#fff"
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
