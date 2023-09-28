import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword } from "../redux/actions/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ForgotPassword = () => {
  const dispatch = useDispatch();

  const { authReducer } = useSelector((state) => state);
  console.log(authReducer, "authReducer5555555");

  useEffect(() => {
    if (authReducer?.user?.message === "Password changed success") {
      alert("password changed");
    }
  }, [authReducer]);

  const handleSubmit = (values, { resetForm }) => {
    console.log(values, "values");
    try {
      dispatch(forgetPassword(values));
    } catch (error) {
      console.log(error);
    }
    resetForm();
  };

  return (
    <div>
      <h1 className="heading">Forgot Password</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string()
            .min(6, "Password should be 6 characters long")
            .required("Password is required"),
        })}
        onSubmit={handleSubmit}
      >
        <Form className="heading">
          <div>
            <div>
              <label className="label-form">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="forget"
              />
              <ErrorMessage name="email" component="div" className="errors" />
            </div>
            <div>
              <label className="label-form">New Password</label>
              <Field
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                className="forget"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="errors"
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary forgetpasword-button"
            >
              forgetPassword
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default ForgotPassword;
