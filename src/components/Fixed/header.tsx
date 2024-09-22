import { Dropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

const Header = () => {
  const user = localStorage.getItem("UserData");

  const Isuser = user ? JSON.parse(user) : null;

  const OnLogout = () => {
    localStorage.clear();

    setTimeout(() => {
      location.reload();
    }, 1000);
  };

  return (
    <>
      <Navbar data-bs-theme="light" className="shadow ">
        <Container>
          <Link to={"/"} className="text-decoration-none fs-2 ">
            Home
          </Link>

          <div>
            {Isuser ? (
              <Dropdown>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {Isuser.userName}
                </Dropdown.Toggle>

                <Dropdown.Menu className="w-100">
                  <Dropdown.Item onClick={OnLogout}>Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Link to={"/login"} className="btn bg-warning fw-bold mx-2">
                  Login
                </Link>
                <Link
                  to={"/register"}
                  className="btn bg-warning fw-bold mx-2 d-none d-sm-inline-block"
                >
                  Register
                </Link>
              </>
            )}
          </div>
          {/* )} */}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
