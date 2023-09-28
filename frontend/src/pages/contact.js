import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { contactus } from "../redux/actions/contact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faYoutube,
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
const Contact = () => {
  // const contactUsf = useSelector((state) => state.contactReducer.contactUs);
  // console.log(contactUsf, "contactpage");

  const { contactUs } = useSelector((state) => state.contactReducer);
  console.log(contactUs, "contactpage");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(contactus());
  }, []);

  return (
    <div>
      <h1 className="heading">Contact us</h1>
      <div className="container ">
        <div className="doctor-card">
          <div>
            <div>
              {contactUs?.map((e) => (
                <div>
                  <h5>
                    <span className="card"> Address :</span> {e.address}
                  </h5>
                  <h5>
                    <span className="card"> Email :</span> {e.email}
                  </h5>
                  <h5>
                    <span className="card"> Phone :</span> {e.phone}
                  </h5>
                </div>
              ))}
            </div>
            {/* social liks */}
            <div className="social">
              <span>
                <p className="card">Social Links:</p>
              </span>
              <span
                class="social-container"
                style={{ height: "50px", display: "flex" }}
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
                  style={{ color: "deepskyblue" }}
                >
                  <FontAwesomeIcon icon={faFacebook} size="2x" />
                </a>
                <a
                  href="https://www.twitter.com"
                  className="twitter social"
                  style={{ color: "skyblue" }}
                >
                  <FontAwesomeIcon icon={faTwitter} size="2x" />
                </a>
                <a
                  href="https://www.instagram.com"
                  className="instagram social"
                  style={{ color: "deeppink" }}
                >
                  <FontAwesomeIcon icon={faInstagram} size="2x" />
                </a>
              </span>
            </div>
            <div>
              <p className="card" style={{ marginTop: "-18px" }}>
                Map :
              </p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680.737863148768!2d75.87314977402694!3d22.700800328261852!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fce00db324a7%3A0xe0bfa4e3457de59c!2sYuvasoft%20Solutions%20Private%20Limited!5e0!3m2!1sen!2sin!4v1693979999958!5m2!1sen!2sin"
                style={{ height: "450px", width: "1114px" }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
