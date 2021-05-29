import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Apollo GraphQL
import { ApolloProvider } from "@apollo/client";
import client from './config/apollo'

// Import Screens
import CategoriesStack from "./screens/categories/CategoriesStack";
import ReportStack from "./screens/reports/ReportStack";

// i18n
import i18n from "./lib/i18n/i18n";

// Data context
import { DataProvider } from "./context/DataContext";

// Create Tab
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <DataProvider>
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
              component={ReportStack}
              options={{ title: i18n.t("reports") }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </DataProvider>
    </ApolloProvider>
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
