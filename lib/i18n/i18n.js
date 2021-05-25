import * as Localization from "expo-localization";
import i18n from "i18n-js";

// Import locales
import esL from "./es.json";
import enL from "./en.json";

// Set the key-value pairs for the different languages you want to support.
i18n.translations = {
  en: enL,
  es: esL,
};
// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default i18n;
