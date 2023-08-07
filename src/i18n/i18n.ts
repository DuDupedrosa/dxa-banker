// i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importar arquivos de tradução
import translationEN from './locales/en.json';
import translationPT from './locales/pt.json';

const resources = {
  en: {
    translation: translationEN,
  },
  pt: {
    translation: translationPT,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'pt', // Define o idioma padrão
  fallbackLng: 'en', // Define o idioma de fallback (caso o idioma preferido não esteja disponível)
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
