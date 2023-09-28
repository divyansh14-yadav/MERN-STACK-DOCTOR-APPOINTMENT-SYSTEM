import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllAppointment,
  deleteAppointments,
  updateAppointments,
} from "../redux/actions/appointmentAction";
// import { useNavigate } from "react-router-dom";

const ListAppointments = () => {
  const [inputs, setInputs] = useState({
    doctorName: "",
    patientName: "",
    patientPhone: "",
    dateAndTime: "",
  });
  const [editIndex, setEditIndex] = useState(null);

  const appointments = useSelector(
    (state) => state.appointmentReducer.appointments
  );
  console.log(appointments, "listofappointments");

  const dispatch = useDispatch();
  //   const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllAppointment());
  }, []);

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    const appointmentToEdit = appointments[index];
    setInputs(appointmentToEdit);
  };

  const handleUpdate = async (id) => {
    try {
      await dispatch(updateAppointments(id, inputs));
      dispatch(getAllAppointment());
      setEditIndex(null);
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteAppointments(id));
      dispatch(getAllAppointment());
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleCancle = () => {
    setInputs("");
    setEditIndex("");
  };

  return (
    <div>
      <h1 className="heading">All Appointments</h1>
      {Array.isArray(appointments) && appointments.length > 0 ? (
        <table className="table table-striped table-condensed table-bordered">
          <thead>
            <tr>
              <th>DoctorName</th>
              <th>PatientName</th>
              <th>PatientPhone</th>
              <th>dateAndTime</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((e, index) => (
              <tr key={e.id}>
                {editIndex === index ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="doctorName"
                        value={inputs.doctorName}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="patientName"
                        value={inputs.patientName}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="patientPhone"
                        value={inputs.patientPhone}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        name="date"
                        value={inputs.dateAndTime}
                        onChange={handleChange}
                      />
                    </td>
                    <td>
                      <button type="button" onClick={() => handleUpdate(e._id)}>
                        Save
                      </button>
                      <button type="button" onClick={() => handleCancle(e._id)}>
                        Cancle
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{e?.doctorName?.doctorName}</td>
                    <td>{e.patientName}</td>
                    <td>{e.patientPhone}</td>
                    <td>{e.dateAndTime}</td>
                    <td>
                      <button type="button" onClick={() => handleEdit(index)}>
                        <i class="fa fa-pencil" aria-hidden="true"></i>
                      </button>
                      <button
                        type="button"
                        style={{ marginLeft: "6px" }}
                        onClick={() => handleDelete(e._id)}
                      >
                        <i class="fa fa-trash-o" aria-hidden="true"></i>
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1>No appointments found.</h1>
      )}
    </div>
  );
};

export default ListAppointments;
