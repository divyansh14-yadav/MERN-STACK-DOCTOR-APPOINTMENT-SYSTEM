import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllUser,
  deleteUser,
  blockUser,
  unBlockUser,
} from "../redux/actions/auth";

const Allusers = () => {
  const users = useSelector((state) => state.authReducer.user);
  console.log(users, "usersAll");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  const handleDelete = (id) => {
    try {
      dispatch(deleteUser(id));
      dispatch(getAllUser());
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleBlock = (id) => {
    console.log(id, "blockid");
    try {
      dispatch(blockUser(id));
      dispatch(getAllUser());
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnBlock = (id) => {
    console.log(id, "blockid");
    try {
      dispatch(unBlockUser(id));
      dispatch(getAllUser());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="heading">All Users listing</h1>
      <div>
        <table className="table table-striped table-condensed table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
              <th>Block/Unblock</th>
            </tr>
          </thead>
          <tbody>
            {users?.getAllUser?.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? "Admin" : "User"}</td>
                <td>
                  <button
                    type="button"
                    style={{ marginLeft: "6px" }}
                    onClick={() => handleDelete(user._id)}
                  >
                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                  </button>
                </td>
                <td>
                  <button type="button" onClick={() => handleBlock(user._id)}>
                    <i class="fa fa-lock" aria-hidden="true"></i>
                  </button>
                  <button
                    type="button"
                    style={{ marginLeft: "6px" }}
                    onClick={() => handleUnBlock(user._id)}
                  >
                    <i class="fa fa-unlock" aria-hidden="true"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Allusers;
