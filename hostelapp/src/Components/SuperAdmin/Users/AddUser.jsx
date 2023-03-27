import { useState, useMemo } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "../../../api/axios";
import { useFormik } from "formik";
import { FetchRoles } from "../Roles/fetchRole";
import { FetchRules } from "../Rule/Fetch";
import Swal from "sweetalert2";

const AddUser = () => {
  const [isRole, setisRoles] = useState([]);
  const [isRule, setisRule] = useState([]);

  // use Usememo hook for enchance the performance of app | only updated component re-render
  useMemo(async () => {
    const Roles = await FetchRoles();
    const Rules = await FetchRules();
    setisRoles(Roles);
    setisRule(Rules);
  }, []);

  // Form intial Values
  const intialValue = {
    user_email: "",
    password: "",
    RoleRoleName: "",
    checked: [],
  };

  // Handle form
  const { handleBlur, handleChange, handleSubmit, touched, errors, values } =
    useFormik({
      initialValues: intialValue,
      onSubmit: async (values, action) => {
        // userPermission array assing permissions
        try {
          let response = await axios.post("/user/", values, {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("Token")
              )}`,
            },
            withCredentials: true,
          });
          if(response){
            Swal.fire(`${response.data.message}` , "" , "success");
          }
          action.resetForm();
        } catch (error) {
          console.log(error);
          Swal.fire(`${error.response.data.message}` , "" , "error");
        }
      },
    });

  return (
    <Form className="border border-muted p-3" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label className="text-dark">User Email</Form.Label>
        <Form.Control
          type="email"
          name="user_email"
          placeholder="Enter email"
          value={values.user_email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label className="text-dark">Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label className="text-dark">Role</Form.Label>
        <Form.Control
          as="select"
          placeholder="Select The Role"
          value={values.RoleRoleName}
          onChange={handleChange}
          onBlur={handleBlur}
          name="RoleRoleName"
        >
          {isRole.map((element) => {
            return (
              <option value={element?.Role_name}>{element?.Role_name}</option>
            );
          })}
        </Form.Control>
      </Form.Group>
      <Form.Label className="text-dark m-auto text-center">
        Permissions :
      </Form.Label>
      {isRule.map((element) => {
        return (
          <Form.Group key={element.Rule_name} className="mb-3 border border-muted p-2 rounded">
            <Form.Group className="mb-3 border border-muted p-2 rounded">
              <Form.Label className="text-dark m-auto text-center">
                {element.Rule_name}
              </Form.Label>
              <Form.Check
                type="checkbox"
                id={element.Rule_name + "-" + "1"}
                label="Read"
                checked={values.checked.includes(element.Rule_id + "-" + "1")}
                className="m-auto text-center"
                value={element.Rule_id + "-" + "1"}
                name="checked"
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Form.Check
                type="checkbox"
                id={element.Rule_name + "-" + "2"}
                label="Write"
                className="m-auto text-center"
                checked={values.checked.includes(element.Rule_id + "-" + "2")}
                value={element.Rule_id + "-" + "2"}
                name="checked"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Group>
          </Form.Group>
        );
      })}

      <Button variant="primary" type="submit">
        Add User
      </Button>
    </Form>
  );
};

export default AddUser;
