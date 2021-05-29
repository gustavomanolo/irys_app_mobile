import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { ListItem } from "react-native-elements";
import * as Localization from "expo-localization";
import { FontAwesome5 } from '@expo/vector-icons';

import i18n from "../../lib/i18n/i18n";
const langCode = Localization.locale.substr(0, 2);

// Context
import { DataContext } from "../../context/DataContext";

// Object with subcategories => icons (HARD-CODED)
// TODO: Update API to get this from server
const OBJ_SUB_ICONS = {
  buildingMaterials: 'hammer',
  constructionTools: 'wrench',
  food: 'utensils',
  fuel: 'gas-pump',
  lodging: 'bed',
  medicine: 'medkit',
  other: 'question-circle',
}


export default function Subcategories({ route, navigation }) {
  // Use App context
  const { dataContext, setDataContext } = useContext(DataContext);

  // Get route params
  const subCategories = route.params.item.subcategories || {};
  const requireDesc = route.params.item.requireDescription || false;
  const categoryId = route.params.category_id;

  useEffect(() => {
    // Update data context
    setDataContext({
      ...dataContext,
      category: categoryId,
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.catTitle}>{i18n.t("price_gouging_title")}</Text>
        <Text style={styles.catSubtitle}>
          {i18n.t("price_gouging_subtitle")}
        </Text>
      </View>
      <FlatList
        data={Object.keys(subCategories)}
        renderItem={({ item }) => {
          const subcatIcon = (item in OBJ_SUB_ICONS) ? OBJ_SUB_ICONS[item] : 'question-circle'

          return (
            <TouchableOpacity
              onPress={() => {
                // Set context subcategory
                setDataContext({
                  ...dataContext,
                  subcategory: item,
                });

                if (requireDesc === true) {
                  // Navigate to description
                  navigation.navigate("description", {});
                } else {
                  // Navigate to map
                  navigation.navigate("userlocation", {});
                }
              }}
            >
              <ListItem bottomDivider>
                <FontAwesome5 name={subcatIcon} size={24} color="#444" />
                <ListItem.Content>
                  <ListItem.Title>
                    {subCategories[item].name[langCode]}
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  titleContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  catTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 5,
  },
  catSubtitle: {
    fontSize: 16,
    color: "#333",
    marginVertical: 5,
  },
});
