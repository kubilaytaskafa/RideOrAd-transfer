import React, { Suspense, useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import MainLayout from "./layouts/MainLayout";
import DebugTranslation from "./components/DebugTranslation";

// Lazy loading pages
const Home = React.lazy(() => import("./pages/Home"));
const Services = React.lazy(() => import("./pages/Services"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const Booking = React.lazy(() => import("./pages/Booking"));
const BookingSuccess = React.lazy(() => import("./pages/BookingSuccess"));

// Loading component
const Loading = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
      <p className="ml-4">{t("loading")}</p>
    </div>
  );
};

function App() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  // Geçerli dili state olarak sakla
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  // Sayfaları tamamen yeniden render etmek için her dil değişiminde bir forceKey oluştur
  const [forceKey, setForceKey] = useState(Date.now());

  // Dil değişimini izle ve gerekirse sayfayı yeniden yükle
  useEffect(() => {
    const handleLanguageChange = (lng) => {
      console.log("Dil değişti:", lng);
      setCurrentLanguage(lng);
      setForceKey(Date.now()); // Yeni bir key oluştur

      // URL'yi yenile (sayfayı yeniden yüklemeden)
      const currentPath = location.pathname;
      navigate(currentPath, { replace: true });
    };

    // Event listener'ı ekle
    i18n.on("languageChanged", handleLanguageChange);

    // Mevcut dil durumunu konsola yazdır
    console.log("Mevcut dil:", i18n.language);
    console.log("Mevcut çeviriler:", i18n.store.data);

    // Temizleme fonksiyonu
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, [i18n, location, navigate]);

  return (
    <>
      <DebugTranslation />

      <Helmet>
        <title>VIP Transfer - {t("luxury_comfort")}</title>
        <meta name="description" content={t("home_meta_description")} />
        <meta name="keywords" content={t("meta_keywords")} />
        <link rel="canonical" href="https://www.viptransfer.com" />
        <html lang={currentLanguage} />
      </Helmet>

      {/* Key değerini ana layout'a geçirerek tam yeniden render sağla */}
      <MainLayout language={currentLanguage} key={forceKey}>
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* Her route için ayrı key kullan */}
            <Route path="/" element={<Home key={`home-${forceKey}`} />} />
            <Route
              path="/services"
              element={<Services key={`services-${forceKey}`} />}
            />
            <Route
              path="/about"
              element={<About key={`about-${forceKey}`} />}
            />
            <Route
              path="/contact"
              element={<Contact key={`contact-${forceKey}`} />}
            />
            <Route
              path="/booking"
              element={<Booking key={`booking-${forceKey}`} />}
            />
            <Route
              path="/booking/success"
              element={<BookingSuccess key={`success-${forceKey}`} />}
            />
          </Routes>
        </Suspense>
      </MainLayout>
    </>
  );
}

export default App;
