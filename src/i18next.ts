import i18next from "i18next";
import { initReactI18next } from "react-i18next";

const defaultLang = localStorage.getItem("lang") ?? "ru"; // получить язык из localStorage либо установить вручную
localStorage.setItem("lang", defaultLang); // сохранять язык в localStorage (нужно если его там не было)

i18next
.use(initReactI18next)
.init({
    lng: defaultLang,
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