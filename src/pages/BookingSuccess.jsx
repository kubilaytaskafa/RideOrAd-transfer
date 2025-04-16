import React from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const BookingSuccess = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("booking_success")} - VIP Transfer</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <svg
              className="w-20 h-20 text-green-500 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t("booking_success_title")}
          </h1>

          <p className="text-lg text-gray-600 mb-8">
            {t("booking_success_message")}
          </p>

          <div className="space-y-4">
            <p className="text-gray-600">{t("booking_confirmation_email")}</p>

            <div className="flex flex-col md:flex-row justify-center gap-4">
              <Link to="/" className="btn-primary">
                {t("back_to_home")}
              </Link>

              <Link
                to="/contact"
                className="text-primary hover:text-primary/80 font-medium"
              >
                {t("need_help")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingSuccess;
