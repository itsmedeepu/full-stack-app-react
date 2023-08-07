import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [users, setUser] = useState({
    userid: "",
    name: "",
    email: "",
    phone: "",
  });
  const baseUrl = "http://localhost:5000/admin/";
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("auth-token");
    const checkLogin = localStorage.getItem("isloggedin");

    if ((token === null && checkLogin === null) || checkLogin === "false") {
      navigate("/login");
    } else {
      var config = {
        headers: {
          "auth-token": "Bearer " + token,
        },
      };
      axios
        .get(baseUrl + "dashboard", config)
        .then((data) => {
          const user = data.data.data;

          setUser(user);
          console.log({ ...users, ...user });
        })
        .catch((err) => {
          navigate("/error");
        });
    }
  }, []);

  const handleClick = () => {
    localStorage.setItem("isloggedin", "false");
    localStorage.removeItem("auth-token");

    navigate("/login");
  };
  return (
    <>
      <div className="card">
        <table>
          <tr>
            <td>
              <p>Name :</p>
            </td>
            <td>
              <p>{users.name}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Email :</p>
            </td>
            <td>
              <p>{users.email}</p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Phone :</p>
            </td>
            <td>
              <p>{users.phone}</p>
            </td>
          </tr>
        </table>
      </div>
      <button onClick={handleClick}>Logout </button>
    </>
  );
};

export default Dashboard;
