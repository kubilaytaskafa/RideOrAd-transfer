import React from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      id: 1,
      icon: (
        <svg
          className="w-12 h-12 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
      title: t("airport_transfer"),
      description: t("airport_transfer_desc"),
      features: [
        t("airport_transfer_feature_1"),
        t("airport_transfer_feature_2"),
        t("airport_transfer_feature_3"),
      ],
    },
    {
      id: 2,
      icon: (
        <svg
          className="w-12 h-12 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: t("hourly_rental"),
      description: t("hourly_rental_desc"),
      features: [
        t("hourly_rental_feature_1"),
        t("hourly_rental_feature_2"),
        t("hourly_rental_feature_3"),
      ],
    },
    {
      id: 3,
      icon: (
        <svg
          className="w-12 h-12 text-primary"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      title: t("city_tour"),
      description: t("city_tour_desc"),
      features: [
        t("city_tour_feature_1"),
        t("city_tour_feature_2"),
        t("city_tour_feature_3"),
      ],
    },
  ];

  return (
    <>
      <Helmet>
        <title>{t("our_services")} - VIP Transfer</title>
        <meta name="description" content={t("services_meta_description")} />
        <meta
          name="keywords"
          content="vip transfer services, airport transfer, hourly rental, city tour"
        />
      </Helmet>

      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-12">
            {t("our_services")}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-center mb-6">{service.icon}</div>
                  <h3 className="text-2xl font-semibold text-center mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-center mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {service.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-gray-600"
                      >
                        <svg
                          className="w-5 h-5 text-primary mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gray-50 px-6 py-4">
                  <Link
                    to="/booking"
                    className="block text-center text-primary font-semibold hover:text-primary/80 transition-colors"
                  >
                    {t("book_now")}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Vehicle Types */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-center mb-8">
              {t("vehicle_types")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-semibold mb-4">Sedan</h3>
                <p className="text-gray-600 mb-4">{t("sedan_desc")}</p>
                <p className="text-sm text-gray-500">
                  {t("max_passengers")}: 4
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-semibold mb-4">SUV</h3>
                <p className="text-gray-600 mb-4">{t("suv_desc")}</p>
                <p className="text-sm text-gray-500">
                  {t("max_passengers")}: 6
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-semibold mb-4">VAN</h3>
                <p className="text-gray-600 mb-4">{t("van_desc")}</p>
                <p className="text-sm text-gray-500">
                  {t("max_passengers")}: 8
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                <h3 className="text-xl font-semibold mb-4">VIP</h3>
                <p className="text-gray-600 mb-4">{t("vip_desc")}</p>
                <p className="text-sm text-gray-500">
                  {t("max_passengers")}: 4
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <h2 className="text-3xl font-bold mb-6">{t("ready_to_book")}</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {t("cta_description")}
            </p>
            <Link to="/booking" className="btn-primary text-lg px-8 py-4">
              {t("book_now")}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
