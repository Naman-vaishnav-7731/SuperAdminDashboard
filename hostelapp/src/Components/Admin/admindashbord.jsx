import "../../css/admindashboard.css";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();
  return (
    <div class="wrapper">
      <div class="sidebar">
        <h5>Admin🙂Dashboard</h5>
        <ul>
          <li>
            <a  onClick={() => navigate('/admindashboard')}>
              Admin Profile
            </a>
          </li>
          <li >
            <a onClick={() => navigate("userinformation")}>
              User Information
            </a>
          </li>
          <li>
            <a href="#">
              Change Password
            </a>
          </li>
        </ul>
        <div class="social_media">
          <a href="#">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="#">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#">
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>
      <div class="main_content">
        <div class="header">Welcome Admin🧑‍💻🧑‍💻!! Have a nice day.</div>
        <div class="info">
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
