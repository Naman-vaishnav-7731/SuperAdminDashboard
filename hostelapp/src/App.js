import Header from './Components/Main/Header';
import LandingPage from './Components/Main/LandingPage';
import Footer from './Components/Main/Footer';
import Dashboard from './Components/User/Profile';
import SignupModal from './Components/Signup/SignUpModal';
import SignInModal from './Components/SignIn/SignInModal';
import './App.css';
import {Routes , Route} from 'react-router-dom';
import Home from './Components/Main/Home';
import Profile from './Components/User/Profile';
import AdminDashboard from './Components/Admin/admindashbord';
import UserInformation from './Components/Admin/UserInformation';


function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<LandingPage />} />
          <Route path="/profile" element = {<Profile />} />

          {/* Admin Routes only Access Admin */}
          <Route path="/admindashboard" element = {<AdminDashboard />}>
                <Route path="userinformation" element = {<UserInformation />}/>
                <Route index element = {<Profile />} />
          </Route>
         
        </Route>
      </Routes>
  );
}

export default App;
