import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookAppointment } from "../redux/actions/appointmentAction";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import { validationSchema } from "../validations/appointmentBook";
import moment from "moment";
import { getAllDoctor } from "../redux/actions/doctorAction";

const AppointmentsBook = () => {
  const [submit, setSubmit] = useState(false);

  const appointments = useSelector((state) => state.appointmentReducer);
  console.log(appointments, "11111111456");

  const { errorMessage } = useSelector((state) => state.appointmentReducer);
  console.log(errorMessage, "errorMessages");

  // const {appointments,errorMessage} = useSelector((state) => state.appointmentReducer);
  // console.log(appointments?.errorMessage, "11111111456");
  // console.log(errorMessage, "errorMessages");

  const allDoctor = useSelector((state) => state.doctorReducer.doctorList);
  console.log(allDoctor, "alldoctorlist");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (appointments.status === false) {
      if (
        errorMessage ===
        "Appointments are available between 12:00 PM and 6:00 PM"
      ) {
        alert(`${errorMessage}`);
      } else if (errorMessage === "Appointments booked in 30-minute interval") {
        alert(`${errorMessage}`);
      } else if (errorMessage === "Slot is already booked") {
        alert(`${errorMessage}`);
      }
    }
    if (appointments.status === true) {
      if (errorMessage === "Appointment is successfully booked") {
        alert(`${errorMessage}`);
      }
    }
  }, [errorMessage, appointments]);

  const handleSubmit = (values, { resetForm }) => {
    console.log(values, "values");

    setSubmit(true);
    const formattedDateTime = moment(values.dateAndTime).format(
      "YYYY-MM-DD HH:mm"
    );
    dispatch(bookAppointment({ ...values, dateAndTime: formattedDateTime }));
    resetForm();
  };

  useEffect(() => {
    dispatch(getAllDoctor());
  }, []);

  return (
    <Formik
      initialValues={{
        doctorName: "",
        patientName: "",
        patientPhone: "",
        dateAndTime: "",
      }}k
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <div className="reg-form">
          <h1 className="heading-large">Book Appointments Here</h1>
          <Form className="form-group main-form" onSubmit={handleSubmit}>
            <div className="form-field">
              <label className="lable-from">DoctorName</label>
              <Field
                as="select"
                name="doctorName"
                className="form-control form-input"
              >
                <option value="">Select Doctor</option>
                {allDoctor?.map((doctor) => (
                  <option key={doctor.id} value={doctor._id}>
                    {doctor.doctorName}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="doctorName"
                component="div"
                className="error"
              />
            </div>

            <div className="form-field">
              <label className="lable-from">PatientName</label>
              <Field
                name="patientName"
                type="text"
                className="form-control form-input"
                placeholder="Enter PatientName"
              />
              <ErrorMessage
                name="patientName"
                component="div"
                className="error"
              />
            </div>

            <div className="form-field">
              <label className="lable-from">PatientPhone</label>
              <Field
                name="patientPhone"
                type="text"
                className="form-control form-input"
                placeholder="Enter patientPhone"
              />
              <ErrorMessage
                name="patientPhone"
                component="div"
                className="error"
              />
            </div>

            <div className="form-field">
              <label className="lable-from">Date and Time</label>
              <Field
                name="dateAndTime"
                type="datetime-local"
                className="form-control form-input new"
                placeholder="Enter Date and Time"
              />
              <ErrorMessage
                name="dateAndTime"
                component="div"
                className="error"
              />
            </div>

            <div>
              <button type="submit" className="btn btn-primary button appointment-button">
                Book Appointment
              </button>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
};

export default AppointmentsBook;
