import React from "react";
import { LogoutBtn, Container, Logo } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const authStatus = useSelector(state => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="navbar-header">
      <Container>
        <nav className="navbar-main">
          <div className="navbar-brand">
            <div className="navbar-logo-link">
              <Logo width="200px" />
            </div>
          </div>
          <ul className="navbar-menu">
            {navItems.map(item =>
              item.active ? (
                <li key={item.name}>
                  <Link to={item.slug} className="navbar-menu-item">
                    {item.name}
                  </Link>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};

export default Navbar;
