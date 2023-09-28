import * as yup from "yup";

export const validationSchema = yup.object({
  email: yup.string().email("Email is invalid").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password should be 6 characters long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .when("password", (password, field) =>
      password ? field.required().oneOf([yup.ref("password")]) : field
    ),
});
