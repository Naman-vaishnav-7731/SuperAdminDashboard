import { Container, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useState } from "react";
import axios from "../../../api/axios";
import Swal from "sweetalert2";

const EditRule = ({ isCurrentid, isRules , handleRender }) => {
  // Intial form is Disable for view point of views
  const [isDisable, setisDisable] = useState(true);

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
          const response = await axios.delete("/rule/" + isCurrentid, {
            headers: {
              "Content-Type": "Application/json",
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("Token")
              )}`,
            },
            withCredentials: true,
          });
          console.log(response);
          handleRender();
          if (response) {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  // handle disable
  const handleDisable = (e) => {
    e.preventDefault();
    setisDisable(false);
  };

  // filter data
  const currentRule = isRules.filter(
    (element) => element.Rule_id == isCurrentid
  );

  // Intial Values
  const intialValue = {
    Rule_name: currentRule[0]?.Rule_name,
  };

  const { handleBlur, handleChange, handleSubmit, values } = useFormik({
    initialValues: intialValue,
    enableReinitialize: true,
    onSubmit: async (values, action) => {
      try {
        const response = await axios.put("/rule/" + isCurrentid, values, {
          headers: {
            "Content-Type": "Application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("Token")
            )}`,
          },
          withCredentials: true,
        });
        if(response){
          Swal.fire(`${response.data.message}` , "" , "success");
          handleRender();
        }
      } catch (error) {
        console.log(error);
        Swal.fire(`${error.response.data.message}` , "" , "error");
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
            name="Rule_name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.Rule_name}
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

export default EditRule;
