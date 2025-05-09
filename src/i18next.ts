import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const defaultLang = localStorage.getItem("lang");
if (!defaultLang) {
    localStorage.setItem("lang", "ru");
}

i18next
.use(initReactI18next)
.init({
    lng: defaultLang as string,
    fallbackLng: "en",
    resources: {
        en: {
            translation: {
                allCountries: "All countries",
                search: "Search",
            }
        },

        ru: {
            translation: {
                allCountries: "Все страны",
                search: "Поиск",
            }    
        }
    }
});