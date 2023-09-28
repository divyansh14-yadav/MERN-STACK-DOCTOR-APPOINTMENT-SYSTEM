import React, { useEffect, useState } from "react";
// import { Row, Col } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  createDoctor,
  doctorCity,
  doctorState,
} from "../redux/actions/doctorAction";
import { doctorValidation } from "../validations/doctorValidation";

const DoctorForm = () => {
  const [stateId, setState] = useState("");
  const [cityId, setCity] = useState("");
  const [image, setImage] = useState();

  console.log(stateId, "111111111111111111");

  // const {doctor} = useSelector((state) => state.doctorReducer);
  // console.log(doctor?.message, "doctor");

  // const statesResult = useSelector((state) => state.doctorReducer.states);
  // console.log(statesResult, "state");

  // const cityResult = useSelector((state) => state.doctorReducer.city);
  // console.log(cityResult, "city");

  const { doctor, states, city } = useSelector((state) => state.doctorReducer);
  console.log(doctor?.message, "doctor");
  console.log(states, "state");
  console.log(city, "city");

  const dispatch = useDispatch();

  useEffect(() => {
    if (doctor?.message === "Doctor created successfully") {
      alert("Doctor created successfully");
    }
  }, [doctor]);

  // useEffect(() => {
  //   dispatch(doctorState());
  // }, []);

  // useEffect(() => {
  //   dispatch(doctorCity());
  // }, []);

  useEffect(() => {
    if (states) {
      dispatch(doctorState());
    } else if (city) {
      dispatch(doctorCity());
    }
  }, []);

  const handleSubmit = (values, { resetForm }) => {
    console.log(values, "valuesdoc123");
    const formData = new FormData();
    formData.append("doctorName", values.doctorName);
    formData.append("doctorPhone", values.doctorPhone);
    formData.append("email", values.email);
    formData.append("image", image);
    formData.append("specialization", values.specialization);
    formData.append("consultationFee", values.consultationFee);
    formData.append("timings", values.timings);
    formData.append("experience", values.experience);
    formData.append("description", values.description);
    formData.append("stateId", stateId);
    formData.append("cityId", cityId);
    console.log(formData.image, "5555555555");

    dispatch(createDoctor(formData));
    resetForm();
  };
  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setState(selectedState);
    dispatch(doctorCity(selectedState, cityId));
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setCity(selectedCity);
    dispatch(doctorCity(stateId, selectedCity));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };
  return (
    <Formik
      initialValues={{
        doctorName: "",
        doctorPhone: "",
        email: "",
        image: "",
        specialization: "",
        consultationFee: "",
        timings: "",
        experience: "",
        description: "",
        stateId: "",
        cityId: "",
      }}
      validationSchema={doctorValidation}
      onSubmit={handleSubmit}
    >
      {() => (
        <div className="reg-form">
          <h1 className="heading-large">Doctor Form</h1>
          <Form className="form-group main-form">
            <div>
              <div className="form-field">
                <label className="lable-from">DoctorName</label>
                <Field
                  name="doctorName"
                  type="text"
                  className="form-control form-input"
                  placeholder="Enter DoctorName"
                />
                <ErrorMessage
                  name="doctorName"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-field">
                <label className="lable-from">DoctorPhone</label>
                <Field
                  name="doctorPhone"
                  type="number"
                  className="form-control form-input"
                  placeholder="Enter DoctorPhone"
                />
                <ErrorMessage
                  name="doctorPhone"
                  component="div"
                  className="error"
                />
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
                <label className="lable-from">Specialization</label>
                <Field
                  name="specialization"
                  type="text"
                  className="form-control form-input"
                  placeholder="Enter Specialization"
                />
                <ErrorMessage
                  name="specialization"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-field">
                <label className="lable-from">Consultation Fee</label>
                <Field
                  name="consultationFee"
                  type="number"
                  className="form-control form-input"
                  placeholder="Enter Consultation Fee"
                />
                <ErrorMessage
                  name="consultationFee"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-field">
                <label className="lable-from">Timings</label>
                <Field
                  name="timings"
                  type="text"
                  className="form-control form-input"
                  placeholder="Enter Timings"
                />
                <ErrorMessage
                  name="timings"
                  component="div"
                  className="error"
                />
              </div>
            </div>

            <div>
              <div className="form-field">
                <label className="lable-from">Experience</label>
                <Field
                  name="experience"
                  type="text"
                  className="form-control form-input"
                  placeholder="Enter Experience"
                />
                <ErrorMessage
                  name="experience"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-field">
                <label className="lable-from">Description</label>
                <Field
                  name="description"
                  type="text"
                  className="form-control form-input"
                  placeholder="Enter Description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-field">
                <label>State</label>
                <Field
                  as="select"
                  className="form-select sel statedoc"
                  value={stateId}
                  name="stateId"
                  onChange={handleStateChange}
                  aria-label="Select a state"
                >
                  <option value="">Open this select state</option>
                  {states?.map((state, index) => (
                    <option key={index} value={state._id}>
                      {state.state}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="stateId"
                  component="div"
                  className="error"
                />
              </div>

              <div className="form-field">
                <label className="lable-from">City</label>
                <Field
                  as="select"
                  className="form-select sel statedoc"
                  value={cityId}
                  name="cityId"
                  onChange={handleCityChange}
                  aria-label="Select a city"
                >
                  <option value="">Open this select city</option>
                  {city?.getAll?.map((city, index) => (
                    <option key={index} value={city._id}>
                      {city.city}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="cityId" component="div" className="error" />
              </div>

              <div className="form-field">
                <label className="lable-from">Image</label>
                <Field
                  name="image"
                  type="file"
                  className="form-control form-input"
                  onChange={handleFileChange}
                />
                <ErrorMessage name="image" component="div" className="error" />
              </div>
            </div>
            <div>
              <button type="submit" className="btn btn-primary button doctor-book-button">
                Add Doctor
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default DoctorForm;
