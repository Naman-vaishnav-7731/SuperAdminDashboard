import { useFormik } from "formik";
import { Container  , Row , Col} from "react-bootstrap";
import { Form } from "react-bootstrap";
import {Button} from "react-bootstrap";

const ChangePassword = () => {

    // Initial Values for change password
    const intialvalues = {
        currentpassword:'',
        newpassword:'',
        confirmpassword:''
    }

    // Handle Form using formik
    const {handleBlur , handleChange , handleSubmit , touched , errors , values} = useFormik({
        initialValues:intialvalues,
        onSubmit:async (values) => {
            console.log(values);
        }
    });



    return(
    <Container className="container" style={{width:'40%' , background:'white' , paddingTop:'40px'} }>
      <Row className="justify-content-center">
     
        <Col md={12} lg={8}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Current Password</Form.Label>
              <div className="input-group">
                <div className="input-group-prepend"></div>
                <Form.Control
                  type="password"
                  placeholder="Enter Current Password"
                  value={values.email}
                  onChange={handleChange}
                  name="currentpassword"
                  onBlur={handleBlur}
                />
              </div>
              {touched.email && errors.email ? (
                <Form.Text className="text-danger">{errors.email}</Form.Text>
              ) : null}
            </Form.Group>
            

            <Form.Group controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <div className="input-group">
                <div className="input-group-prepend"></div>
                <Form.Control
                  type="password"
                  placeholder="Enter New Password"
                  name="newpassword"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={6}
                />
              </div>
              {touched.password && errors.password ? (
                <Form.Text className="text-danger">{errors.password}</Form.Text>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <div className="input-group">
                <div className="input-group-prepend"></div>
                <Form.Control
                  type="password"
                  placeholder="Enter Confirm Password"
                  name="confirmpassword"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxLength={6}
                />
              </div>
              {touched.password && errors.password ? (
                <Form.Text className="text-danger">{errors.password}</Form.Text>
              ) : null}
            </Form.Group>


            <Button variant="primary" type="submit" className="w-100 mt-4">
                Change Password
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    )
}

export default ChangePassword;