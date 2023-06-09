import LandingPage from "./Components/Main/LandingPage";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/Main/Home";
import Profile from "./Components/User/Profile";
import AdminDashboard from "./Components/Admin/admindashbord";
import UserInformation from "./Components/Admin/UserInformation";
import Protected from "./Components/Protected_Routes/ProtectRoutes";
import AddUsers from "./Components/Admin/AddUsers/AddUsers";
import ChangePassword from "./Components/ChangePassword/ChangePassword";
import AdminLogin from "./Components/SuperAdmin/Login/SD_login";
import Dashboard from "./Components/SuperAdmin/Dashboard/SD_dashboard";
import AdminHome from "./Components/SuperAdmin/SD_home";
import AddCustomers from "./Components/SuperAdmin/Customers/AddCustomers";
import AddRoles from "./Components/SuperAdmin/Roles/AddRoles";
import ViewRoles from "./Components/SuperAdmin/Roles/ViewRoles";
import AddRule from "./Components/SuperAdmin/Rule/AddRule";
import ViewRules from "./Components/SuperAdmin/Rule/ViewRule";
import AddUser from "./Components/SuperAdmin/Users/AddUser";
import ViewUser from "./Components/SuperAdmin/Users/ViewUsers";
import ViewCustomers from "./Components/SuperAdmin/Customers/ViewCustomers";
import AddProduct from "./Components/SuperAdmin/Product/AddProduct";
import ViewProduct from "./Components/SuperAdmin/Product/ViewProduct";

function App() {
  return (
    <Routes>
      {/* This is main Routes For all Users and Customer */}
      <Route path="/" element={<Home />}>
        <Route index element={<LandingPage />} />
        {/* Protected Routes Only Acceess Logged User */}
        <Route
          path="/profile"
          element={
            <Protected>
              <Profile />
            </Protected>
          }
        />

        {/* Admin Routes only Access Admin User */}
        <Route
          path="/admindashboard"
          element={
            <Protected>
              <AdminDashboard />
            </Protected>
          }
        >
          <Route path="userinformation" element={<UserInformation />} />
          <Route path="addusers" element={<AddUsers />} />
          <Route path="changepassword" element={<ChangePassword />} />
          <Route index element={<Profile />} />
        </Route>
      </Route>

      {/* implement Routes for Super Admin */}
      <Route path="/admin" element={<AdminHome />}>
        <Route index element={<AdminLogin />} />

        {/* super admin dashboard */}
        <Route
          path="dashboard"
          element={
            <Protected>
              <Dashboard />
            </Protected>
          }
        >
          {/* Implements Customers Routes */}
          <Route path="addcustomers" element={<AddCustomers />} />
          <Route path="customers" element={<ViewCustomers />} />
          <Route path="addroles" element={<AddRoles />} />
          <Route path="roles" element={<ViewRoles />} />
          <Route path="addrules" element={<AddRule />} />
          <Route path="rules" element={<ViewRules />} />
          <Route path="addusers" element={<AddUser />} />
          <Route path="viewuser" element={<ViewUser />} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="viewproduct" element={<ViewProduct />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
