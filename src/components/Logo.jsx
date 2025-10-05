import React from "react";
import { Link } from "react-router-dom";

const Logo = ({ width = "200px" }) => {
  return (
    <Link to="/" className="logo-link">
      <div className="logo-text">
        <img src="/logo.png" width={width} />
      </div>
    </Link>
  );
};

export default Logo;
