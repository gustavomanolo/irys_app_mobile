import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import * as Localization from "expo-localization";

const langCode = Localization.locale.substr(0, 2);

// API
import { getCategories } from "../lib/api/api";

export default function Categories() {
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
      <FlatList
        data={Object.keys(categories)}
        renderItem={({ item }) => {
          return (
            <ListItem bottomDivider>
              <Avatar source={{ uri: categories[item].icon }} />
              <ListItem.Content>
                <ListItem.Title>
                  {categories[item].name[langCode]}
                </ListItem.Title>
                <ListItem.Subtitle>Subtitle</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
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
    backgroundColor: "#fefefe"
  },
});
