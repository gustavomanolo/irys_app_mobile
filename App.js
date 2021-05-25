import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// import { StatusBar } from "expo-status-bar";

// Import Screens
import CategoriesStack from "./screens/CategoriesStack";
import Categories from "./screens/Categories";
import Reports from "./screens/Reports";

// i18n
import i18n from "./lib/i18n/i18n";

// Create Tab
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Reports") {
              iconName = focused ? "alert-circle" : "alert-circle-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#54CC9D",
          inactiveTintColor: "#555",
        }}
      >
        <Tab.Screen
          name="Home"
          component={CategoriesStack}
          options={{ title: i18n.t("home") }}
        />
        <Tab.Screen
          name="Reports"
          component={Reports}
          options={{ title: i18n.t("reports") }}
        />
      </Tab.Navigator>
    </NavigationContainer>

    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <Text>{i18n.t('name')}</Text>
    //   <StatusBar style="auto" />
    // </View>
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
