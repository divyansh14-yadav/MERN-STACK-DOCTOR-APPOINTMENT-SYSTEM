import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAvailableAppointments } from "../redux/actions/appointmentAction";
import moment from "moment";

const AvailableBookings = () => {
  const dispatch = useDispatch();
  const appointments = useSelector(
    (state) => state.appointmentReducer.appointments
  );
  const errorMessages = useSelector(
    (state) => state.appointmentReducer.errorMessage
  );

  console.log(appointments, "appointmentspage");

  useEffect(() => {
    // debugger
    const dateAndTime = moment().format("YYYY-MM-DD HH:mm:ss");
    console.log(dateAndTime, "date");

    dispatch(getAvailableAppointments(dateAndTime));
  }, [dispatch]);

  if (errorMessages) {
    return <div>Error: {errorMessages}</div>;
  }

  return (
    <div>
      <h1 className="heading">Available Bookings</h1>
      <ul>
        {appointments?.map((booking) => (
          <li key={booking._id}>
            {moment(booking.dateAndTime).format("YYYY-MM-DD HH:mm:ss")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailableBookings;
