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
                lang: "Language",
                officialName: "Official name",
                population: "Population",
                region: "Region",
                homePageDesc: "App for searching countries by various options",

                byName: "By Name",
                byPopulation: "By Population",
                allRegions: "All regions",
                Africa: "Africa",
                Americas: "Americas",
                Asia: "Asia",
                Oceania: "Australia & Oceania",
                Europe: "Europe",

                commonBorders: "Has borders with",
            }
        },

        ru: {
            translation: {
                allCountries: "Все страны",
                search: "Поиск",
                lang: "Язык",
                officialName: "Официальное название",
                population: "Население",
                region: "Регион",
                homePageDesc: "Приложение для поиска и отображения стран по различным параметрам",

                byName: "По названию",
                byPopulation: "По населению",
                allRegions: "Все регионы",
                Africa: "Африка",
                Americas: "Америка",
                Asia: "Азия",
                Oceania: "Австралия и Океания",
                Europe: "Европа",

                commonBorders: "Общие границы",
            }    
        }
    }
});