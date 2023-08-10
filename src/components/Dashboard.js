import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardHeader,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBBtn,
  MDBSpinner,
  MDBCardText,
  MDBCardFooter,
  MDBCardSubTitle,
  MDBCardLink,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";

const Dashboard = () => {
  const [orders, setOrders] = useState([]);
  const [showBasic, setShowBasic] = useState(false);
  const [users, setUser] = useState({
    userid: "",
    name: "",
    email: "",
    phone: "",
  });
  const [fillActive, setFillActive] = useState("tab1");

  const handleFillClick = (value) => {
    if (value === fillActive) {
      return;
    }

    setFillActive(value);
  };
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

  useEffect(() => {
    const tokens = localStorage.getItem("auth-token");
    const config = {
      headers: {
        "auth-token": "Bearer " + tokens,
      },
    };

    const baseUrl = "http://localhost:5000/rest/getallorders";

    axios
      .get(baseUrl, config)
      .then((data) => {
        const listOfOrders = data.data.data;

        const allorders = listOfOrders
          .filter((e) => {
            if (e.orders) {
              return e;
            }
          })
          .map((e) => e.orders);

        const getOrder = Object.values(allorders).filter(Array.isArray).flat();

        console.log(getOrder);
        console.log(orders);

        setOrders([...getOrder]);
        // const listoforders=userorder.filter((e)=>{

        // })
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = () => {
    localStorage.setItem("isloggedin", "false");
    localStorage.removeItem("auth-token");

    navigate("/login");
  };
  return (
    <>
      <MDBNavbar expand="lg" light bgColor="light">
        <MDBContainer fluid>
          <MDBNavbarBrand href="#">Dashboard</MDBNavbarBrand>

          <MDBNavbarToggler
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon="bars" fas />
          </MDBNavbarToggler>

          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className="mr-auto mb-2 mb-lg-0">
              <MDBNavbarItem>
                <MDBNavbarLink active aria-current="page" href="#">
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href="#">Link</MDBNavbarLink>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle tag="a" className="nav-link" role="button">
                    Dropdown
                  </MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem link>Action</MDBDropdownItem>
                    <MDBDropdownItem link>Another action</MDBDropdownItem>
                    <MDBDropdownItem link>Something else here</MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>

              <MDBNavbarItem>
                <MDBNavbarLink
                  disabled
                  href="#"
                  tabIndex={-1}
                  aria-disabled="true"
                >
                  <span>Logged in as :{users.name}</span>
                </MDBNavbarLink>
              </MDBNavbarItem>
            </MDBNavbarNav>

            <form className="d-flex input-group w-auto">
              <MDBBtn onClick={handleClick} color="danger">
                Logout
              </MDBBtn>
            </form>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>

      <MDBTabs fill className="mb-3 mt-4">
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleFillClick("tab1")}
            active={fillActive === "tab1"}
          >
            Active Orders
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleFillClick("tab2")}
            active={fillActive === "tab2"}
          >
            Completed Orders
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleFillClick("tab3")}
            active={fillActive === "tab3"}
          >
            Another link
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={fillActive === "tab1"}>Tab 1 content</MDBTabsPane>
        <MDBTabsPane show={fillActive === "tab2"}>Tab 2 content</MDBTabsPane>
        <MDBTabsPane show={fillActive === "tab3"}>Tab 3 content</MDBTabsPane>
      </MDBTabsContent>
    </>
  );
};

export default Dashboard;
