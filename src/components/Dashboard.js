import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBBtn,
  MDBSpinner,
} from "mdb-react-ui-kit";

const Dashboard = () => {
  const [users, setUser] = useState({
    userid: "",
    name: "",
    email: "",
    phone: "",
  });
  // const [Order, setOrders] = useEffect({
  //   tableno: "",
  //   orderid: "",
  //   dishes: [],
  // });

  const [pageloading, SetPageLoading] = useState(false);
  const baseUrl = "http://localhost:5000/admin/";
  const navigate = useNavigate();
  useEffect(() => {
    SetPageLoading(true);
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
        })
        .catch((err) => {
          navigate("/error");
        });
    }

    SetPageLoading(false);
  }, []);

  const handleClick = () => {
    localStorage.setItem("isloggedin", "false");
    localStorage.removeItem("auth-token");

    navigate("/login");
  };
  return (
    <>
      <MDBCard className="text-center">
        <MDBCardHeader>
          <MDBTabs className="card-header-tabs">
            <MDBTabsItem>
              <MDBTabsLink active>Active</MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink>Link</MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
              <MDBTabsLink className="disabled">Disabled</MDBTabsLink>
            </MDBTabsItem>
          </MDBTabs>
        </MDBCardHeader>
        <MDBCardBody>
          {users.name === "" ? ( // Check if pageloading is true
            <MDBSpinner
              className="me-2"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </MDBSpinner>
          ) : (
            <div>
              <MDBCardTitle>Welcome to Dashboard {users.name}</MDBCardTitle>
              {/* ...other card content... */}
              <MDBBtn onClick={handleClick} className="">
                Logout
              </MDBBtn>
            </div>
          )}
        </MDBCardBody>
      </MDBCard>
    </>
  );
};

export default Dashboard;
