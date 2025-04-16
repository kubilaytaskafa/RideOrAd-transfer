import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

// Çevirilerinizin doğru çalışıp çalışmadığını kontrol edecek bileşen
const DebugTranslation = () => {
  const { t, i18n } = useTranslation();

  // Mevcut dili ve çeviri durumunu konsola yazdır
  useEffect(() => {
    // Ekledikten 1 saniye sonra konsola bilgileri yazdır
    const timer = setTimeout(() => {
      console.group("📚 Çeviri Hata Ayıklama Bilgileri");
      console.log("Mevcut dil:", i18n.language);
      console.log("Desteklenen diller:", Object.keys(i18n.store.data));
      console.log(
        "Mevcut dil için çeviriler:",
        i18n.store.data[i18n.language]?.translation
      );

      // Önemli çeviri anahtarlarını kontrol et
      const keysToCheck = [
        "book_now",
        "home",
        "services",
        "welcome",
        "luxury_comfort",
      ];
      console.log("Önemli çevirilerin kontrolü:");

      keysToCheck.forEach((key) => {
        const translation = t(key);
        console.log(
          `- ${key}: ${translation} ${
            translation === key ? "❌ (çeviri bulunamadı)" : "✅"
          }`
        );
      });

      console.groupEnd();
    }, 1000);

    return () => clearTimeout(timer);
  }, [i18n.language, t, i18n.store.data]);

  // Sayfada görünmez bir bileşen olarak döndür
  return (
    <div style={{ display: "none" }} data-testid="debug-translation"></div>
  );
};

export default DebugTranslation;
