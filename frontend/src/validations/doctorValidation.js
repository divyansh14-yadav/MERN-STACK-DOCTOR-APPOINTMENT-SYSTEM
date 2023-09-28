import * as yup from "yup";

export const doctorValidation = yup.object({
  doctorName: yup
    .string()
    // .max(15, "DoctorName should be 15 characters or less")
    .required("DoctorName is required"),
  doctorPhone: yup
    .string()
    .matches(/^\d{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
  // image: yup.string().required("Image is required"),
  specialization: yup.string().required("DoctorName is required"),
  consultationFee: yup.number().required("Consultation fee is required"),
  timings: yup.string().required("Timing is required"),
  experience: yup.string().required("Experience is required"),
  description: yup.string().required("Descripton is required"),
  // stateId: yup.string().required("State is required"),
  // cityId: yup.string().required("City is required"),
});
