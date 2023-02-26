import * as yup from "yup";

export const UserSchema = yup.object().shape({
  fname: yup.string().required("first name is required"),
  lname: yup.string().required("last name is required"),
  email: yup.string().email().required("email is required"),
  phone: yup.string("Use only Digits").required("Phone number is required"),
  pincode: yup.string().required("Pincode is required"),
  address: yup.string().required("Address is required"),
});
