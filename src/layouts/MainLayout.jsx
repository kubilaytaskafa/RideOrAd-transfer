import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageSwitcher from "../components/LanguageSwitcher";

const MainLayout = ({ children, language }) => {
  const { t, i18n } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // language prop değiştiğinde i18n'i güncelle
  useEffect(() => {
    if (language && language !== i18n.language) {
      console.log("MainLayout: Dil değişimi algılandı:", language);
      i18n.changeLanguage(language);
    }
  }, [language, i18n]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when escape key is pressed
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  return (
    <div className="min-h-screen flex flex-col" key={i18n.language}>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">
              RideOrAd
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/"
                className="text-primary hover:opacity-80 transition-colors"
              >
                {t("home")}
              </Link>
              <Link
                to="/services"
                className="text-primary hover:opacity-80 transition-colors"
              >
                {t("services")}
              </Link>
              <Link
                to="/about"
                className="text-primary hover:opacity-80 transition-colors"
              >
                {t("about_us")}
              </Link>
              <Link
                to="/contact"
                className="text-primary hover:opacity-80 transition-colors"
              >
                {t("contact")}
              </Link>
              <Link to="/booking" className="btn-primary">
                {t("book_now")}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-3 md:space-x-6">
              <LanguageSwitcher />
              <button
                type="button"
                className="md:hidden flex items-center text-primary"
                onClick={toggleMobileMenu}
                aria-label={t("menu")}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {mobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white md:hidden">
            <div className="flex justify-between items-center p-4 border-b">
              <Link
                to="/"
                className="text-2xl font-bold text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                VIP Transfer
              </Link>
              <button
                onClick={toggleMobileMenu}
                className="text-primary"
                aria-label={t("close")}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="py-6 px-4 flex flex-col space-y-4">
              <Link
                to="/"
                className="text-primary text-lg py-2 hover:opacity-80 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("home")}
              </Link>
              <Link
                to="/services"
                className="text-primary text-lg py-2 hover:opacity-80 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("services")}
              </Link>
              <Link
                to="/about"
                className="text-primary text-lg py-2 hover:opacity-80 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("about_us")}
              </Link>
              <Link
                to="/contact"
                className="text-primary text-lg py-2 hover:opacity-80 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("contact")}
              </Link>
              <Link
                to="/booking"
                className="btn-primary inline-block text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("book_now")}
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-primary text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">VIP Transfer</h3>
              <p className="text-white/80">{t("luxury_comfort")}</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">{t("contact")}</h3>
              <p className="text-white/80">
                Email: info@viptransfer.com
                <br />
                Tel: +90 555 555 55 55
              </p>
            </div>
            <div className="sm:col-span-2 md:col-span-1">
              <h3 className="text-xl font-bold mb-4">{t("follow_us")}</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Facebook
                </a>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition-colors"
                >
                  Twitter
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center text-white/80">
            © {new Date().getFullYear()} VIP Transfer.{" "}
            {t("all_rights_reserved")}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
