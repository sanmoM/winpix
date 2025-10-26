import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import arTranslation from "./locales/ar/translation.json";
import enTranslation from "./locales/en/translation.json";

const resources = {
    en: {
        translation: enTranslation
    },
    ar: {
        translation: arTranslation
    }
};

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "ar",
        fallbackLng: "ar",

        interpolation: {
            escapeValue: false
        }
    });

export default i18n;