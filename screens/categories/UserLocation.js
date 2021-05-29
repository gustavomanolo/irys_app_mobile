import React, { useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-elements";
import { gql, useMutation } from "@apollo/client";
import Constants from "expo-constants";

// Components
import ModalLocation from "../../components/ModalLocation.js";
import MapSearchTop from "../../components/MapSearchTop.js";
import ModalSearchGooglePlaces from "../../components/ModalSearchGooglePlaces.js";

// lib
import { getUserLocation } from "../../lib/lib";
import i18n from "../../lib/i18n/i18n";

// Context
import { DataContext } from "../../context/DataContext";

// GraphQL mutation
const MUTATION_ADD_REPORT = gql`
  mutation addPriceReport($input: PriceReportInput) {
    addPriceReport(input: $input)
  }
`;

export default function UserLocation({ navigation }) {
  // Use App context
  const { dataContext, resetContext } = useContext(DataContext);

  // State hooks
  const [showModal, setShowModal] = useState(false); // show / hide Modal to ask for Location's permission
  const [showModalSearchLoc, setShowModalSearchLoc] = useState(false); // show / hide modal to search address (Google places)
  const [userLoc, setUserLoc] = useState(null); // user's location
  const [mapRegion, setMapRegion] = useState(null); // maps'a region
  const [loadingBtn, setLoadingBtn] = useState(false); // Set button laoding while saving new report

  // GraphQL Mutation to add report
  const [addPriceReport] = useMutation(MUTATION_ADD_REPORT);

  /**
   * [Function to submit data]
   *
   */
  const submitData = async () => {
    try {
      setLoadingBtn(true);

      try {
        const { data } = await addPriceReport({
          variables: {
            input: {
              categoryId: dataContext.category,
              subcategoryId: dataContext.subcategory,
              description: dataContext.description,
              locationLat: userLoc.location.lat.toString(),
              locationLng: userLoc.location.lng.toString(),
              deviceId: Constants.installationId,
            },
          },
        });

        // All ok saving data
        setLoadingBtn(false);

        // Reset Data context
        resetContext();

        Alert.alert(i18n.t("report_saved"), i18n.t("report_saved_desc"));

        // Go to root window
        navigation.navigate("categories", {});
      } catch (err) {
        // Error saving the report
        setLoadingBtn(false);

        Alert.alert("Error", i18n.t("error_save"));
      }
    } catch (errS) {
      console.log("Error: submit data", errS);
    }
  };

  /**
   * [Function to handle marker's location]
   *
   * @param   {Number}  lat  [marker's latitude]
   * @param   {Number}  lng  [marker's longitude]
   *
   */
  const updateMapMarker = (lat, lng) => {
    // Set user's location
    setUserLoc({
      formatted_address: "",
      location: {
        lat: lat,
        lng: lng,
      },
    });

    // Set map's region
    setMapRegion({
      latitude: lat,
      latitudeDelta: 0.01,
      longitude: lng,
      longitudeDelta: 0.01,
    });
  };

  useEffect(() => {
    // Get user's location
    (async () => {
      const locationAsked =
        (await AsyncStorage.getItem("@location_asked")) || "0";
      if (locationAsked === "0") {
        // Show modal to request location
        setShowModal(true);

        // Update storage to "don't show location modal again"
        AsyncStorage.setItem("@location_asked", "1");
      } else {
        // Already asked, try to get user's location
        getUserLocation()
          .then((resL) => {
            // OK getting user's loc
            // Update map location
            updateMapMarker(resL.coords.latitude, resL.coords.longitude);
          })
          .catch((errL) => {
            console.log("Error: getting user location 1", errL);
          });
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      {/* Modal to ask for location permissions */}
      <ModalLocation
        showModal={showModal}
        successCallback={(resL) => {
          // console.log("-> OK location: ", resL);
          // Update map location
          updateMapMarker(resL.coords.latitude, resL.coords.longitude);

          // Hide modal to ask for location
          setShowModal(false);
        }}
        errorCallback={(errL) => {
          console.log("Error: callback location", errL);

          // Hide modal to ask for location
          setShowModal(false);
        }}
      />

      {/* MapView to display user's location */}
      <MapView
        style={styles.map}
        region={mapRegion}
        onRegionChange={(region) => {
          setMapRegion(region);
        }}
      >
        {userLoc !== null && (
          <Marker
            coordinate={{
              latitude: userLoc.location.lat,
              longitude: userLoc.location.lng,
            }}
            draggable={true}
            onDragStart={() => {
              console.log("-> drag");
            }}
            title={"Location"}
            // description={marker.description}
          >
            <View style={{ paddingBottom: 20 }}>
              <Image
                source={require("../../assets/marker-256-2.png")}
                style={{ width: 40, height: 40 }}
              />
            </View>
          </Marker>
        )}
      </MapView>

      {/* View to display input to search for user's address */}
      <TouchableOpacity
        style={{ position: "absolute", top: 30, left: 20, right: 20 }}
        onPress={() => {
          // Show modal to search places
          setShowModalSearchLoc(true);
        }}
      >
        <MapSearchTop address={userLoc?.formatted_address} />
      </TouchableOpacity>

      {/* Modal to display search input (Google places) */}
      <ModalSearchGooglePlaces
        showModal={showModalSearchLoc}
        setShowModal={setShowModalSearchLoc}
        setUserLoc={setUserLoc}
        setMapRegion={setMapRegion}
      />

      {/* Button to send data to the server */}
      {userLoc !== null && (
        <View
          style={{
            position: "absolute",
            bottom: 20,
          }}
        >
          <Button
            disabled={loadingBtn}
            loading={loadingBtn}
            title={i18n.t("send_report")}
            buttonStyle={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              borderWidth: 1,
              borderColor: "#197C89",
              backgroundColor: "#099798",
            }}
            titleStyle={{
              fontSize: 25,
            }}
            onPress={() => {
              submitData();
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
