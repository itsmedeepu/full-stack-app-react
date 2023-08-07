import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <>
      <div>
        <ol>
          <NavLink to="/register">sign up</NavLink>
          <br></br>
          <NavLink to="/login">login</NavLink>
        </ol>
      </div>
    </>
  );
};
export default Home;
