import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
// EmailJS 4.x için güncellendi
import * as emailjs from "@emailjs/browser";

// Önce CSS dosyalarını import et
import "./index.css";

// Sonra i18n'i import et ve başlat
import "./i18n";

// React i18next provider'ını ekle
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

// Ana uygulamayı yükle
import App from "./App";

// EmailJS'yi global olarak başlat
const initEmailJS = () => {
  // Doğrudan sabit değer kullanarak başlatma
  const publicKey = "OTdF2FlNNag3Xv85R";

  if (publicKey) {
    console.log("Global EmailJS başlatılıyor (sabit değer):", publicKey);
    try {
      // En basit haliyle başlat
      emailjs.init(publicKey);
      return true;
    } catch (err) {
      console.error("EmailJS başlatma hatası:", err);
      return false;
    }
  } else {
    console.error(
      "EmailJS public key tanımlanmadı! Form özellikleri çalışmayabilir."
    );
    return false;
  }
};

// EmailJS başlatma
initEmailJS();

// Yükleme ekranı bileşeni
const LoadingComponent = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
    <p className="ml-4">Yükleniyor...</p>
  </div>
);

// Uygulamayı dil ayarları ile başlat
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Suspense fallback={<LoadingComponent />}>
      <I18nextProvider i18n={i18n}>
        <HelmetProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </HelmetProvider>
      </I18nextProvider>
    </Suspense>
  </React.StrictMode>
);
