import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import * as Localization from "expo-localization";

import i18n from "../../lib/i18n/i18n";
const langCode = Localization.locale.substr(0, 2);

export default function Subcategories({route, navigation}) {
  const subCategories = route.params.item.subcategories || {}


  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.catTitle}>{i18n.t("price_gouging_title")}</Text>
        <Text style={styles.catSubtitle}>{i18n.t("price_gouging_subtitle")}</Text>
      </View>
      <FlatList
        data={Object.keys(subCategories)}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                console.log('-> sub click')
                // const subcat =
                //   typeof categories[item].subcategories !== "undefined";
                // const stackItem = subcat === true ? "subcategories" : "covid";

                // navigation.navigate(stackItem, {
                //   item: categories[item],
                // });
              }}
            >
              <ListItem bottomDivider>
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
