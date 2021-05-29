import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import Reports from './Reports'
import ReportDetails from './ReportDetails'

// i18n
import i18n from "../../lib/i18n/i18n";

// Define Stack Navigator
const Stack = createStackNavigator();

export default function () {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="reports"
        component={Reports}
        options={({ navigation, route }) => ({
          title: i18n.t('my_reports'),
          headerShown: true,
          headerStyle: {
            backgroundColor: "#27B29E",
          },
          headerTintColor: "#fff",
        })}
      />
      <Stack.Screen
        name="reportdetails"
        component={ReportDetails}
        options={({ navigation, route }) => ({
          title: i18n.t("report_details"),
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