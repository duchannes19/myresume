import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './languages/en.json';
import transationIT from './languages/it.json';

const resources = {
  en: {
    translation: translationEN
  },
  it: {
    translation: transationIT
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Set the default language
    interpolation: {
      escapeValue: false
    },
    react: {
      transSupportBasicHtmlNodes: true // Enable HTML parsing
    }
  });

export default i18n;