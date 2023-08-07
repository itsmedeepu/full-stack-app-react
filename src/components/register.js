import { useState } from "react";

import axios from "axios";

const Register = () => {
  const baseUrl = "http://localhost:5000/admin/";
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    cpassword: "",
  });

  const [errormsg, setErrormsg] = useState(true);

  const HandleChange = (event) => {
    const { name, value } = event.target;

    if (name === "cpassword") {
      if (admin.password !== value) {
        setErrormsg(false);
      } else {
        setErrormsg(true);
      }
    }

    setAdmin({ ...admin, [name]: value });


  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const check = admin.password === admin.cpassword ? true : false;
    if (check) {
      axios
        .post(baseUrl + "register", admin)
        .then((data) => {
          console.log(data.data.message);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      window.alert("confirm password not matching");
    }
  };
  return (
    <>
      <table>
        <tr>
          <td>Name</td>
          <td>
            <input
              type="text"
              onChange={HandleChange}
              name="name"
              id="name"
              value={admin.name}
              required
            />
          </td>
        </tr>
        <tr>
          <td>Email</td>
          <td>
            <input
              type="email"
              onChange={HandleChange}
              name="email"
              id="email"
              value={admin.email}
              required
            />
          </td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>
            <input
              type="phone"
              onChange={HandleChange}
              name="phone"
              id="phone"
              value={admin.phone}
              required
            />
          </td>
        </tr>
        <tr>
          <td>Password</td>
          <td>
            <input
              type="password"
              onChange={HandleChange}
              name="password"
              value={admin.password}
              id="password"
              required
            />
          </td>
        </tr>
        <tr>
          <td>confirm Password</td>
          <td>
            <input
              type="password"
              onChange={HandleChange}
              name="cpassword"
              value={admin.cpassword}
              id="cpassword"
              required
            />
            {errormsg ? <span></span> : <span>Password not matching</span>}
          </td>
        </tr>
        <tr>
          <button onClick={handleSubmit} type="button">
            Register
          </button>
        </tr>
      </table>
    </>
  );
};

export default Register;
