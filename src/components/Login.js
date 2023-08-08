import { useState, useRef } from "react";
import axios from "axios";
import LoadingBar from "react-top-loading-bar";
import { useNavigate } from "react-router-dom";
import { MDBInput, MDBBtn, MDBCardHeader, MDBSpinner } from "mdb-react-ui-kit";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const loadingBarRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const baseUrl = "http://localhost:5000/admin/";
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const HandleChange = (event) => {
    const { name, value } = event.target;
    setLogin({ ...login, [name]: value });
  };

  const checkLoginDetails = () => {
    if (login.email === "" || login.password === "") {
      toast.warn("Dont leave blank", {
        position: "top-right",
        autoClose: 5000,
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

  const HandleClick = () => {
    if (checkLoginDetails() === 1) {
      return;
    }
    setLoading(true);
    loadingBarRef.current.continuousStart();
    setProgress(10); // Initialize progress

    axios
      .post(baseUrl + "login", login, {
        onUploadProgress: (progressEvent) => {
          const progressPercent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(progressPercent);
        },
      })
      .then((details) => {
        const tokens = details.data?.data?.token;
        if (tokens) {
          setLoading(false);

          localStorage.setItem("auth-token", tokens);
          localStorage.setItem("isloggedin", true);

          navigate("/dashboard");
        } else {
          toast.error("invalid login details", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((err) => {
        toast.warn("something went bad at server", {
          position: "top-right",
          autoClose: 5000,
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
  };

  return (
    <>
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        ref={loadingBarRef}
      />
      <form className="col-lg-2 col-md-6 m-auto mt-5 ">
        <MDBCardHeader>
          <h2 className="text-center">Login Here</h2>
        </MDBCardHeader>
        <MDBInput
          className="mb-4"
          type="email"
          id="form1Example1"
          label="Email address"
          name="email"
          onChange={HandleChange}
          value={login.email}
        />
        <MDBInput
          className="mb-4"
          type="password"
          id="form1Example2"
          label="Password"
          name="password"
          onChange={HandleChange}
          value={login.password}
        />

        {loading ? (
          <MDBBtn disabled block>
            <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
            Logging in...
          </MDBBtn>
        ) : (
          <MDBBtn type="button" onClick={HandleClick} block>
            Login
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

export default Login;
