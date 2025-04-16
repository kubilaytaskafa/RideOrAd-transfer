import React, { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { init } from "@emailjs/browser";
import emailjs from "@emailjs/browser";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Geliştirme modunda mı çalışıyoruz?
const isDevelopment = import.meta.env.MODE === "development";

// EmailJS değerleri için sabitler (.env dosyası okunamadığında kullanılır)
const EMAILJS_SERVICE_ID = "service_ey2999j";
const EMAILJS_TEMPLATE_ID = "template_y1ervmn";
const EMAILJS_PUBLIC_KEY = "OTdF2FlNNag3Xv85R";
const DEFAULT_WHATSAPP = "905070307280";

const Contact = () => {
  const { t, i18n } = useTranslation();
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // EmailJS'yi başlat
  useEffect(() => {
    // Sabit public key kullan - .env çalışmıyor gibi görünüyor
    const publicKey = EMAILJS_PUBLIC_KEY;

    if (publicKey) {
      init(publicKey);
      if (isDevelopment) {
        console.log("EmailJS başlatıldı");
        console.log("EmailJS Versiyon:", emailjs.version);
      }
    } else {
      console.error("EmailJS Public Key tanımlanmadı!");
    }

    // Sadece geliştirme modunda çevre değişkenlerini kontrol et
    if (isDevelopment) {
      console.log("EmailJS Değerlerini kullanıyoruz:", {
        serviceId: EMAILJS_SERVICE_ID,
        templateId: EMAILJS_TEMPLATE_ID,
        publicKey: EMAILJS_PUBLIC_KEY ? "******" : "yok",
      });
    }
  }, []);

  // Dil değişikliklerini izle
  useEffect(() => {
    // Sayfa başlığını güncelle
    document.title = `${t("contact_title")} | RideOrAd`;

    // Form sıfırlandığında başarı mesajını da temizle
    setSuccess(false);
  }, [i18n.language, t]);

  // WhatsApp mesajı gönderme fonksiyonu
  const sendWhatsAppMessage = (formData) => {
    try {
      const phone = import.meta.env.VITE_WHATSAPP_NUMBER || DEFAULT_WHATSAPP;
      if (!phone) {
        console.warn("WhatsApp numarası bulunamadı!");
        return;
      }

      // Mesaj formatı
      const message = `🔔 *${t("new_contact_message")}*
      
*${t("subject")}:* ${formData.subject}
*${t("name")}:* ${formData.name}
*${t("email")}:* ${formData.email}
*${t("message_date")}:* ${formData.system_date}
*${t("message_id")}:* #${formData.random}

*${t("message")}:*
${formData.message}

*${t("language")}:* ${formData.language || "tr"}`;

      // WhatsApp URL'sini oluştur
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
      const url = isMobile
        ? `whatsapp://send?phone=${phone}&text=${encodeURIComponent(message)}`
        : `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
            message
          )}`;

      // Yeni sekmede aç
      window.open(url, "_blank");
    } catch (error) {
      console.error("WhatsApp mesajı gönderilirken hata oluştu:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sistem tarihi oluştur
      const now = new Date();
      const systemDate = now.toLocaleString(
        i18n.language === "tr" ? "tr-TR" : "en-US",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );

      // Rastgele ID oluştur (6 haneli)
      const randomId = Math.floor(100000 + Math.random() * 900000).toString();

      // Form elemanlarına değerleri ata
      if (!form.current.system_date.value) {
        form.current.system_date.value = systemDate;
      }

      if (!form.current.random.value) {
        form.current.random.value = randomId;
      }

      if (!form.current.language.value) {
        form.current.language.value = i18n.language;
      }

      // Form verilerini alıp logla
      const formData = {
        name: form.current.name.value,
        email: form.current.email.value,
        subject: form.current.subject.value,
        message: form.current.message.value,
        system_date: form.current.system_date.value,
        random: form.current.random.value,
        language: form.current.language.value,
      };

      // Sabit EmailJS değerlerini kullan (env değişkenleri çalışmıyor)
      const serviceId = EMAILJS_SERVICE_ID;
      const templateId = EMAILJS_TEMPLATE_ID;
      const publicKey = EMAILJS_PUBLIC_KEY;

      // Sadece geliştirme modunda log ekle
      if (isDevelopment) {
        console.log("Email Gönderiliyor...");
        console.log("Form Data:", {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          language: formData.language,
        });
      }

      // Konsola bir görsel ayraç ekle ki sonuçları daha kolay görelim
      console.log("----------- EMAIL GÖNDERME BAŞLADI -----------");

      // Email gönderimi
      const result = await emailjs.sendForm(
        serviceId,
        templateId,
        form.current,
        publicKey
      );

      console.log("----------- EMAIL GÖNDERME SONUÇLANDI -----------");
      console.log("EmailJS cevabı:", result.text);

      // WhatsApp mesajı oluştur ve gönder
      sendWhatsAppMessage(formData);

      setSuccess(true);
      form.current.reset();
    } catch (error) {
      console.error(
        "Email gönderme hatası:",
        error.message || "Bilinmeyen hata"
      );
      console.error("Hata detayları:", error);

      alert(
        "Mesaj gönderilirken bir hata oluştu. Lütfen daha sonra tekrar deneyin."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <Helmet>
        <title>{t("contact_title")} | RideOrAd</title>
        <meta name="description" content={t("contact_meta_description")} />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center">
          {t("contact_title")}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* İletişim Formu */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6">
                {t("contact_form")}
              </h2>
              <p className="mb-8">{t("contact_subtitle")}</p>

              {success ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
                  <p>{t("contact_success")}</p>
                </div>
              ) : null}

              <form ref={form} onSubmit={handleSubmit} className="space-y-4">
                {/* Hidden input fields */}
                <input type="hidden" name="system_date" defaultValue="" />
                <input type="hidden" name="random" defaultValue="" />
                <input
                  type="hidden"
                  name="language"
                  defaultValue={i18n.language}
                />

                <div>
                  <label className="block text-gray-700 mb-2">
                    {t("contact_name")}:
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    {t("contact_email")}:
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    {t("contact_subject")}:
                  </label>
                  <input
                    type="text"
                    name="subject"
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">
                    {t("contact_message")}:
                  </label>
                  <textarea
                    name="message"
                    rows="5"
                    className="w-full p-2 border rounded"
                    required
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
                    disabled={loading}
                  >
                    {loading ? t("contact_sending") : t("contact_send")}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* İletişim Bilgileri */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-6">
                {t("contact_info")}
              </h2>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-gray-800">
                    {t("contact_address")}:
                  </h3>
                  <p className="mt-1">
                    İstanbul, Türkiye
                    <br />
                    34000
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-800">
                    {t("contact_phone")}:
                  </h3>
                  <p className="mt-1">+90 507 030 72 80</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-800">
                    {t("contact_email")}:
                  </h3>
                  <p className="mt-1">info@rideorad.com</p>
                </div>

                <div className="pt-4">
                  <h3 className="font-medium text-gray-800 mb-2">
                    {t("contact_social")}:
                  </h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://wa.me/905070307280"
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-600 hover:text-green-800 text-xl"
                    >
                      <FontAwesomeIcon icon={faWhatsapp} size="lg" />
                    </a>
                    <a
                      href="mailto:info@rideorad.com"
                      className="text-blue-600 hover:text-blue-800 text-xl"
                    >
                      <FontAwesomeIcon icon={faEnvelope} size="lg" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Harita */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">{t("our_location")}</h2>
          <div className="aspect-video">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d385396.83462920394!2d28.73198846171249!3d41.00483176533782!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1697395481441!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={t("istanbul_map")}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
