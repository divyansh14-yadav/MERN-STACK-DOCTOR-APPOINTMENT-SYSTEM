import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Contact from "./pages/contact";
import Register from "./pages/register";
import Login from "./pages/login";
import Nav from "./components/nav";
import Profile from "./components/profile";
import AppointmentsBook from "./pages/appointmentsBook";
import ListAppointments from "./pages/listAppointment";
import AvailableBookings from "./pages/availableBooking";
import ProtectedRoute from "./components/ProtectedRoutes";
import ForgotPassword from "./pages/forgetPassword";
import ForgotPasswordRequest from "./pages/forgetPasswordRequest";
import DoctorForm from "./pages/doctorForm";
import DoctorList from "./pages/doctorlist";
import Allusers from "./pages/allUser";
import Footer from "./components/footer";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/appointmentsBook"
          element={
            <ProtectedRoute>
              <AppointmentsBook />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/appointmentsBook" element={<AppointmentsBook/>} /> */}
        {/* <Route path="/allAppointments" element={<ProtectedRoute>
          <ListAppointments/>
          </ProtectedRoute>} /> */}
        <Route path="/allAppointments" element={<ListAppointments />} />
        {/* <Route path="/getAvailableAppointments" element={<AvailableBookings/>} /> */}
        <Route
          path="/forgetPasswordRequest"
          element={<ForgotPasswordRequest />}
        />
        <Route path="/forgetPassword" element={<ForgotPassword />} />
        <Route path="/doctor" element={<DoctorForm />}></Route>
        <Route path="/doctorlist" element={<DoctorList />}></Route>
        <Route path="/allUser" element={<Allusers />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
