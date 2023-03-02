import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default Home;