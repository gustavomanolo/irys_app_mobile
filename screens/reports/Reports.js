import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Constants from "expo-constants";
import { gql, useQuery } from "@apollo/client";
import { ListItem } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

// lib
import i18n from "../../lib/i18n/i18n";

// Components
import Loading from "../../components/Loading";

// GraphQL query clients
const QUERY_REPORTS = gql`
  query getReports($deviceId: String!) {
    getReports(deviceId: $deviceId) {
      id
      deviceId
      categoryId
      subcategoryId
      description
      location {
        type
        coordinates
      }
    }
  }
`;

export default function Reports({navigation}) {
  const { loading, error, data, refetch } = useQuery(QUERY_REPORTS, {
    variables: { deviceId: Constants.installationId },
  });

  if (loading) return <Loading />;

  if (error) {
    <View style={styles.container}>
      <Text style={styles.textLoading}>Error loading data... {error}</Text>
    </View>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Ionicons name="folder-open-outline" size={40} color="#333" />
            <Text style={styles.emptyText}>{i18n.t("reports_empty")}</Text>
          </View>
        )}
        data={data.getReports}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("reportdetails", {
                  report: item
                });
              }}
            >
              <ListItem bottomDivider>
                <Ionicons
                  name="ios-alert-circle-outline"
                  size={24}
                  color="#333"
                />
                <ListItem.Content>
                  <ListItem.Title style={styles.listTitle}>
                    {item.description}
                  </ListItem.Title>
                  <ListItem.Subtitle style={styles.listSubtitle}>
                    {item.subcategoryId}
                  </ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        refreshing={loading}
        onRefresh={() => {
          refetch();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
  },
  listTitle: {
    fontSize: 18,
    color: "#333",
    fontWeight: 'bold'
  },
  listSubtitle: {
    fontSize: 15,
    color: "#444",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  emptyText: {
    fontSize: 20,
    color: "#333",
    marginTop: 10,
  },
});
