import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByIdAppointment } from "../redux/actions/appointmentAction";

const Profile = () => {
  const { user } = useSelector((state) => state.authReducer);
  console.log(user, "profileuser");

  const { appointments } = useSelector((state) => state.appointmentReducer);
  console.log(appointments, "1APPOINTMENT");

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user._id) {
      dispatch(getByIdAppointment(user._id));
    }
  }, [dispatch, user]);

  const email = localStorage.getItem("emailmail");
  const name = localStorage.getItem("userName");

  return (
    <div>
      <h1 className="heading">User Profile</h1>
      <div className="container">
        <div className="doctor-card">
          <div>
            <div>
              <h5>Name</h5>
              <p className="profilepageName">{name}</p>
            </div>
            <div>
              <h5>Email:</h5>
              <p className="profilepageemail">{email}</p>
            </div>
            <div>
              <h5>Your Appointments:</h5>
              {appointments &&
                appointments?.getById?.map((appointment) => (
                  <p key={appointment._id} className="profilepageemail">
                    {appointment.dateAndTime}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
