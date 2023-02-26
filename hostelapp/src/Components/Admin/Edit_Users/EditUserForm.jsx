import { Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import axios from "../../../api/axios";
import { AlertContext } from "../../../Context/AlertContext";
import { useContext, useState } from "react";
import DangerAlert from "../../Alerts/DangerAlert";
import { Authcontext } from "../../../Context/AuthContext";
import { UserSchema } from "../../../Validations/UserValidation";
import DeleteAlert from "../Alters_buttons/DeleteAlert";
const LoginUrl = "/users/"; 

const EditUserForm = () => {
  const { isSignupAlert, setisSignupAlert } = useContext(AlertContext);
  const [isError, setisError] = useState([]);
  const [isAlertColor, setisAlertColor] = useState("");
  const [isDisabled, setisDisabled] = useState(true);

  // Store all User Data Globally
  const { isUserData, isEditIndex , setisForcerender } = useContext(Authcontext);
  const currentUser = isUserData.filter((element, index) => {
    return element.id == isEditIndex;
  });

  // Show and Hide Delete Alert
  const [isDeleteAlert , setisDeleteAlert] = useState(false);

  // set Delete Value
  const handleDeleteAlert = (value) => {
    setisDeleteAlert(value);
  }


  // initial fome value
  const intialValues = {
    fname: currentUser[0]?.fname,
    lname: currentUser[0]?.lname,
    phone: currentUser[0]?.phone,
    email: currentUser[0]?.email,
    address: currentUser[0]?.address,
    pincode: currentUser[0]?.pincode,
  };

  // implements formik for form validation
  const {
    handleBlur,
    handleChange,
    errors,
    touched,
    handleSubmit,
    values,
    resetForm,
  } = useFormik({
    initialValues: intialValues,
    enableReinitialize:true,
    validationSchema:UserSchema,
    onSubmit:  async (values) => {
      try {
        const response = await axios.put(LoginUrl+intialValues.email , values , {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("Token"))}`,
          }
        });
        console.log(response);
        setisForcerender(prev => prev + 1);
      
      } catch (error) {
        console.log(error);
      }
    },
  });

  // Implement delete user informarion functionlity
  const HandleDelete = async () => {
    try {
        const response = await axios.delete(LoginUrl+intialValues.email , {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("Token"))}`,
        }
      })
      console.log(response);
      // forcefully re- render the component
      setisForcerender(prev => prev + 1);
      
    } catch (error) {
      console.log(error);
    }
}

  return (
    <div className="container">
      <DangerAlert color={isAlertColor} message={isError} />
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="FirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            name="fname"
            value={values.fname}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isDisabled}
          />
          {touched.fname && errors.fname ? (
            <Form.Text className="text-danger">{errors.fname}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group controlId="LastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            name="lname"
            value={values.lname}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isDisabled}
          />
          {touched.lname && errors.lname ? (
            <Form.Text className="text-danger">{errors.lname}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled
          />
          {touched.email && errors.email ? (
            <Form.Text className="text-danger">{errors.fname}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group controlId="Phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            name="phone"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isDisabled}
            maxLength="10"
          />
          {touched.phone && errors.phone ? (
            <Form.Text className="text-danger">{errors.phone}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group controlId="Address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            name="address"
            value={values.address}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isDisabled}
          />
          {touched.address && errors.address ? (
            <Form.Text className="text-danger">{errors.address}</Form.Text>
          ) : null}
        </Form.Group>

        <Form.Group controlId="Pincode">
          <Form.Label>Pincode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter pincode"
            name="pincode"
            value={values.pincode}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isDisabled}
            maxLength="6"
          />
          {touched.pincode && errors.pincode ? (
            <Form.Text className="text-danger">{errors.pincode}</Form.Text>
          ) : null}
        </Form.Group>
        <br />
        {isDisabled ? (
          <Button
            variant="success"
            type="button"
            className="w-40 "
            onClick={() => setisDisabled(false)}
          >
            Edit Profile
          </Button>
        ) : (
          <Button
            variant="success"
            type="submit"
            className="w-40 "
           
          >
            Save Changes
          </Button>
        )}

        <Button variant="danger" type="button" className="w-40 ml-2 "  onClick={() =>setisDeleteAlert(true)}>
          Delete
        </Button>
      </Form>
      <DeleteAlert isDeleteAlert={isDeleteAlert} handleDeleteAlert={handleDeleteAlert}  HandleDelete={HandleDelete}/>
    </div>
  );
};

export default EditUserForm;
