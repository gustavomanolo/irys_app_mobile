import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import * as Localization from "expo-localization";

import i18n from "../../lib/i18n/i18n";
const langCode = Localization.locale.substr(0, 2);

// API
import { getCategories } from "../../lib/api/api";

export default function Categories({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [categories, setCategories] = useState([]);

  const refreshList = () => {
    setRefreshing(true);
    // Fetch data
    getCategories()
      .then((response) => response.json())
      .then((json) => {
        // console.log("-> res cat: ", json);
        setCategories(json.categories);
        setRefreshing(false);
      })
      .catch((error) => {
        console.error(error);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    refreshList();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.catTitle}>{i18n.t("categories_title")}</Text>
        <Text style={styles.catSubtitle}>{i18n.t("categories_subtitle")}</Text>
      </View>
      <FlatList
        data={Object.keys(categories)}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                const subcat =
                  typeof categories[item].subcategories !== "undefined";
                const stackItem = subcat === true ? "subcategories" : "covid";

                navigation.navigate(stackItem, {
                  item: categories[item],
                });
              }}
            >
              <ListItem bottomDivider>
                <Avatar source={{ uri: categories[item].icon }} />
                <ListItem.Content>
                  <ListItem.Title>
                    {categories[item].name[langCode]}
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
        refreshing={refreshing}
        onRefresh={() => {
          refreshList();
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
