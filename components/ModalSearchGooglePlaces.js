import React, { useState, useEffect, useRef } from "react";
import {
  Modal,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SearchBar, ListItem } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

// i18n
import i18n from "i18n-js";

// API
import { searchGooglePlaces } from "../lib/api/api";

export default function ModalLocSearchAutocomplete({
  showModal,
  setShowModal,
  setUserLoc,
  setMapRegion,
}) {
  const inputSearch = useRef(null); // ref to searchbar to focus
  const [searchPlaces, setSearchPlaces] = useState(""); // search value
  const [places, setPlaces] = useState([]); // Google places found
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    if (inputSearch.current !== null) {
      // Focus input search
      inputSearch.current.focus();
    }
  }, [showModal]);

  return (
    <Modal animationType="slide" transparent={false} visible={showModal}>
      <SafeAreaView style={styles.modalView}>
        <TouchableOpacity
          style={{ marginLeft: 10, marginBottom: 10, width: 30 }}
          onPress={() => {
            // Close current modal
            setShowModal(false);
          }}
        >
          <Ionicons name="close" size={26} color="#333" />
        </TouchableOpacity>

        <SearchBar
          showLoading={searchLoading}
          placeholder={i18n.t("search_address")}
          onChangeText={(text) => {
            setSearchPlaces(text);

            if (searchLoading === false) {
              setSearchLoading(true) // Set loading

              // Search places
              searchGooglePlaces(text)
                .then((response) => response.json())
                .then((json) => {
                  setPlaces(json.results);

                  setSearchLoading(false) // Hide loading
                })
                .catch((error) => {
                  console.error("Error: fetching google places", error);

                  setSearchLoading(false) // Hide loading
                });
            }
          }}
          autoCorrect={false}
          value={searchPlaces}
          lightTheme
          ref={inputSearch}
        />
        <FlatList
          data={places}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  // Set parent's map region
                  setMapRegion({
                    latitude: item.geometry.location.lat,
                    latitudeDelta: 0.01,
                    longitude: item.geometry.location.lng,
                    longitudeDelta: 0.01,
                  });

                  // Set parent's map marker location
                  setUserLoc({
                    formatted_address: item.formatted_address,
                    location: item.geometry.location,
                  });

                  // Close current modal
                  setShowModal(false);
                }}
              >
                <ListItem bottomDivider>
                  <Ionicons name="location" size={24} color="#444" />
                  <ListItem.Content>
                    <ListItem.Title style={styles.listItemTitle}>
                      {item.formatted_address}
                    </ListItem.Title>
                    <ListItem.Subtitle style={styles.listItemSubtitle}>
                      {item.name}
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    flex: 1,
  },
  listItemTitle: {
    fontSize: 14,
    color: "#333",
  },
  listItemSubtitle: {
    fontSize: 13,
    color: "#555",
  },
});
