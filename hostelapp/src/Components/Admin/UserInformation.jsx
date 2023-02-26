import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import axios from "../../api/axios";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { ModalContext } from "../../Context/ModalContext";
import EditUserModal from "./Edit_Users/EditUserModal";
import { Authcontext } from "../../Context/AuthContext";
import PagesPagination from "./Pagination/pagination";

const LoginUrl = "/users/";

const UserInformation = () => {
  const AuthToken = JSON.parse(localStorage.getItem("Token"));
  const { setisEditShow } = useContext(ModalContext);
  const { isUserData, setisUserData, setisEditIndex, isForcerender } =
    useContext(Authcontext);
  console.log(isUserData);

  // Implementation of pagination
  const [isCurrentpage, setisCurrentpage] = useState(1);
  const [rescordPerpage] = useState(5);
  console.log({ isCurrentpage });

  // Impelementaion of index for Pagination
  const indexOfLastrecored = (isCurrentpage * rescordPerpage);
  const indexOfFirstrecored = indexOfLastrecored - rescordPerpage;
  const TotalPages = Math.ceil(isUserData.length / rescordPerpage);
  let sNo = indexOfFirstrecored;

  // Serach query
  const [isQuery, setisQuery] = useState("");

  const paginate = (page) => {
    setisCurrentpage(page);
  };

  // fetch data from server
  const fetchuserData = async () => {
    try {
      const response = await axios.get(LoginUrl, {
        headers: { Authorization: `Bearer ${AuthToken}` },
        Accept: "application/json",
        "Content-Type": "application/json",
      });
      setisUserData(response.data.filter((user) => user.userType !== "admin" ));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchuserData();
  }, [isForcerender]);

  // Handle View Profile Index
  const HandleIndex = (event) => {
    setisEditShow(true);
    setisEditIndex(event.target.id);
  };

  // handle change
  const handleChange = (event) => {
    console.log(event.target.value);
    setisQuery(event.target.value);
  };

  console.log("serch",isUserData
  .filter((user) => {
    return (
      user.fname.toLowerCase().includes(isQuery.trim()) ||
      user.lname.toLowerCase().includes(isQuery.trim()) ||
      user.email.toLowerCase().includes(isQuery.trim()) ||
      user.phone.toLowerCase().includes(isQuery.trim()) ||
      user.pincode.toLowerCase().includes(isQuery.trim()) ||
      user.address.toLowerCase().includes(isQuery.trim())
    );
  }))

  return (
    <>
      <Container>
        <Form className="d-flex" style={{ width: "80%" }}>
          <Form.Control
            type="text"
            placeholder="Search Users"
            className="me-2"
            aria-label="Search"
            name="search"
            onChange={handleChange}
          />
        </Form>
        <br />
        <Table striped bordered hover size="sm" responsive="sm">
          <thead>
            <tr>
              <th>s.no</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone number</th>
              <th>Address</th>
              <th>Pincode</th>
              <th>View</th>
            </tr>
          </thead>
          <tbody>
            {isUserData
              .filter((user) => {
                return (
                  user.fname.toLowerCase().includes(isQuery.trim()) ||
                  user.lname.toLowerCase().includes(isQuery.trim()) ||
                  user.email.toLowerCase().includes(isQuery.trim()) ||
                  user.phone.toLowerCase().includes(isQuery.trim()) ||
                  user.pincode.toLowerCase().includes(isQuery.trim()) ||
                  user.address.toLowerCase().includes(isQuery.trim())
                );
              })
              .slice(indexOfFirstrecored, indexOfLastrecored)
              .map((element, index) => {
                return (
                  <>
                    <tr>
                      <td>{++sNo}</td>
                      <td>{element?.fname}</td>
                      <td>{element?.lname}</td>
                      <td>{element?.email}</td>
                      <td>{element?.phone}</td>
                      <td>{element?.address}</td>
                      <td>{element?.pincode}</td>
                      <td>
                        <Button
                          onClick={HandleIndex}
                          id={element?.id}
                          variant="outline-success"
                        >
                          View
                        </Button>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </Table>
        <PagesPagination TotalPages={TotalPages} paginate={paginate} />
      </Container>
      <EditUserModal />
    </>
  );
};

export default UserInformation;
