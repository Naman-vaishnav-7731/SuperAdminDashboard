import "../../css/admindashboard.css";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();
  return (
    <div class="wrapper">
      <div class="sidebar">
        <h5 style={{marginTop:"80px"}}>Customer🙂Dashboard</h5>
        <ul>
          <li>
            <a  onClick={() => navigate('/admindashboard')}>
              Profile🧑‍💻
            </a>
          </li>
          <li>
            <a onClick={() => navigate("changepassword")}>
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
        <div class="info mt-5">
          <div>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
