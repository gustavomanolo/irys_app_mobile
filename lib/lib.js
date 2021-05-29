import * as Location from "expo-location";

export function getUserLocation() {
  // https://docs.expo.io/versions/latest/sdk/location/#locationgetlastknownpositionasyncoptions
  return new Promise(async (resolve, reject) => {
    try {
      const resP = await Location.getForegroundPermissionsAsync();
      /*
        {
          "canAskAgain": true,
          "expires": "never",
          "granted": false,
          "status": "undetermined",
        }
       */

      if (resP.status === "granted") {
        // Get last known possition
        const location = await Location.getLastKnownPositionAsync();
        return resolve(location);
      } else {
        // Not granted, check if can request permission
        if (resP.canAskAgain === true) {
          // Request permission
          // Request position
          const { status } = await Location.requestForegroundPermissionsAsync();

          if (status === "granted") {
            // Get user location
            const location = await Location.getLastKnownPositionAsync();
            return resolve(location);
          } else {
            // Didn't got permissions
            return reject("Permission to access location was denied");
          }
        } else {
          // Can't request permission, must enable from settings
          return reject("Error: don't have enogh permissions");
        }
      }
    } catch (errLoc) {
      console.log("Error: getting user location: ", errLoc);
      return reject("Error: getting user location");
    }
  });
}
