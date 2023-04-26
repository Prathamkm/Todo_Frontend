import React, { useContext } from "react";
import { Context, server } from "../main";
import Loader from "../components/Loader";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { isAuthenticated, loading, user, setIsAuthenticated } =
    useContext(Context);

  const deleteUser = async () => {
    try {
      const { data } = await axios.delete(`${server}/users/delete`, {
        withCredentials: true,
      });
      toast.success(data.message);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return loading ? (
    <Loader />
  ) : isAuthenticated ? (
    <div className="container">
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
      <button onClick={deleteUser} type="button" className="btn btn-danger">
        Delete Account
      </button>
    </div>
  ) : (
    ""
  );
};

export default Profile;
