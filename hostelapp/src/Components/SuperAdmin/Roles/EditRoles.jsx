import { Container, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useState, useMemo } from "react";
import axios from "../../../api/axios";
import Swal from "sweetalert2";
import { useContext } from "react";
import { Authcontext } from "../../../Context/AuthContext";
const URL = "/role/";

const EditRole = ({ isCurrentid }) => {
  // Intial form is Disable for view point of views
  const [isDisable, setisDisable] = useState(true);
  const [isRole, setisRole] = useState([]);
  const { setisForcerender} =  useContext(Authcontext);

  // Handle Delete
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = axios.delete("/role/" + isCurrentid, {
            headers: {
              "Content-Type": "Application/json",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("Token")
              )}`,
            },
            withCredentials: true,
          });
          console.log(response);
          if (response) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            setisForcerender(prev => prev + 1);
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  // Fetch all Roles
  const fetchRoles = async () => {
    try {
      const response = await axios.get(URL, {
        headers: {
          "Content-Type": "Application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("Token"))}`,
        },
        withCredentials: true,
      });
      setisRole(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // use Usememo hook for enchance the performance of app | only updated component re-render
  useMemo(() => {
    fetchRoles();
  }, []);

  // handle disable
  const handleDisable = (e) => {
    e.preventDefault();
    setisDisable(false);
  };

  // filter data
  const currentRole = isRole.filter(
    (element) => element.Role_id == isCurrentid
  );

  // Intial Values
  const intialValue = {
    Role_name: currentRole[0]?.Role_name,
  };

  const { handleBlur, handleChange, handleSubmit, values } = useFormik({
    initialValues: intialValue,
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      try {
        const response = await axios.put(URL+isCurrentid, values ,  {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("Token")
            )}`,
          },
          withCredentials: true,
        });
        if(response){
            Swal.fire("Updated!", `${response.data.message}`, "success");
            setisDisable(true);
            setisForcerender(prev => prev + 1);
        }
      } catch (error) {
        Swal.fire(`${error.response.data.message}`, "" ,  "error");
      }
      
    },
  });

  return (
    <Container className="d-flex flex-column align-items-center justify-content-center min-vh-50">
      <Form className="border rounded p-4" onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Rule Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Rule Name"
            name="Role_name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.Role_name}
            required
            disabled={isDisable}
          />
        </Form.Group>
        {isDisable ? (
          <Button
            variant="primary"
            type="button"
            className="w-30 mt-3"
            onClick={handleDisable}
          >
            Update
          </Button>
        ) : (
          <Button variant="primary" type="Submit" className="w-50 mt-3">
            Save
          </Button>
        )}
        <Button
          variant="danger"
          type="button"
          className="w-30 mt-3 ml-2"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </Form>
    </Container>
  );
};

export default EditRole;
