import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { contactus } from "../redux/actions/contact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const { contactUs } = useSelector((state) => state.contactReducer);
  console.log(contactUs, "contactpage");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(contactus());
  }, []);

  return (
    <div>
      <div className="footer_border"></div>
      <footer className="footer">
        <div className="row footer-row">
          <div className="col-md-12">
            <div>
              <span className="link">Links :</span>
              <span className="footer-about1">About Us :</span>
              <span className="footer-contact">Contact us :</span>
            </div>
            <li>
              <NavLink
                className="font-color"
                to="/"
                activeClassName="activeLink"
                style={{ textDecoration: "none !important" }}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                className="font-color"
                to="/contact"
                activeClassName="activeLink gel"
              >
                Contact
              </NavLink>
            </li>
            <li>
              <NavLink
                className="font-color"
                to="/register"
                activeClassName="activeLink gel"
              >
                Register
              </NavLink>
            </li>
            <li>
              <NavLink
                className="font-color"
                to="/login"
                activeClassName="activeLink gel"
              >
                Login
              </NavLink>
            </li>
            <span className="text-center font-color">
              <p className="footer-about">
                Doctor Appointment is on a mission to make quality healthcare
                affordable and accessible for over a billion+ Indians. We
                believe in empowering our users with the most accurate,
                comprehensive, and curated information and care, enabling them
                to make better healthcare decisions.
              </p>
            </span>
            <div>
              {contactUs?.map((e) => (
                <span>
                  <h5 className="footer-address">{e.address}</h5>
                  <h5 className="footer-name">{e.email}</h5>
                  <h5 className="footer-phone">{e.phone}</h5>
                </span>
              ))}
              <span
                class="social-container"
                style={{
                  height: "50px",
                  display: "flex",
                  marginLeft: "520px",
                  marginTop: "50px",
                }}
              >
                <a
                  href="https://www.youtube.com"
                  className="youtube social"
                  style={{ color: "red" }}
                >
                  <FontAwesomeIcon icon={faYoutube} size="2x" />
                </a>
                <a
                  href="https://www.facebook.com"
                  className="facebook social"
                  style={{ color: "deepskyblue", marginLeft: "5px" }}
                >
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
                <a
                  href="https://www.twitter.com"
                  className="twitter social"
                  style={{ color: "skyblue", marginLeft: "5px" }}
                >
                  <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
                <a
                  href="https://www.instagram.com"
                  className="instagram social"
                  style={{ color: "deeppink", marginLeft: "5px" }}
                >
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
              </span>
            </div>
            <p
              className="text-center font-color"
              style={{ marginTop: "10px", color: "red" }}
            >
              &copy; Doctors Appointments Created By Divyansh Yadav 2023 All
              rights reserved
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
