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
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {userData.fname + " " + userData.lname} 🙂
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {userData.userType == "admin" ? (
          <Dropdown.Item onClick={() => navigate("/admindashboard")}>
            Admin Dashboard
          </Dropdown.Item>
        ) : (
          <Dropdown.Item onClick={() => navigate("/profile")}>
            Profile
          </Dropdown.Item>
        )}

        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default UserDropdown;
