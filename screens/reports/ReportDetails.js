import React from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import { ListItem } from "react-native-elements";
import MapView, { Marker } from "react-native-maps";

export default function ReportDetails({ route }) {
  // Get route params
  const reportDetails = route.params.report;

  return (
    <ScrollView style={styles.scrollView}>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={styles.itemTitle}>
            {reportDetails.description}
          </ListItem.Title>
          <ListItem.Subtitle style={styles.itemSubtitle}>
            Description
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={styles.itemTitle}>
            {reportDetails.categoryId}
          </ListItem.Title>
          <ListItem.Subtitle style={styles.itemSubtitle}>
            Category
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
      <ListItem bottomDivider>
        <ListItem.Content>
          <ListItem.Title style={styles.itemTitle}>
            {reportDetails.subcategoryId}
          </ListItem.Title>
          <ListItem.Subtitle style={styles.itemSubtitle}>
            Subcategory
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>

      <MapView
        style={styles.map}
        region={{
          latitude: reportDetails.location.coordinates[1],
          latitudeDelta: 0.1,
          longitude: reportDetails.location.coordinates[0],
          longitudeDelta: 0.1,
        }}
      >
        <Marker
          coordinate={{
            latitude: reportDetails.location.coordinates[1],
            longitude: reportDetails.location.coordinates[0],
          }}
          title={"Location"}
        />
      </MapView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 42,
  },
  itemTitle: {
    fontSize: 20,
    color: "#333",
  },
  itemSubtitle: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#888",
  },
  map: {
    width: Dimensions.get("window").width,
    height: 400
  }
});
