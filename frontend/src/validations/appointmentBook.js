import * as yup from "yup";

export const validationSchema = yup.object({
  doctorName: yup
    .string()
    // .max(15, "DoctorName should be 15 characters or less")
    .required("DoctorName is required"),
  patientName: yup
    .string()
    .max(15, "PatientName should be 15 characters or less")
    .required("PatientName is required"),
  patientPhone: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  dateAndTime: yup.string().required("Date and time is required"),
});
