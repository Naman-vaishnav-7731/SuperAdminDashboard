import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";
import axios from "../../../api/axios";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useMemo, useState } from "react";
import { useContext } from "react";
import { ModalContext } from "../../../Context/ModalContext";
import EditUserModal from "../../Admin/Edit_Users/EditUserModal";
import {Authcontext} from '../../../Context/AuthContext'
import PagesPagination from "../../Admin/Pagination/pagination";
const userGeturl = "/users/";

const ViewCustomers = () => {
  const AuthToken = JSON.parse(localStorage.getItem("Token"));
  const { setisEditShow } = useContext(ModalContext);
  const { isUserData, setisUserData, setisEditIndex, isForcerender } = useContext(Authcontext);
  console.log({ isUserData });

  // implement tottal no of page | size of pages | serach quary
  const [SearchQuery, setSearchQuery] = useState("");
  const [PageNo, setPageNo] = useState(0);
  const [PageSize, setPageSize] = useState(5);
  const [TotalPages, setTotalPages] = useState(0);

  const paginate = (page) => {
    setPageNo(page);
  };

  // fetch data from server
  const fetchuserData = async () => {
    try {
      const response = await axios.get(
        userGeturl + `?search=${SearchQuery}&page=${PageNo}&size=${PageSize}`,
        {
          headers: { Authorization: `Bearer ${AuthToken}` },
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      );
      console.log(response);
      setisUserData(
        response.data.users.filter((user) => user.userType !== "admin")
      );
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useMemo(() => {
    fetchuserData();
  }, [isForcerender, SearchQuery, PageNo]);

  // Handle View Profile Index
  const HandleIndex = (event) => {
    setisEditShow(true);
    setisEditIndex(event.target.id);
  };

  // handle change
  const handleChange = (event) => {
    // Implement Debounching for Search Somthing after certain time
    const timeId = setTimeout(() => {
      setSearchQuery(event.target.value);
    }, 2000);

    return () => clearTimeout(timeId);
  };

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
            {isUserData.map((element, index) => {
              return (
                <>
                  <tr>
                    <td>{index + 1}</td>
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

export default ViewCustomers;
