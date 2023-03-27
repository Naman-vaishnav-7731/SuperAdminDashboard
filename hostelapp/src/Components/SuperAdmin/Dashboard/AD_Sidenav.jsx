import AdminHeader from "./AD_Header";
import { Outlet, useNavigate } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
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
                onClick={() => navigate("roles")}
                className="text-dark"
              >
                View Roles
              </Dropdown.Item>
            </DropdownButton>
          </li>
          <li>
            <DropdownButton
              id="dropdown-basic-button"
              title={"Rules"}
              variant="outline-light"
            >
              <Dropdown.Item
                onClick={() => navigate("addrules")}
                className="text-dark"
              >
                Add Rules
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => navigate("rules")}
                className="text-dark"
              >
                View Rules
              </Dropdown.Item>
            </DropdownButton>
          </li>
          <li>
            <DropdownButton
              id="dropdown-basic-button"
              variant="outline-light"
              title={"Users"}
            >
              <Dropdown.Item onClick={() => navigate("addusers")} className="text-dark">
                Add Users
              </Dropdown.Item>
              <Dropdown.Item onClick={() => navigate("viewuser")}className="text-dark">
                View Users
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
              type="button"
              title={"Product"}
              variant="outline-light"
            >
              <Dropdown.Item
                onClick={() => navigate("addproduct")}
                className="text-dark"
              >
                Add Product
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => navigate("viewproduct")}
                className="text-dark"
              >
                View Product
              </Dropdown.Item>
            </DropdownButton>
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
