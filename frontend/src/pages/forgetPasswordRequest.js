import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgetPasswordRequest } from "../redux/actions/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ForgotPasswordRequest = () => {
  const dispatch = useDispatch();

  //   const {authReducer} = useSelector( (state) => state);
  // console.log(authReducer,"authReducer5555555");

  const handleSubmit = (values, { resetForm }) => {
    console.log(values, "values");
    try {
    dispatch(forgetPasswordRequest(values));
        } catch (error) {
    console.log(error);
        }
    resetForm();
  };

  return (
    <div>
      <h1 className="heading">Forgot Password Request</h1>
      <Formik
        initialValues={{ email: "" }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        })}
        onSubmit={handleSubmit}
      >
        <Form className="heading">
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
          <button
            type="submit"
            className="btn btn-primary forgetpasword-button"
          >
            Send Request
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ForgotPasswordRequest;
