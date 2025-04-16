import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
// EmailJS 4.x için güncellendi
import * as emailjs from "@emailjs/browser";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import LocationSelector from "../components/LocationSelector";

// Form bileşeni - Formik değerleri için
const FormikLocationAdapter = ({ name, isPickup }) => {
  const { setFieldValue } = useFormikContext();

  // Değer değiştiğinde Formik'e bildir
  const handleLocationChange = useCallback(
    (value) => {
      console.log(`Lokasyon değişti (${name}):`, value);
      setFieldValue(name, value);
    },
    [name, setFieldValue]
  );

  return (
    <LocationSelector onChange={handleLocationChange} isPickup={isPickup} />
  );
};

const Booking = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // Araç tipleri için çeviri verileri
  const vehicleTypes = useMemo(
    () => [
      { id: "sedan", label: t("sedan"), value: "sedan" },
      { id: "suv", label: t("suv"), value: "suv" },
      { id: "van", label: t("van"), value: "van" },
      { id: "vip", label: t("vip"), value: "vip" },
    ],
    [t]
  );

  // Tarih ve rastgele ID oluştur
  const currentDateRef = useRef(new Date().toLocaleString("tr-TR"));
  const randomIdRef = useRef(
    Math.floor(Math.random() * 1000000)
      .toString()
      .padStart(6, "0")
  );

  // EmailJS'yi başlat
  useEffect(() => {
    // Global olarak başlatıldığı için burada başlatmıyoruz
    console.log("Booking - EmailJS global başlatma kullanılıyor...");
  }, []);

  // EmailJS sürümünü ve bağlantı durumunu kontrol et
  useEffect(() => {
    // EmailJS version bilgisini logla
    console.log("Booking - EmailJS Versiyon:", emailjs.version);
  }, []);

  // Form doğrulama şemasını dil değişimi ile güncellemek için
  const validationSchema = useMemo(() => {
    // Geçerli dil için çeviri anahtarlarıyla validasyon şeması oluştur
    return Yup.object({
      name: Yup.string()
        .min(3, t("name_min_length"))
        .required(t("name_required")),
      email: Yup.string()
        .email(t("invalid_email"))
        .required(t("email_required")),
      phone: Yup.string().required(t("phone_required")),
      pickupLocation: Yup.string().required(t("pickup_required")),
      dropoffLocation: Yup.string().required(t("dropoff_required")),
      date: Yup.date()
        .min(new Date(), t("date_future"))
        .required(t("date_required")),
      time: Yup.string().required(t("time_required")),
      passengers: Yup.number()
        .min(1, t("min_passengers"))
        .max(8, t("max_passengers"))
        .required(t("required_field")),
      vehicleType: Yup.string().required(t("select_vehicle")),
    });
  }, [t]); // Sadece t değiştiğinde tekrar hesapla

  // Form başlangıç değerleri
  const initialValues = useMemo(
    () => ({
      name: "",
      email: "",
      phone: "",
      pickupLocation: "Antalya Havalimanı İç Hatlar", // Bu değer varsayılan olarak sabit kalabilir
      dropoffLocation: "",
      date: "",
      time: "",
      passengers: "1",
      vehicleType: "sedan",
    }),
    []
  );

  const sendWhatsAppMessage = useCallback(
    (data) => {
      // Mevcut dili al
      const currentLang = i18n.language;

      // Çeviri karşılıklarını tanımla
      const translations = {
        title: {
          tr: "VIP TRANSFER REZERVASYONU",
          en: "VIP TRANSFER BOOKING",
          de: "VIP TRANSFER BUCHUNG",
          ru: "БРОНИРОВАНИЕ VIP ТРАНСФЕРА",
        },
        waitingConfirmation: {
          tr: "Rezervasyon Onayı Bekleniyor",
          en: "Waiting for Booking Confirmation",
          de: "Warten auf Buchungsbestätigung",
          ru: "Ожидание подтверждения бронирования",
        },
        customerInfo: {
          tr: "Müşteri Bilgileri",
          en: "Customer Information",
          de: "Kundeninformationen",
          ru: "Информация о клиенте",
        },
        name: {
          tr: "İsim",
          en: "Name",
          de: "Name",
          ru: "Имя",
        },
        email: {
          tr: "E-posta",
          en: "Email",
          de: "E-Mail",
          ru: "Эл. почта",
        },
        phone: {
          tr: "Telefon",
          en: "Phone",
          de: "Telefon",
          ru: "Телефон",
        },
        transferDetails: {
          tr: "Transfer Detayları",
          en: "Transfer Details",
          de: "Transfer Details",
          ru: "Детали трансфера",
        },
        date: {
          tr: "Tarih",
          en: "Date",
          de: "Datum",
          ru: "Дата",
        },
        time: {
          tr: "Saat",
          en: "Time",
          de: "Zeit",
          ru: "Время",
        },
        passengers: {
          tr: "Yolcu Sayısı",
          en: "Number of Passengers",
          de: "Anzahl der Passagiere",
          ru: "Количество пассажиров",
        },
        person: {
          tr: "kişi",
          en: "person(s)",
          de: "Person(en)",
          ru: "человек(а)",
        },
        routeInfo: {
          tr: "Güzergah Bilgileri",
          en: "Route Information",
          de: "Routeninformationen",
          ru: "Информация о маршруте",
        },
        pickup: {
          tr: "Alış Noktası",
          en: "Pickup Location",
          de: "Abholort",
          ru: "Место посадки",
        },
        dropoff: {
          tr: "Bırakış Noktası",
          en: "Dropoff Location",
          de: "Zielort",
          ru: "Место высадки",
        },
        vehicleInfo: {
          tr: "Araç Bilgisi",
          en: "Vehicle Information",
          de: "Fahrzeuginformationen",
          ru: "Информация о транспортном средстве",
        },
        vehicleType: {
          tr: "Araç Tipi",
          en: "Vehicle Type",
          de: "Fahrzeugtyp",
          ru: "Тип транспортного средства",
        },
        paymentStatus: {
          tr: "Ödeme Durumu",
          en: "Payment Status",
          de: "Zahlungsstatus",
          ru: "Статус оплаты",
        },
        pending: {
          tr: "Onay Bekliyor",
          en: "Pending",
          de: "Ausstehend",
          ru: "В ожидании",
        },
        bookingNote: {
          tr: "Bu rezervasyon web sitesi üzerinden yapılmıştır.",
          en: "This booking was made through the website.",
          de: "Diese Buchung wurde über die Website vorgenommen.",
          ru: "Это бронирование было сделано через веб-сайт.",
        },
      };

      // Dile göre çeviri seç, yoksa İngilizce kullan
      const getText = (key) => {
        return translations[key][currentLang] || translations[key]["en"];
      };

      const message = `
🚗 *${getText("title")}* 🚗
==================================
✅ *${getText("waitingConfirmation")}*

👤 *${getText("customerInfo")}*
   ${getText("name")}: ${data.name}
   ${getText("email")}: ${data.email}
   ${getText("phone")}: ${data.phone}

🚕 *${getText("transferDetails")}*
   ${getText("date")}: ${data.date}
   ${getText("time")}: ${data.time}
   ${getText("passengers")}: ${data.passengers} ${getText("person")}
   
📍 *${getText("routeInfo")}*
   ${getText("pickup")}: ${data.pickupLocation}
   ${getText("dropoff")}: ${data.dropoffLocation}
   
🚘 *${getText("vehicleInfo")}*
   ${getText("vehicleType")}: ${t(data.vehicleType)}

💰 *${getText("paymentStatus")}:* ${getText("pending")}

⏰ *${getText("date")}:* ${new Date().toLocaleDateString(
        currentLang === "tr"
          ? "tr-TR"
          : currentLang === "de"
          ? "de-DE"
          : currentLang === "ru"
          ? "ru-RU"
          : "en-US"
      )}
⌚ *${getText("time")}:* ${new Date().toLocaleTimeString(
        currentLang === "tr"
          ? "tr-TR"
          : currentLang === "de"
          ? "de-DE"
          : currentLang === "ru"
          ? "ru-RU"
          : "en-US"
      )}
==================================
🔔 *${getText("bookingNote")}*
    `;

      // WhatsApp API URL
      const phoneNumber = "905070307280"; // Sabit değer kullanıyoruz
      const encodedMessage = encodeURIComponent(message);

      // Mobil cihazlar için native WhatsApp şeması ve masaüstü için web url
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      let whatsappUrl;
      if (isMobile) {
        // Mobil cihazlar için whatsapp:// şeması kullan
        whatsappUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
      } else {
        // Masaüstü için web.whatsapp.com kullan
        whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;
      }

      // Yeni pencerede aç
      window.open(whatsappUrl, "_blank");
    },
    [i18n.language, t]
  );

  const handleSubmit = useCallback(
    async (values, { setSubmitting, resetForm, setErrors }) => {
      setLoading(true);
      setEmailError(false);

      try {
        if (!form.current) {
          throw new Error("Form reference is missing");
        }

        console.log("Rezervasyon form verileri:", values);

        // EmailJS ile mail gönderimi
        // .env değerleri yerine doğrudan sabit değerleri kullanalım
        // bu şekilde çevresel değişkenlerle ilgili sorunları ortadan kaldırabiliriz
        const serviceId = "service_ey2999j"; // .env dosyasından alınan değer
        const templateId = "template_c6k29oq"; // .env dosyasından alınan değer
        const publicKey = "OTdF2FlNNag3Xv85R"; // .env dosyasından alınan değer

        // Yapılandırma kontrolünü ayrıntılandıralım ve konsola detay yazdıralım
        console.log("Sabit EmailJS yapılandırma bilgileri kullanılıyor:");
        console.log("- EmailJS versiyon:", emailjs.version);
        console.log("- Servis ID:", serviceId);
        console.log("- Şablon ID:", templateId);
        console.log("- Public Key:", publicKey);

        if (!serviceId || !serviceId.startsWith("service_")) {
          console.error("EmailJS Servis ID geçersiz format:", serviceId);
          throw new Error(
            "E-posta servis kimliği (service_id) geçersiz format veya eksik. Doğru format 'service_' ile başlamalıdır."
          );
        }
        if (!templateId || !templateId.startsWith("template_")) {
          console.error("EmailJS Şablon ID geçersiz format:", templateId);
          throw new Error(
            "E-posta şablon kimliği (template_id) geçersiz format veya eksik. Doğru format 'template_' ile başlamalıdır."
          );
        }
        if (!publicKey) {
          console.error("EmailJS Public Key bulunamadı:", publicKey);
          throw new Error("E-posta servis anahtarı (public_key) eksik");
        }

        console.log("EmailJS ile e-posta gönderiliyor...");

        // Formik değerlerini formData olarak hazırlayalım
        const formData = {
          name: values.name,
          email: values.email,
          phone: values.phone,
          pickupLocation: values.pickupLocation,
          dropoffLocation: values.dropoffLocation,
          date: values.date,
          time: values.time,
          passengers: values.passengers,
          vehicleType: values.vehicleType,
          language: i18n.language,
          system_date: currentDateRef.current,
          random: randomIdRef.current,
        };

        // Form elemanlarını doldurma ve eksik alanları manuel olarak ekleyelim
        if (form.current) {
          // Önce form elemanlarının var olup olmadığını kontrol ederek bunları dolduruyoruz
          Object.entries(formData).forEach(([key, value]) => {
            // Mevcut form elemanını bul
            let element = form.current.elements[key];

            // Eğer element bulunamadıysa yeni bir element oluşturup forma ekleyelim
            if (!element) {
              console.log(`Form elemanı bulunamadı, oluşturuluyor: ${key}`);
              element = document.createElement("input");
              element.type = "hidden";
              element.name = key;
              form.current.appendChild(element);
            }

            // Değeri atama
            element.value = value;
          });

          // Form verilerini kontrol et
          console.log("Form verileri kontrol ediliyor...");
          const formElements = form.current.elements;
          for (let i = 0; i < formElements.length; i++) {
            if (formElements[i].name) {
              console.log(`${formElements[i].name}: ${formElements[i].value}`);
            }
          }
        }

        // EmailJS konfigürasyonunu tekrar ayarla
        emailjs.init(publicKey);

        try {
          // Önce send metodu ile deneyelim
          console.log("EmailJS sendForm metodu deneniyor...");
          const response = await emailjs.sendForm(
            serviceId,
            templateId,
            form.current
          );
          console.log("E-posta başarıyla gönderildi (sendForm):", response);
        } catch (emailError) {
          console.error("sendForm hatası:", emailError);

          // Alternatif olarak send metodunu deneyelim
          console.log("Alternatif olarak send metodu deneniyor...");
          const response = await emailjs.send(
            serviceId,
            templateId,
            formData,
            publicKey
          );
          console.log("E-posta başarıyla gönderildi (send):", response);
        }

        // WhatsApp mesajı gönder
        sendWhatsAppMessage(values);

        // Başarılı sayfasına yönlendir
        navigate("/booking/success");
      } catch (error) {
        console.error("Booking error:", error);
        setEmailError(true);

        // Daha açıklayıcı hata mesajı
        let errorMessage =
          t("booking_error") ||
          "Rezervasyonunuz kaydedilirken bir hata oluştu.";

        if (error.message) {
          console.log("Hata detayı:", error.message);

          if (
            error.message.includes("service_id") ||
            error.message.includes("Invalid service ID")
          ) {
            errorMessage += " Servis ID hatası.";
          } else if (error.message.includes("template_id")) {
            errorMessage += " Şablon ID hatası.";
          } else if (error.message.includes("public_key")) {
            errorMessage += " API anahtarı hatası.";
          } else if (
            error.message.includes("Network Error") ||
            error.message.includes("Failed to fetch")
          ) {
            errorMessage +=
              " İnternet bağlantı hatası. Lütfen bağlantınızı kontrol edin.";
          }
        }

        alert(errorMessage);
      } finally {
        setLoading(false);
        setSubmitting(false);
      }
    },
    [
      navigate,
      sendWhatsAppMessage,
      t,
      i18n.language,
      currentDateRef,
      randomIdRef,
    ]
  );

  if (!validationSchema) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-pulse">{t("loading")}</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t("book_now")} - RideOrAd</title>
        <meta name="description" content={t("booking_meta_description")} />
      </Helmet>

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">{t("book_now")}</h1>

        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-6 text-center sm:text-left">
            {t("booking_form")}
          </h2>

          {emailError && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {t("booking_error")}
            </div>
          )}

          {/* Gizli form referansı tutmak için */}
          <form ref={form} style={{ display: "none" }}>
            <input type="text" name="name" defaultValue="" />
            <input type="email" name="email" defaultValue="" />
            <input type="tel" name="phone" defaultValue="" />
            <input type="text" name="pickupLocation" defaultValue="" />
            <input type="text" name="dropoffLocation" defaultValue="" />
            <input type="date" name="date" defaultValue="" />
            <input type="time" name="time" defaultValue="" />
            <input type="number" name="passengers" defaultValue="1" />
            <input type="text" name="vehicleType" defaultValue="sedan" />
            <input type="hidden" name="language" defaultValue={i18n.language} />
            <input
              type="hidden"
              name="system_date"
              defaultValue={currentDateRef.current}
            />
            <input
              type="hidden"
              name="random"
              defaultValue={randomIdRef.current}
            />
            {/* Şablon için gereken diğer alanlar */}
            <input type="hidden" name="company_name" defaultValue="RideOrAd" />
            <input
              type="hidden"
              name="message_id"
              defaultValue={randomIdRef.current}
            />
            <input
              type="hidden"
              name="message_date"
              defaultValue={currentDateRef.current}
            />
          </form>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting, errors, touched, isValid }) => (
              <Form className="space-y-6">
                {/* Form validasyon hatası olduğunda gösterilecek genel uyarı */}
                {!isValid &&
                  Object.keys(errors).length > 0 &&
                  Object.keys(touched).length > 0 && (
                    <div className="p-3 bg-yellow-100 text-yellow-800 rounded-lg mb-4">
                      {t("form_validation_error")}
                    </div>
                  )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("full_name")} <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      name="name"
                      className={`w-full px-4 py-2 border ${
                        errors.name && touched.name
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-primary focus:border-primary transition-colors`}
                      placeholder={t("full_name")}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("email")} <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="email"
                      name="email"
                      className={`w-full px-4 py-2 border ${
                        errors.email && touched.email
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-primary focus:border-primary transition-colors`}
                      placeholder="email@example.com"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("phone")} <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="tel"
                      name="phone"
                      className={`w-full px-4 py-2 border ${
                        errors.phone && touched.phone
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-primary focus:border-primary transition-colors`}
                      placeholder="+90 555 555 55 55"
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Alış Noktası - LocationSelector */}
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("pickup_location")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <FormikLocationAdapter
                      name="pickupLocation"
                      isPickup={true}
                    />
                    <ErrorMessage
                      name="pickupLocation"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Bırakış Noktası - LocationSelector */}
                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("dropoff_location")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <FormikLocationAdapter
                      name="dropoffLocation"
                      isPickup={false}
                    />
                    <ErrorMessage
                      name="dropoffLocation"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("date")} <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="date"
                      name="date"
                      className={`w-full px-4 py-2 border ${
                        errors.date && touched.date
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-primary focus:border-primary transition-colors`}
                    />
                    <ErrorMessage
                      name="date"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("time")} <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="time"
                      name="time"
                      className={`w-full px-4 py-2 border ${
                        errors.time && touched.time
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-primary focus:border-primary transition-colors`}
                    />
                    <ErrorMessage
                      name="time"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("passengers")} <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="select"
                      name="passengers"
                      className={`w-full px-4 py-2 border ${
                        errors.passengers && touched.passengers
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-primary focus:border-primary transition-colors`}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                        <option key={num} value={num}>
                          {num} {t("person", { count: num })}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="passengers"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("vehicle_type")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Field
                      as="select"
                      name="vehicleType"
                      className={`w-full px-4 py-2 border ${
                        errors.vehicleType && touched.vehicleType
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-primary focus:border-primary transition-colors`}
                    >
                      {vehicleTypes.map((type) => (
                        <option key={type.id} value={type.id}>
                          {type.label}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage
                      name="vehicleType"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="mt-6 text-center sm:text-right">
                  <button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {loading || isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        {t("processing")}...
                      </>
                    ) : (
                      t("confirm_booking")
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <div className="mt-8 max-w-2xl mx-auto text-center">
          <h3 className="text-lg font-medium mb-2">{t("need_help")}</h3>
          <p className="text-gray-600">
            <a
              href="tel:+905070307280"
              className="text-primary hover:underline"
            >
              +90 507 030 72 80
            </a>{" "}
            |
            <a
              href="mailto:info@rideroad.com"
              className="text-primary hover:underline ml-2"
            >
              info@rideroad.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Booking;
