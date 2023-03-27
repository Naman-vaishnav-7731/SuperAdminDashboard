import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import { Authcontext } from "../../Context/AuthContext";
import { useContext } from "react";

function UserDropdown() {
  const { Islogged, setIslogged } = useContext(Authcontext);
  const navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("userData"));

  const handleLogout = () => {
    localStorage.clear();
    setIslogged(false);
    navigate("/");
  };
  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="muted"
        id="dropdown-basic"
        className="border border-muted"
        style={{ borderRadius: "50px" }}
      >
        <img
          src="userImage/profileImage-1677500188652.jpg"
          width={40}
          style={{ borderRadius: "50px" }}
        />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={() => navigate("/admindashboard")}>
          Profile
        </Dropdown.Item>

        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserDropdown;
