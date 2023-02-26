import * as yup from "yup";

export const loginSchema = yup.object().shape({
    email: yup.string().email('Invalid email address').required("Email Adress is required").test(
        'is-gmail',
        'Only Gmail addresses are allowed',
        (value) => {
          return value.endsWith('@gmail.com');
        },
    ),
    password: yup.string().required("Password is required").min(6, 'Password should be at least 6 characters'),
});

