/**
 * [Function to get available categories/subcategories to display menu]
 *
 * @return  {[type]}  [return description]
 */
export function getCategories() {
  return fetch(
    "https://firebasestorage.googleapis.com/v0/b/irys-fd7ea.appspot.com/o/heyirys_covid.json?alt=media&token=983682c1-4bf1-4ce8-a911-99075c70be41n"
  );
}
