import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { validationSchema } from "../validations/loginValidation";
import "./login.css";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
// import Swal from 'sweetalert2'

const Login = () => {
  const [res, setRes] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { authReducer } = useSelector((state) => state);
  console.log(authReducer, "authreducer.login");

  console.log(authReducer.errorMessage, "authreducer");
  // console.log(authReducer.errorMessage,"res")

  const errorMessages = useSelector((state) => state.authReducer.errorMessage);
  const block = useSelector((state) => state.authReducer);
  console.log(block, "block");

  console.log(errorMessages, "errorMessage");
  useEffect(() => {
    if (res) {
      alert("password invalid");

      setRes(false);
    }
  }, []);

  useEffect(() => {
    if (authReducer.isloggedIn === true) {
      // alert("login success");
      Swal.fire("success", "login successfully done!");
      navigate("/appointmentsBook");
      return;
    }
    if (authReducer.isloggedIn === false) {
      if (errorMessages === "password invalid") {
        alert(`${errorMessages}`);
      } else if (errorMessages === "email not found") {
        alert(`${errorMessages}`);
      } else if (errorMessages === "user is blocked") {
        alert(`${errorMessages}`);
      }
    }

    setRes(true);
  }, [authReducer.isloggedIn, authReducer.errorMessage]);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(login(values));
    resetForm();
  };

  return (
    <Formik
      initialValues={{ email: "", password: "", confirmPassword: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <div className="login-form">
          <h1 className="heading">Login Here</h1>
          <Form className="form-group main-form">
            <div className="form-field">
              <label className="label-form">Email</label>
              <Field
                name="email"
                type="email"
                className="form-control form-input"
                placeholder="Enter Email"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-field">
              <label className="label-form">Password</label>
              <Field
                name="password"
                type="password"
                className="form-control form-input"
                placeholder="Enter Password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div className="form-field">
              <label className="label-form">Confirm Password</label>
              <Field
                name="confirmPassword"
                type="password"
                className="form-control form-input"
                placeholder="Enter Password"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error"
              />
            </div>

            <div className="link-css-singUp">
            Don't have an account?{" "}
            <NavLink to="/register" activeClassName="activeLink">
              Sign up
            </NavLink>
            </div>
              
            <div className="forget-password">
            <NavLink to="/forgetPasswordRequest" activeClassName="activeLink">
              Forget Password ?
            </NavLink>
            </div>
            <div>
              <button type="submit" className="btn btn-primary button login-button">
                Login
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Login;
