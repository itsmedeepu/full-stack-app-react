import { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const baseUrl = "http://localhost:5000/admin/";
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const HandleChange = (event) => {
    const { name, value } = event.target;

    setLogin({ ...login, [name]: value });
  };
  const HandleClick = () => {
    setLoading(true);
    axios
      .post(baseUrl + "login", login)
      .then((details) => {
        const tokens = details.data?.data?.token;
        if (tokens) {
          setLoading(false);
          localStorage.setItem("auth-token", tokens);
          localStorage.setItem("isloggedin", true);
          navigate("/dashboard");
        } else {
          console.log(details.data.message);
          // window.alert(details.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <table>
        <tr>
          <td>
            <label>email</label>
          </td>
          <td>
            <input
              type="text"
              name="email"
              onChange={HandleChange}
              value={login.email}
            />
          </td>
        </tr>
        <tr>
          <td>
            <label>password</label>
          </td>
          <td>
            <input
              type="password"
              name="password"
              onChange={HandleChange}
              value={login.password}
            />
          </td>
        </tr>
        <tr>
          <td>
            <button onClick={HandleClick} type="button">
              {loading ? "Logging in" : "Login"}
            </button>
          </td>
        </tr>
      </table>
    </>
  );
};

export default Login;
