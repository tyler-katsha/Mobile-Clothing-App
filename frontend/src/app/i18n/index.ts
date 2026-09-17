import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'expo-localization';
import { en } from './locales/en';
import { es } from './locales/es';
import { ko } from './locales/ko';
import { ja } from "./locales/ja";
import { zh } from "./locales/zh";
import { fr } from "./locales/fr";

const deviceLanguage = getLocales()[0]?.languageCode ?? 'en';

if (!i18n.isInitialized) {
      i18n
        .use(initReactI18next)
        .init({
            resources: {
                en: { translation: en },
                es: { translation: es },
                ko: { translation: ko },
                fr: { translation: fr },
                zh: { translation: zh },
                ja: { translation: ja },
            },
            lng: deviceLanguage,
            fallbackLng: 'en',
            compatibilityJSON: 'v4',
            interpolation: {
                escapeValue: false,
            },
        });
}


export default i18n;