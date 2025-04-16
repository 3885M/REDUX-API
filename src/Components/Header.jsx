import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Navbar expand="lg" className="bg-dark shadow-sm">
      <Container>
        <Navbar.Brand>
          <Link to={"/"} className="text-decoration-none text-light  fw-bold fs-4">
            Shopsy
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to={"/addProduct"} className="text-decoration-none fw-medium text-light">
                Add Product
              </Link>
            </Nav.Link>
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

// import React from "react";
// import Container from "react-bootstrap/Container";
// import Nav from "react-bootstrap/Nav";
// import Navbar from "react-bootstrap/Navbar";
// import { Link } from "react-router-dom";

// function Header() {
//   return (
//     <Navbar expand="lg" className="bg-dark shadow-sm sticky-top">
//       <Container>
//         <Navbar.Brand>
//           <Link to={"/"} className="text-decoration-none text-white fw-bold fs-4">
//             <span className="text-primary">Shop</span>Ease
//           </Link>
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" className="bg-light" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto">
//             <Nav.Link as={Link} to={"/addProduct"} className="text-light fw-medium px-3 py-2 rounded hover-bg">
//               Add Product
//             </Nav.Link>
//             <Nav.Link as={Link} to={"/"} className="text-light fw-medium px-3 py-2 rounded hover-bg">
//               Products
//             </Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default Header;