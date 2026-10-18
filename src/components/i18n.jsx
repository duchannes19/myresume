import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEN from './languages/en.json';
import translationIT from './languages/it.json';

const STORAGE_KEY = 'lang';
const SUPPORTED = ['en', 'it'];

const readStoredLanguage = () => {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return SUPPORTED.includes(stored) ? stored : null;
  } catch {
    return null;
  }
};

const detectLanguage = () => {
  const stored = readStoredLanguage();
  if (stored) return stored;
  const browser = (navigator.language || 'en').slice(0, 2).toLowerCase();
  return SUPPORTED.includes(browser) ? browser : 'en';
};

i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  try {
    window.localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // Storage unavailable (private mode, blocked): language just won't persist.
  }
});

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: translationEN },
      it: { translation: translationIT },
    },
    lng: detectLanguage(),
    fallbackLng: 'en',
    supportedLngs: SUPPORTED,
    interpolation: { escapeValue: false },
    react: {
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'p', 'b'],
    },
  });

export default i18n;
