import { Outlet } from "react-router-dom";
import AdminSidenav from "./AD_Sidenav";


const Dashboard = () => {
    return(
        <div>
            <AdminSidenav />
            <Outlet />
        </div>
    )
}

export default Dashboard;