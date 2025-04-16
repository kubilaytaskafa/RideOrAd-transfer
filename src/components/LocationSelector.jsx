import React, { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { cityData } from "../utils/locationData";

const LocationSelector = ({
  onChange,
  isPickup = false,
  formikField = null,
}) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language || "en"; // Varsayılan dil en

  // Dile göre isim gösterme fonksiyonu
  const getLocalizedName = (item) => {
    if (!item || !item.name) return "";

    // Eğer isim bir nesne ise ve mevcut dil varsa
    if (typeof item.name === "object") {
      return item.name[currentLang] || item.name.en || item.id; // Dil yoksa ingilizce veya id
    }

    // Eski format ise doğrudan kullan
    return item.name;
  };

  const [selectedCity, setSelectedCity] = useState(isPickup ? "antalya" : "");
  const [locationType, setLocationType] = useState(isPickup ? "airport" : "");
  const [selectedAirportDistrict, setSelectedAirportDistrict] = useState("");
  const [selectedAirportTerminal, setSelectedAirportTerminal] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedHotel, setSelectedHotel] = useState("");

  const [airportDistricts, setAirportDistricts] = useState([]);
  const [airportTerminals, setAirportTerminals] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [hotels, setHotels] = useState([]);

  // Konum değişiklikleri için callback
  const updateFinalLocation = useCallback(() => {
    let finalLocation = "";

    if (isPickup) {
      // Havalimanı seçimi için
      if (selectedAirportTerminal && airportTerminals.length > 0) {
        finalLocation =
          airportTerminals.find(
            (terminal) => terminal.id === selectedAirportTerminal
          )?.value || "";
      } else if (selectedAirportDistrict && airportDistricts.length > 0) {
        finalLocation =
          airportDistricts.find(
            (district) => district.id === selectedAirportDistrict
          )?.value || "";
      } else if (selectedCity) {
        finalLocation =
          cityData.pickup.find((city) => city.id === selectedCity)?.value || "";
      }
    } else {
      // Bırakış noktası için oteller
      if (selectedHotel && hotels.length > 0) {
        finalLocation =
          hotels.find((hotel) => hotel.id === selectedHotel)?.value || "";
      } else if (selectedDistrict && districts.length > 0) {
        finalLocation =
          districts.find((district) => district.id === selectedDistrict)
            ?.value || "";
      } else if (selectedCity) {
        finalLocation =
          cityData.pickup.find((city) => city.id === selectedCity)?.value || "";
      }
    }

    // Form değerini güncelle
    if (onChange && finalLocation) {
      onChange(finalLocation);
    }
  }, [
    isPickup,
    selectedCity,
    selectedAirportDistrict,
    selectedAirportTerminal,
    selectedDistrict,
    selectedHotel,
    airportDistricts,
    airportTerminals,
    districts,
    hotels,
    onChange,
  ]);

  // İlk yükleme: Eğer alış noktası ise ve Antalya seçiliyse hızlıca havalimanları yükle
  useEffect(() => {
    if (isPickup) {
      const airports = cityData.airports["antalya"] || [];
      setAirportDistricts(airports);

      // İlk yükleme için otomatik havalimanı seçin
      if (airports.length > 0) {
        const antalyaMerkez = airports.find(
          (district) => district.id === "antalya_merkez"
        );
        if (antalyaMerkez) {
          setSelectedAirportDistrict("antalya_merkez");
        }
      }
    } else {
      setDistricts(cityData.dropoff["antalya"] || []);
    }
  }, [isPickup]);

  // Şehir değiştiğinde
  useEffect(() => {
    if (selectedCity) {
      if (isPickup) {
        setAirportDistricts(cityData.airports[selectedCity] || []);
      } else {
        setDistricts(cityData.dropoff[selectedCity] || []);
      }

      // Değerleri sıfırla (yalnızca bırakış noktası için)
      if (!isPickup) {
        setSelectedAirportDistrict("");
        setSelectedAirportTerminal("");
        setSelectedDistrict("");
        setSelectedHotel("");
        setAirportTerminals([]);
        setHotels([]);
      }
    } else {
      setAirportDistricts([]);
      setDistricts([]);
    }
  }, [selectedCity, isPickup]);

  // Havalimanı bölgesi değiştiğinde
  useEffect(() => {
    if (selectedAirportDistrict) {
      const terminals =
        cityData.airportTerminals[selectedAirportDistrict] || [];
      setAirportTerminals(terminals);

      // İlk yükleme için terminal otomatik seçilsin
      if (
        isPickup &&
        selectedAirportDistrict === "antalya_merkez" &&
        terminals.length > 0 &&
        !selectedAirportTerminal
      ) {
        setSelectedAirportTerminal("antalya_domestic");
      }
    } else {
      setAirportTerminals([]);
      setSelectedAirportTerminal("");
    }
  }, [selectedAirportDistrict, isPickup, selectedAirportTerminal]);

  // Bölge değiştiğinde
  useEffect(() => {
    if (selectedDistrict) {
      setHotels(cityData.hotels[selectedDistrict] || []);
      setSelectedHotel("");
    } else {
      setHotels([]);
      setSelectedHotel("");
    }
  }, [selectedDistrict]);

  // Değişiklikler olduğunda formik değerini güncelle
  useEffect(() => {
    updateFinalLocation();
  }, [updateFinalLocation]);

  return (
    <div className="space-y-3">
      {/* Şehir seçimi */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {isPickup ? t("pickup_city") : t("dropoff_city")}{" "}
          <span className="text-red-500">*</span>
        </label>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-colors"
        >
          <option value="">{t("select_city")}</option>
          {cityData.pickup.map((city) => (
            <option key={city.id} value={city.id}>
              {getLocalizedName(city)}
            </option>
          ))}
        </select>
      </div>

      {/* Alış noktası için lokasyon tipi seçimi */}
      {isPickup && selectedCity && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("select_pickup_type")} <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setLocationType("airport")}
              className={`py-2 px-4 text-center rounded-lg border transition-all ${
                locationType === "airport"
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {t("pickup_type_airport")}
            </button>
            <button
              type="button"
              onClick={() => setLocationType("hotel")}
              className={`py-2 px-4 text-center rounded-lg border transition-all ${
                locationType === "hotel"
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {t("pickup_type_hotel")}
            </button>
            <button
              type="button"
              onClick={() => setLocationType("address")}
              className={`py-2 px-4 text-center rounded-lg border transition-all ${
                locationType === "address"
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
            >
              {t("pickup_type_address")}
            </button>
          </div>
        </div>
      )}

      {/* Havalimanı seçimleri */}
      {isPickup && selectedCity && locationType === "airport" && (
        <>
          {/* Havalimanı bölgesi seçimi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("airport_district")} <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedAirportDistrict}
              onChange={(e) => setSelectedAirportDistrict(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-colors"
            >
              <option value="">{t("select_airport_district")}</option>
              {airportDistricts.map((district) => (
                <option key={district.id} value={district.id}>
                  {getLocalizedName(district)}
                </option>
              ))}
            </select>
          </div>

          {/* Terminal seçimi */}
          {selectedAirportDistrict && airportTerminals.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("airport_terminal")} <span className="text-red-500">*</span>
              </label>
              <select
                value={selectedAirportTerminal}
                onChange={(e) => setSelectedAirportTerminal(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-colors"
              >
                <option value="">{t("select_airport_terminal")}</option>
                {airportTerminals.map((terminal) => (
                  <option key={terminal.id} value={terminal.id}>
                    {getLocalizedName(terminal)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </>
      )}

      {/* Otel seçimi için ilçe ve otel (Alış noktası = otel olunca veya bırakış noktası için) */}
      {((isPickup && selectedCity && locationType === "hotel") ||
        (!isPickup && selectedCity)) && (
        <>
          {/* Bölge seçimi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("district")} <span className="text-red-500">*</span>
            </label>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-colors"
            >
              <option value="">{t("select_district")}</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {getLocalizedName(district)}
                </option>
              ))}
            </select>
          </div>

          {/* Otel seçimi */}
          {selectedDistrict && hotels.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("hotel")}{" "}
                {!isPickup && <span className="text-red-500">*</span>}
              </label>
              <select
                value={selectedHotel}
                onChange={(e) => setSelectedHotel(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary transition-colors"
              >
                <option value="">{t("select_hotel")}</option>
                {hotels.map((hotel) => (
                  <option key={hotel.id} value={hotel.id}>
                    {getLocalizedName(hotel)}
                  </option>
                ))}
              </select>
            </div>
          )}
        </>
      )}

      {/* Adres seçimi için (giriş alanı) */}
      {isPickup && selectedCity && locationType === "address" && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {t("address")} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
            placeholder={t("address")}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
      )}

      {/* Formik entegrasyonu için gizli bir alan */}
      {formikField && <input type="hidden" {...formikField} />}
    </div>
  );
};

export default LocationSelector;
