import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
export const Menu = () => {
  const scrollToElement = (elementId) => {
    var element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const { t, i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="menu-publico">
      <div className="logoInfomed ">
        <div>
          <img
            className="animate__animated animate__fadeIn"
            src={process.env.PUBLIC_URL + "/assets/logoInfomed.png"}
            alt="Logo"
          />
        </div>

        <div className="logoInfomed-text">
          <span className="span-uno">infomed</span>
          <span className="span-dos">{t("net")}</span>
        </div>
      </div>

      <div className="links">
        <ul>
          <li>
            <Link onClick={() => scrollToElement("start")}>{t("home")}</Link>
          </li>

          <li>
            <Link onClick={() => scrollToElement("informacion")}>
              {t("mostRelevant")}
            </Link>
          </li>

          <li>
            <Link onClick={() => scrollToElement("QuienesSomosScroll_2")}>
              {t("aboutUs")}
            </Link>
          </li>

          <li>
            <Link onClick={() => scrollToElement("serviciosScroll")}>
              {t("services")}
            </Link>
          </li>

          <li>
            <Link onClick={() => scrollToElement("centrosScroll_2")}>
              {t("centers")}
            </Link>
          </li>

          <select
            onChange={(e) => changeLanguage(e.target.value)}
            defaultValue={i18n.language}
          >
            <option value="es">ES</option>
            <option value="en">EN</option>
          </select>
        </ul>
        {/* <ul>
          <li>
            <Link onClick={() => scrollToElement("start")}>Home</Link>
          </li>

          <li>
            <Link onClick={() => scrollToElement("informacion")}>
              Most Relevant
            </Link>
          </li>

          <li>
            <Link onClick={() => scrollToElement("QuienesSomosScroll_2")}>
              About Us
            </Link>
          </li>

          <li>
            <Link onClick={() => scrollToElement("serviciosScroll")}>
              Services
            </Link>
          </li>

          <li>
            <Link onClick={() => scrollToElement("centrosScroll_2")}>
              Centers
            </Link>
          </li>
        </ul> */}
      </div>
    </div>
  );
};
