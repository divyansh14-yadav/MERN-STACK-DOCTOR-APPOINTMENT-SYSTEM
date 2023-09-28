import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  doctorSearch,
  doctorState,
  doctorCity,
  getAllDoctor,
} from "../redux/actions/doctorAction";
import AppointmentsBook from "./appointmentsBook";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [doctorName, setDoctorName] = useState("");
  const [stateId, setState] = useState("");
  const [cityId, setCity] = useState("");

  console.log(stateId, "allcitystate");

  // const searchResults = useSelector((state) => state.doctorReducer.search);
  // console.log(searchResults, "searchResults");

  // const statesResult = useSelector((state)=>state.doctorReducer.states);
  // console.log(statesResult, "statesResult");

  // const cityResult = useSelector((state)=>state.doctorReducer.city);
  // console.log(cityResult,"cityResult");

  // const allDoctor = useSelector((state)=>state.doctorReducer.doctorList);
  // console.log(allDoctor,"alldoctorlist");

  // const errorMessage = useSelector((state)=>state.doctorReducer.errorMessage);
  // console.log(errorMessage,"errorMessage");

  const { search, states, city, doctorList, errorMessage } = useSelector(
    (state) => state.doctorReducer
  );
  console.log(search, "searchResults");
  console.log(states, "statesResult");
  console.log(city, "cityResult");
  console.log(doctorList, "alldoctorlist");
  console.log(errorMessage, "errorMessage");

  const dispatch = useDispatch();

  useEffect(() => {
    if (errorMessage === "No doctors found") {
      alert("No doctors found");
    }
  });

  // dispatch states

  useEffect(() => {
    dispatch(doctorState());
    dispatch(doctorCity());
    dispatch(getAllDoctor());
  }, []);

  // dispatch city

  // useEffect(()=>{
  //   dispatch(doctorCity())
  // },[])

  // dispatch all doctors

  // useEffect(()=>{
  //   dispatch(getAllDoctor())
  // },[])

  const handleStateChange = (event) => {
    const selectedState = event.target.value;
    setState(selectedState);
    dispatch(doctorCity(selectedState, cityId));
  };

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    setCity(selectedCity);
    dispatch(doctorCity(stateId, selectedCity));
  };

  const handleSearch = () => {
    console.log("Search12", doctorName, stateId, cityId);
    dispatch(doctorSearch({ doctorName, stateId, cityId }));
    // if(doctorName !== stateId && cityId){
    //   alert("No doctor found")
    // }
  };

  const handleCancel = (doctorId) => {
    setDoctorName("");
    setCity("");
    setState("");
    const updatedResults = search.doctors.filter(
      (doctor) => doctor._id !== doctorId
    );

    dispatch({
      type: "DOCTOR_SEARCH",
      payload: {
        data: updatedResults,
      },
    });
  };

  return (
    <div>
      <h1 className="heading">For Book An Appointment please login</h1>
      <div className="heading">
        Click Here For{" "}
        <NavLink to="/login" activeClassName="activeLink">
          LOGIN
        </NavLink>
      </div>

      <div className="input-group">
        <div className="container">
          {/* Select state */}
          <div className="boxes">
            <div style={{ width: "18%" }}>
              <select
                className="form-select sel"
                value={stateId}
                onChange={handleStateChange}
                aria-label="Default select example"
              >
                <option value="">Open this select state</option>
                {states?.map((state, index) => (
                  <option
                    key={index}
                    value={state._id}
                    onClick={() => setState(state._id)}
                  >
                    {state.state}
                  </option>
                ))}
              </select>
            </div>
            {/* select city */}

            <div style={{ width: "18%" }}>
              <select
                className="form-select sel"
                value={cityId}
                onChange={handleCityChange}
                aria-label="Default select example"
              >
                <option value="">Open this select city</option>
                {city?.getAll?.map((city, index) => (
                  <option
                    key={index}
                    value={city._id}
                    onClick={() => setCity(city._id)}
                  >
                    {city.city}
                  </option>
                ))}
              </select>
            </div>
            {/* search bar */}

            <div className="search_input">
              <input
                style={{ height: "46px" }}
                placeholder="Doctor/specialization"
                value={doctorName}
                onChange={(e) => setDoctorName(e.target.value)}
              />
              <button
                style={{
                  borderRadius: "3px",
                  border: "none",
                  background: "#00bafb",
                }}
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* search doctor card */}
      <div className="container ">
        {search?.doctors?.map((doctorInfo, index) => (
          <div key={index} className="doctor-card">
            <button
              className="close-button"
              onClick={() => handleCancel(doctorInfo._id)}
            >
              &times;
            </button>
            <div className="doctor-image">
              <img
                src={"http://localhost:5001/" + doctorInfo.image}
                alt={doctorInfo.doctorName}
              />
            </div>
            <div className="doctor-details">
              <h3>{doctorInfo.doctorName}</h3>
              <p>
                <span className="card"> Specialization</span>:{" "}
                {doctorInfo.specialization}
              </p>
              <p>
                {" "}
                <span className="card"> Phone</span>: {doctorInfo.doctorPhone}
              </p>
              <p>
                <span className="card"> Experience</span>:{" "}
                {doctorInfo.experience} years
              </p>
              <p>
                <span className="card"> Timings</span>: {doctorInfo.timings}
              </p>
              <p>
                <span className="card"> Description</span>:{" "}
                {doctorInfo.description}
              </p>
              <p>
                <span className="card"> State</span>: {doctorInfo.state}
              </p>

              <div>
                <button className="heading search-button" type="submit">
                  <NavLink
                    to="/appointmentsBook"
                    activeClassName="activeLink"
                    className="searchlink"
                  >
                    BOOK APPOINTMENT
                  </NavLink>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* all listing doctor */}
      <div>
        <div className="container ">
          {doctorList?.map((doctorInfo, index) => (
            <div key={index} className="doctor-card">
              <button
                className="close-button"
                onClick={() => handleCancel(doctorInfo._id)}
              >
                {/* &times; */}
              </button>
              <div className="doctor-image">
                <img
                  src={"http://localhost:5001/" + doctorInfo.image}
                  alt={doctorInfo.doctorName}
                />
              </div>
              <div className="doctor-details">
                <h3>{doctorInfo.doctorName}</h3>
                <p>
                  <span className="card"> Specialization</span>:{" "}
                  {doctorInfo.specialization}
                </p>
                <p>
                  {" "}
                  <span className="card"> Phone</span>: {doctorInfo.doctorPhone}
                </p>
                <p>
                  <span className="card"> Experience</span>:{" "}
                  {doctorInfo.experience} years
                </p>
                <p>
                  <span className="card"> Timings</span>: {doctorInfo.timings}
                </p>
                <p>
                  <span className="card"> Description</span>:{" "}
                  {doctorInfo.description}
                </p>
                <p>
                  <span className="card"> State</span>:{" "}
                  {doctorInfo.stateId.map((e) => (
                    <span>{e.state}</span>
                  ))}
                </p>
                <p>
                  <span className="card">City</span>:{" "}
                  {doctorInfo.cityId.map((el) => (
                    <span>{el.city}</span>
                  ))}
                </p>

                <div>
                  <button className="heading search-button" type="submit">
                    <NavLink
                      to="/appointmentsBook"
                      activeClassName="activeLink"
                      className="searchlink"
                    >
                      BOOK APPOINTMENT
                    </NavLink>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
