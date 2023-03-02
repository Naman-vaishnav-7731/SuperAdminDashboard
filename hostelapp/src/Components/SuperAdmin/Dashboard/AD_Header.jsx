import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { FaUserCircle } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { AiOutlineBars } from "react-icons/ai";

const AdminHeader = () => {
  return (
    <div className="header d-flex justify-content-between align-item-center">
      <div className="left-nav">
        <Button type="button" variant="light">
          Ecommerce🛒
        </Button>
      </div>
      <div className="right-nav d-flex justify-content-center">
        <Button type="button" variant="light" className="fs-3">
          <AiOutlineBars style={{ fontSize: "25px" }} />
        </Button>
        <DropdownButton
          id="dropdown-basic-button"
          variant="light"
          title={<FaUserCircle style={{ fontSize: "25px" }} />}
        >
          <Dropdown.Item href="#/action-1">Change Password</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Logout</Dropdown.Item>
        </DropdownButton>
      </div>
    </div>
  );
};

export default AdminHeader;
