// import React, { useEffect, useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { getAllDoctor,updateDoctor,deleteDoctor } from "../redux/actions/doctorAction";
// import { NavLink } from "react-router-dom";

// const DoctorList = () => {

//     const [inputs, setInputs] = useState({ doctorName: "", patientName: "", patientPhone: "",dateAndTime:""});
//     const [editIndex, setEditIndex] = useState(null);

//     const allDoctor = useSelector((state)=>state.doctorReducer.doctorList);
//     console.log(allDoctor,"alldoctorlist");

//     const dispatch = useDispatch()

//     useEffect(()=>{
//         dispatch(getAllDoctor())
//       },[dispatch])

//     //   const handleChange = (e) => {
//     //     setInputs({
//     //       ...inputs,
//     //       [e.target.name]: e.target.value,
//     //     });
//     //   };
    
//     //   const handleEdit = (index) => {
//     //     setEditIndex(index);
//     //     const doctorToEdit = allDoctor[index];
//     //     setInputs(doctorToEdit);
//     //   };
    
    
    
//     // const handleUpdate = async(id) => {
    
//     //       try {
//     //         await dispatch(updateDoctor(id, inputs))
//     //          dispatch(getAllDoctor());
//     //         setEditIndex(null);
//     //       } catch (error) {
//     //         console.error("Error updating appointment:", error);
            
//     //       } 
//     //   };
    
    
//     const handleDelete = async (id) => {
//         try {
//           await dispatch(deleteDoctor(id));
//           dispatch(getAllDoctor()); 
//         } catch (error) {
//         }
//       };
    
//     // const handleCancle = ()=>{
//     //   setInputs("")
//     //   setEditIndex("")
//     // }

//   return (
//     <div>
//        <div>
//         <button className="heading search-button" type="submit">
//                <NavLink to="/doctor" activeClassName="activeLink" className="searchlink">ADD DOCTOR
//               </NavLink>  
//         </button>
//       </div>
//     <div className="container ">
//       {allDoctor?.map((doctorInfo, index) => (
//         <div key={index} className="doctor-card">

//           <div className="doctor-image">
//             <img
//               src={"http://localhost:5001/" + doctorInfo.image}
//               alt={doctorInfo.doctorName}
//             />
//           </div>
//           <div className="doctor-details">
//             <h3>{doctorInfo.doctorName}</h3>
//             <p>
//               <span className="card"> Specialization</span>:{" "}
//               {doctorInfo.specialization}
//             </p>
//             <p>
//               {" "}
//               <span className="card"> Phone</span>:{" "}
//               {doctorInfo.doctorPhone}
//             </p>
//             <p>
//               <span className="card"> Experience</span>:{" "}
//               {doctorInfo.experience} years
//             </p>
//             <p>
//               <span className="card"> Timings</span>: {doctorInfo.timings}
//             </p>
//             <p>
//               <span className="card"> Description</span>:{" "}
//               {doctorInfo.description}
//             </p>
//               <p>
//               <span className="card"> State</span>:{" "}
//               {doctorInfo.stateId.map((e)=>(
//                  <span>{e.state}</span>
//               ))}
//             </p>
//             <p>
//               <span className="card">City</span>:{" "}
//               {doctorInfo.cityId.map((el)=>(
//                 <span>{el.city}</span>
//               ))}
//             </p>

//      <div>
//       <button className="heading search-button-admin" type="submit" onClick={() => handleDelete(doctorInfo._id)}>
// Delete 
//       </button>
//       {/* <button className="heading search-button-admin2" type="submit">
// Edit 
//       </button> */}
//     </div>
//           </div>
//         </div>
//       ))}
//               <div>
// <ul class="pagination pagination-sm">
//   <li><a href="#">1</a></li>
//   <li><a href="#">2</a></li>
//   <li><a href="#">3</a></li>
//   <li><a href="#">4</a></li>
//   <li><a href="#">5</a></li>
// </ul>
//         </div>
//     </div>
//     </div>
//   );
// };

// export default DoctorList;

// with paginated component

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllDoctor, deleteDoctor } from "../redux/actions/doctorAction";
import { NavLink } from "react-router-dom";

const DoctorList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [doctorsPerPage] = useState(5);

  const allDoctor = useSelector((state) => state.doctorReducer.doctorList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDoctor());
  }, []);

  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = allDoctor?.slice(indexOfFirstDoctor, indexOfLastDoctor);

  const handleDelete = (id) => {
    // try {
       dispatch(deleteDoctor(id));
      dispatch(getAllDoctor());
    // } catch (error) {
    //   console.error("Error deleting doctor:", error);
    // }
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div>
        <button className="heading search-button" type="submit">
          <NavLink
            to="/doctor"
            activeClassName="activeLink"
            className="searchlink"
          >
            ADD DOCTOR
          </NavLink>
        </button>
      </div>
      <div className="container">
        {currentDoctors?.map((doctorInfo, index) => (
          <div key={index} className="doctor-card">
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
              <span className="card"> Phone</span>:{" "}
              {doctorInfo.doctorPhone}
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
              {doctorInfo.stateId.map((e)=>(
                 <span>{e.state}</span>
              ))}
            </p>
            <p>
              <span className="card">City</span>:{" "}
              {doctorInfo.cityId.map((el)=>(
                <span>{el.city}</span>
              ))}
            </p>
              <div>
                <button
                  className="heading search-button-admin"
                  type="submit"
                  onClick={() => handleDelete(doctorInfo._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <ul className="pagination pagination-sm">
          {Array.from({ length: Math.ceil(allDoctor?.length / doctorsPerPage) }).map((_, index) => (
            <li key={index} className={currentPage === index + 1 ? "active" : ""}>
              <a onClick={() => paginate(index + 1)} href="#">
                {index + 1}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorList;
