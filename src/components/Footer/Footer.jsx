import React from "react";
import { Container, Logo } from "../index.js";

const Footer = () => {
  return (
    <footer className="footer-main">
      <Container>
        <div className="footer-content">
          <div className="footer-brand">
            <Logo width="120px" />
            <p className="footer-description">
              A space to read, write, and share ideas. Stay updated with the
              latest articles and insights.
            </p>
          </div>
          <div className="footer-links">
            <a href="#" className="footer-link">
              About
            </a>
            <a href="#" className="footer-link">
              Contact
            </a>
            <a href="#" className="footer-link">
              Privacy
            </a>
            <a href="#" className="footer-link">
              Terms
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 Blogoria All rights reserved.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
