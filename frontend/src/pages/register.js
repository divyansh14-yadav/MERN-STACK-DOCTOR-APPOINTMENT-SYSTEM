import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import "./register.css";
import { validationSchema } from "../validations/RegisterValidation";
import { NavLink } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const errorMessages = useSelector((state) => state.authReducer.errorMessage);
  console.log(errorMessages, "error");

  const { authReducer } = useSelector((state) => state);
  console.log(authReducer, "authreducer");

  // useEffect(()=>{
  // if(errorMessages ==='User is already exists'){
  //   alert("User is already exists")
  // }
  // },[error])

  // useEffect(()=>{
  //   if (authReducer.authentication === true) {
  //     alert("Registration successfully done");
  //   }
  // },[authReducer])

  useEffect(() => {
    if (authReducer.authentication === true) {
      alert("Registration successfully done");
    }
    if (authReducer.isloggedIn === false) {
      if (errorMessages === "User Already Exists With This Email Address") {
        alert(`${errorMessages}`);
      }
    }
  }, [authReducer, errorMessages]);

  const handleSubmit = (values, { resetForm }) => {
    dispatch(register(values));
    resetForm();
    setError(true);
  };

  return (
    <Formik
      initialValues={{ name: "", email: "", password: "", confirmPassword: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <div className="reg-form">
          <h1 className="heading-large">Register Here</h1>
          <Form className="form-group main-form">
            <div className="form-field">
              <label className="lable-from">Name</label>
              <Field
                name="name"
                type="text"
                className="form-control form-input"
                placeholder="Enter Name"
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div className="form-field">
              <label className="lable-from">Email</label>
              <Field
                name="email"
                type="email"
                className="form-control form-input"
                placeholder="Enter Email"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-field">
              <label className="lable-from">Password</label>
              <Field
                name="password"
                type="password"
                className="form-control form-input"
                placeholder="Enter Password"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <div className="form-field">
              <label className="lable-from">Confirm Password</label>
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
            <div className="link-css-signIn">
            Already have an account?{" "}
            <NavLink to="/login" activeClassName="activeLink">
              Sign In
            </NavLink>
            </div>
            <div>
              <button type="submit" className="btn btn-primary button register-button">
                Register
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default Register;
