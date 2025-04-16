import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);

  const languages = [
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
  ];

  // Aktif dil bilgisini al
  const activeLanguage =
    languages.find(
      (lang) =>
        i18n.language === lang.code || i18n.language.startsWith(lang.code)
    ) || languages[0];

  // Bu fonksiyon hardcoded olarak dili değiştirir ve sayfayı yeniler
  const changeLanguage = (languageCode) => {
    // 1. Önce localStorage'a dil tercihini doğrudan kaydet
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("i18nextLng", languageCode);
      console.log(`Dil localStorage'a kaydedildi: ${languageCode}`);
    }

    // 2. i18n dil değişikliğini yap
    i18n.changeLanguage(languageCode);
    console.log(`Dil değiştirildi: ${languageCode}`);

    // Dropdown'ı kapat
    setShowDropdown(false);

    // 3. Kısa bir gecikme sonrası sayfayı tamamen yeniden yükle
    // Bu en güvenilir yöntemdir
    setTimeout(() => {
      console.log("Sayfa yeniden yükleniyor...");
      window.location.reload();
    }, 100);
  };

  // Tıklandığında dropdown'ı aç/kapa
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Sayfa tıklandığında dropdown'ı kapat
  React.useEffect(() => {
    const handleClickOutside = () => {
      if (showDropdown) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      {/* Mobil ve Desktop için Dil Seçici Buton */}
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 px-3 py-2 bg-white border-2 border-primary text-primary rounded-md hover:bg-primary/5 transition-colors"
        aria-label="Dil Seçimi"
      >
        <span className="text-base">{activeLanguage.flag}</span>
        <span className="hidden sm:inline">{activeLanguage.name}</span>
        <svg
          className={`w-4 h-4 transition-transform ${
            showDropdown ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dil Dropdown Menüsü */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50 border border-gray-200">
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`w-full text-left px-4 py-2 flex items-center space-x-2 hover:bg-gray-100 transition-colors ${
                  i18n.language === lang.code ||
                  i18n.language.startsWith(lang.code)
                    ? "bg-primary/10 font-medium text-primary"
                    : "text-gray-700"
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
