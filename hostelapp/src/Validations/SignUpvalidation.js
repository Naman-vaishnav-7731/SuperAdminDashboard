import * as yup from "yup";

const Signupschema = yup.object().shape({
    fname: yup.string().required("First name is reuired").matches(/^[a-zA-Z]+$/, 'Name should only contain alphabets'),
    lname: yup.string().required("Last name is reuired").matches(/^[a-zA-Z]+$/, 'Name should only contain alphabets'),
    email: yup.string().email('Invalid email address').required("Email Adress is required").test(
        'is-gmail',
        'Only Gmail addresses are allowed',
        (value) => {
          return value.endsWith('@gmail.com');
        },
    ),
    password: yup.string().required("Password is required").min(6, 'Password should be at least 6 characters'),
    phone: yup.string().required("Phone number is required"),
    pincode: yup.string().required("Pincode is required"),
    address:yup.string().required("Address is required")
  });

  export default Signupschema;