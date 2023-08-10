import { useState, useRef } from "react";
import axios from "axios";
import { MDBInput, MDBBtn, MDBCardHeader, MDBSpinner } from "mdb-react-ui-kit";
import { ToastContainer, toast } from "react-toastify";
import LoadingBar from "react-top-loading-bar";
const Register = () => {
  const loadingBarRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const baseUrl = "http://localhost:5000/admin/";
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    cpassword: "",
  });

  const [loading, setLoading] = useState(false);

  const HandleChange = (event) => {
    const { name, value } = event.target;

    if (name === "cpassword") {
      if (admin.password !== value) {
      } else {
      }
    }

    setAdmin({ ...admin, [name]: value });
  };

  const checkAllDetails = () => {
    if (
      admin.name == "" ||
      admin.email == "" ||
      admin.password == "" ||
      admin.phone == "" ||
      admin.cpassword == ""
    ) {
      toast.warn("Dont leave blank", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      return 1;
    }
  };

  const handleSubmit = (event) => {
    if (checkAllDetails() == 1) {
      return;
    }
    event.preventDefault();
    setLoading(true);
    loadingBarRef.current.continuousStart();
    setProgress(10);
    setLoading(true);
    const check = admin.password === admin.cpassword ? true : false;
    if (check) {
      axios
        .post(baseUrl + "register", admin, {
          onUploadProgress: (progressEvent) => {
            const progressPercent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(progressPercent);
          },
        })
        .then((data) => {
          toast.success("user registred sucessfully", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setAdmin({
            name: "",
            email: "",
            password: "",
            phone: "",
            cpassword: "",
          });
        })
        .catch(function (error) {
          toast.error("something went bad at servser side ", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
        .finally(() => {
          setLoading(false);
          loadingBarRef.current.complete();
        });
    } else {
      loadingBarRef.current.complete();
      toast.warn("Confirm password not matching", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setLoading(false);
  };
  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        ref={loadingBarRef}
      />
      <form className="col-lg-2 col-sm-2 col-md-2 m-auto mt-5 ">
        <MDBCardHeader>
          <h2 className="text-center">Register Here</h2>
        </MDBCardHeader>
        <MDBInput
          className="mb-4"
          type="email"
          id="form1Example1"
          label="Name"
          name="name"
          onChange={HandleChange}
          value={admin.name}
        />
        <MDBInput
          className="mb-4"
          type="text"
          id="form1Example2"
          label="Email"
          name="email"
          onChange={HandleChange}
          value={admin.email}
        />
        <MDBInput
          className="mb-4"
          type="text"
          id="form1Example2"
          label="Phone"
          name="phone"
          onChange={HandleChange}
          value={admin.phone}
        />
        <MDBInput
          className="mb-4"
          type="password"
          id="form1Example2"
          label="Create Password"
          name="password"
          onChange={HandleChange}
          value={admin.password}
        />
        <MDBInput
          className="mb-4"
          type="password"
          id="form1Example2"
          label="Confrim Password"
          name="cpassword"
          onChange={HandleChange}
          value={admin.cpassword}
        />

        {loading ? (
          <MDBBtn disabled block>
            <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
            Wait...
          </MDBBtn>
        ) : (
          <MDBBtn type="button" onClick={handleSubmit} block>
            Register
          </MDBBtn>
        )}
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Register;
