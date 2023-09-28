import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/auth";

const Nav = () => {
  const user = useSelector((state) => state.authReducer.user);
  const token = useSelector((state) => state.authReducer.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/login");
  };
  const message = localStorage.getItem("message");
  if (token) {
    if (message === "admin logged In") {
      // Render admin navigation
      return (
        <div className="header">
          <div className="nav_d">
            <nav className="navbar navbar-expand-lg navbar-light nav-back-colour">
              <div className="container-fluid">
                <ul className="nav navbar-nav font-color">
                  <div className="navbar-header">
                    <NavLink
                      to="/appointmentsBook"
                      className="navbar-brand nav_d font-color"
                    >
                      Doctor Appointments
                    </NavLink>
                  </div>
                  <li>
                    <NavLink
                      className="font-color"
                      to="/appointmentsBook"
                      activeClassName="activeLink"
                    >
                      Appointments Book
                    </NavLink>
                  </li>
                  {/* <li>
                    <NavLink to="/doctor" activeClassName="activeLink">
                      Add Doctor
                    </NavLink>
                  </li> */}
                  <li>
                    <NavLink
                      className="font-color"
                      to="/doctorlist"
                      activeClassName="activeLink"
                    >
                      All Doctors list
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="font-color"
                      to="/allAppointments"
                      activeClassName="activeLink"
                    >
                      Users All Appointments
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="font-color"
                      to="/allUser"
                      activeClassName="activeLink"
                    >
                      Registerd Users List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="font-color"
                      to="/logout"
                      activeClassName="activeLink"
                      onClick={handleLogout}
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      );
    } else {
      return (
        <div className="header">
          <div className="nav_d">
            <nav className="navbar navbar-expand-lg navbar-light nav-back-colour">
              <div className="container-fluid">
                <ul className="nav navbar-nav font-color">
                  <div className="navbar-header">
                    <NavLink
                      to="/appointmentsBook"
                      className="navbar-brand nav_d font-color"
                    >
                      Doctor Appointments
                    </NavLink>
                  </div>
                  <li>
                    <NavLink
                      className="font-color"
                      to="/appointmentsBook"
                      activeClassName="activeLink"
                    >
                      Appointments Book
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="font-color"
                      to="/allAppointments"
                      activeClassName="activeLink"
                    >
                      Appointments History
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="font-color"
                      to="/logout"
                      activeClassName="activeLink"
                      onClick={handleLogout}
                    >
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      );
    }
  } else {
    // Render navigation for unauthenticated users
    return (
      <div className="header">
        <div className="nav_d">
          <nav className="navbar navbar-expand-lg navbar-light nav-back-colour">
            <div className="navbar-header">
              <NavLink to="" className="navbar-brand nav_d font-color">
                Doctor Appointments
              </NavLink>
            </div>
            <ul className="nav navbar-nav " style={{ marginLeft: "780px" }}>
              <li>
                <NavLink
                  className="font-color"
                  to="/"
                  activeClassName="activeLink"
                  style={{ textDecoration: "none !important" }}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="font-color"
                  to="/contact"
                  activeClassName="activeLink gel"
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="font-color"
                  to="/register"
                  activeClassName="activeLink gel"
                >
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="font-color"
                  to="/login"
                  activeClassName="activeLink gel"
                >
                  Login
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
};

export default Nav;
