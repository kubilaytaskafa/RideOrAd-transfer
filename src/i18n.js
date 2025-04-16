import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";

// Dil dosyalarını import et
import translationEN from "./locales/en.json";
import translationTR from "./locales/tr.json";
import translationDE from "./locales/de.json";
import translationRU from "./locales/ru.json";

// i18next logger'ı
const logger = {
  type: "logger",
  log: (args) => console.log("i18next:", args),
  warn: (args) => console.warn("i18next:", args),
  error: (args) => console.error("i18next:", args),
};

// Tüm çeviri kaynaklarını oluştur
const resources = {
  en: {
    translation: translationEN,
  },
  tr: {
    translation: translationTR,
  },
  de: {
    translation: translationDE,
  },
  ru: {
    translation: translationRU,
  },
};

// Tarayıcıda saklanan dil ayarını al
// localStorage kullanmadan önce tanımlı olup olmadığını kontrol et
let savedLanguage = "tr"; // Varsayılan dil
try {
  if (typeof window !== "undefined" && window.localStorage) {
    const storedLang = localStorage.getItem("i18nextLng");
    if (storedLang) {
      savedLanguage = storedLang.split("-")[0]; // 'en-US' gibi bir değeri 'en' olarak almak için
    }
  }
} catch (e) {
  console.error("localStorage erişimi sırasında hata:", e);
}

// i18n için gerekli tüm konfigürasyonları ayarla
i18n
  .use(logger)
  .use(Backend) // Backend kullanımını ekle
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources, // Tüm kaynakları yükle
    fallbackLng: "tr", // Varsayılan dil
    lng: savedLanguage, // Saklanan dil veya varsayılan
    load: "languageOnly", // Sadece dil kodunu yükle (örn. 'en' değil 'en-US')
    keySeparator: false, // Çeviri anahtarlarında nokta kullanımını önle
    interpolation: {
      escapeValue: false, // React zaten XSS koruması sağlar
      formatSeparator: ",",
    },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage"],
    },
    backend: {
      // Backend ayarları (uzak çeviriler için)
      loadPath: "/locales/{{lng}}/{{ns}}.json",
    },
    react: {
      useSuspense: false, // Suspense kullanımını engelle
      wait: false, // Çevirilerin yüklenmesini bekleme
      bindI18n: "languageChanged loaded", // Dil değişince yeniden render et
      bindI18nStore: "added removed", // Store değişimine tepki ver
      transEmptyNodeValue: "", // Boş düğüm değerini belirle
      transSupportBasicHtmlNodes: true, // Temel HTML desteği ekle
      transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
    },
    returnEmptyString: false, // Boş string dönüşünü önle
    returnNull: false, // Null dönüşünü önle
    returnObjects: true, // Nesne dönüşüne izin ver
    saveMissing: true, // Eksik çevirileri kaydet
    missingKeyHandler: (lng, ns, key) => {
      console.warn(`Eksik çeviri anahtarı: ${key} (${lng})`);
    },
    debug: true, // Debug modunu aç
  });

// Dil değiştiğinde localStorage'a kaydet
i18n.on("languageChanged", (lng) => {
  try {
    localStorage.setItem("i18nextLng", lng);
    console.log("Dil değiştirildi ve kaydedildi:", lng);
  } catch (e) {
    console.error("Dil ayarını kaydetme sırasında hata:", e);
  }
});

export default i18n;
