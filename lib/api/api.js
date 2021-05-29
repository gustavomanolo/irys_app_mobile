const GOOGLE_PLACES_API_KEY = "AIzaSyBNfmvz4vlMp-FhWuiwamO9ShUUG6pxTNM";
import * as Localization from "expo-localization";
const langCode = Localization.locale.substr(0, 2);

/**
 * [Function to get available categories/subcategories to display menu]
 *
 * @return  {Promise}  [return description]
 */
export function getCategories() {
  return fetch(
    "https://firebasestorage.googleapis.com/v0/b/irys-fd7ea.appspot.com/o/heyirys_covid.json?alt=media&token=983682c1-4bf1-4ce8-a911-99075c70be41n"
  );
}

/**
 * [Function to search Google's places]
 *
 * @param   {[type]}  search  [search description]
 *
 * @return  {Promise}          [return description]
 */
export function searchGooglePlaces(search) {
  return fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      search
    )}&key=${GOOGLE_PLACES_API_KEY}&language=${langCode}`
  );
}
