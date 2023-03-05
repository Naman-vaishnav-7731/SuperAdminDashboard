import AdminHeader from "./AD_Header";
import { Outlet, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FaUserCircle } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { AiOutlineBars } from "react-icons/ai";
import "../../../css/sideNav.css";

const AdminSidenav = () => {
  const navigate = useNavigate();

  return (
    <div class="wrapper">
      <div class="sidebar">
        <h5>Super Admin 🧑‍💼Dashboard</h5>
        <ul>
          <li>
            <a href="#">Ecommerce Store</a>
          </li>
          <li>
            <DropdownButton
              id="dropdown-basic-button"
              title={"Roles"}
              variant="outline-light"
            >
              <Dropdown.Item
                onClick={() => navigate("addroles")}
                className="text-dark"
              >
                Add Roles
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => navigate("customers")}
                className="text-dark"
              >
                View Roles
              </Dropdown.Item>
            </DropdownButton>
          </li>
          <li>
            <DropdownButton
              id="dropdown-basic-button"
              type="button"
              title={"Customers"}
              variant="outline-light"
            >
              <Dropdown.Item
                onClick={() => navigate("addcustomers")}
                className="text-dark"
              >
                Add Customers
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => navigate("customers")}
                className="text-dark"
              >
                View Customers
              </Dropdown.Item>
            </DropdownButton>
          </li>
          <li>
            <DropdownButton
              id="dropdown-basic-button"
              variant="outline-light"
              title={"Users"}
            >
              <Dropdown.Item href="#/action-1" className="text-dark">
                Add Users
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2" className="text-dark">
                View Users
              </Dropdown.Item>
            </DropdownButton>
          </li>
          <li>
            <a href="#">Products</a>
          </li>
        </ul>
      </div>
      <div class="main_content">
        <AdminHeader />
        <div class="info">
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidenav;
