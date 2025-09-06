import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light bg-white shadow-sm"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container">
        <Link className="navbar-brand" to="/" aria-label="Fynally Home">
          Fynally
        </Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto" role="menubar">
            <li className="nav-item" role="none">
              <Link className="nav-link" role="menuitem" tabIndex="0" to="/journey">
                Journey
              </Link>
            </li>
            <li className="nav-item" role="none">
              <Link className="nav-link" role="menuitem" tabIndex="0" to="/resources">
                Resources
              </Link>
            </li>
            <li className="nav-item" role="none">
              <Link className="nav-link" role="menuitem" tabIndex="0" to="/internships">
                Internships
              </Link>
            </li>
            <li className="nav-item" role="none">
              <Link className="nav-link" role="menuitem" tabIndex="0" to="/jobs">
                Jobs
              </Link>
            </li>
            <li className="nav-item" role="none">
              <Link className="nav-link" role="menuitem" tabIndex="0" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item" role="none">
              <Link className="nav-link" role="menuitem" tabIndex="0" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
          <ThemeToggle aria-label="Toggle light or dark theme" />
        </div>
      </div>
    </nav>
  );
}