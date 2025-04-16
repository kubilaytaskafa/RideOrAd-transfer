import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Booking = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const form = useRef();
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);

  // Form doğrulama şemasını dil değişimi ile güncellemek için
  const [validationSchema, setValidationSchema] = useState(null);

  // Dil değiştiğinde validasyon şemasını güncelle
  useEffect(() => {
    // Geçerli dil için çeviri anahtarlarıyla validasyon şeması oluştur
    const schema = Yup.object({
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

    setValidationSchema(schema);
  }, [t, i18n.language]); // Dil değiştiğinde tekrar çalıştır

  // Form başlangıç değerleri
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    pickupLocation: "",
    dropoffLocation: "",
    date: "",
    time: "",
    passengers: "1",
    vehicleType: "sedan",
  };

  const sendWhatsAppMessage = (data) => {
    const message = `
🚗 *Yeni Transfer Rezervasyonu*
---------------------------
👤 *Müşteri:* ${data.name}
📧 *E-posta:* ${data.email}
📱 *Telefon:* ${data.phone}
📍 *Alış Noktası:* ${data.pickupLocation}
🏁 *Bırakış Noktası:* ${data.dropoffLocation}
📅 *Tarih:* ${data.date}
⏰ *Saat:* ${data.time}
👥 *Yolcu Sayısı:* ${data.passengers}
🚘 *Araç Tipi:* ${data.vehicleType}
    `;

    const whatsappUrl = `https://wa.me/${
      import.meta.env.VITE_WHATSAPP_NUMBER
    }?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    setLoading(true);
    setEmailError(false);

    try {
      // Form referansını güncellemek için DOM elementlerini manuel olarak ayarlama
      Object.keys(values).forEach((key) => {
        if (form.current.elements[key]) {
          form.current.elements[key].value = values[key];
        }
      });

      // EmailJS ile mail gönderimi
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );

      // WhatsApp mesajı gönder
      sendWhatsAppMessage(values);

      // Başarılı sayfasına yönlendir
      navigate("/booking/success");
    } catch (error) {
      console.error("Booking error:", error);
      setEmailError(true);

      // Özel hata mesajı göster
      if (error.message && error.message.includes("Invalid service ID")) {
        alert(t("booking_error") + " - " + t("notification_error"));
      } else {
        alert(t("booking_error"));
      }
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  // Validasyon şeması yüklenene kadar bekle
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
        <title>{t("book_now")} - VIP Transfer</title>
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
            <input type="text" name="name" />
            <input type="email" name="email" />
            <input type="tel" name="phone" />
            <input type="text" name="pickupLocation" />
            <input type="text" name="dropoffLocation" />
            <input type="date" name="date" />
            <input type="time" name="time" />
            <input type="number" name="passengers" />
            <input type="text" name="vehicleType" />
          </form>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
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

                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("pickup_location")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      name="pickupLocation"
                      className={`w-full px-4 py-2 border ${
                        errors.pickupLocation && touched.pickupLocation
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-primary focus:border-primary transition-colors`}
                      placeholder={t("pickup_location")}
                    />
                    <ErrorMessage
                      name="pickupLocation"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  <div className="col-span-1 sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {t("dropoff_location")}{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Field
                      type="text"
                      name="dropoffLocation"
                      className={`w-full px-4 py-2 border ${
                        errors.dropoffLocation && touched.dropoffLocation
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded-lg focus:ring-primary focus:border-primary transition-colors`}
                      placeholder={t("dropoff_location")}
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
                          {num}
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
                      <option value="sedan">{t("sedan")}</option>
                      <option value="suv">{t("suv")}</option>
                      <option value="van">{t("van")}</option>
                      <option value="vip">{t("vip")}</option>
                    </Field>
                    <ErrorMessage
                      name="vehicleType"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || loading}
                    className="btn-primary w-full py-3 transition-colors flex justify-center items-center"
                  >
                    {isSubmitting || loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                        {t("processing")}
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
              href="tel:+905555555555"
              className="text-primary hover:underline"
            >
              +90 555 555 55 55
            </a>{" "}
            |
            <a
              href="mailto:info@viptransfer.com"
              className="text-primary hover:underline ml-2"
            >
              info@viptransfer.com
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Booking;
