import React from "react";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5" role="contentinfo">
      <div className="container text-center">
        <p className="mb-2">&copy; {new Date().getFullYear()} Fynally. All rights reserved.</p>
        <nav aria-label="Footer navigation">
          <ul className="list-inline mb-2">
            <li className="list-inline-item">
              <a href="/" className="text-white text-decoration-none" aria-label="Home page link">
                Home
              </a>
            </li>
            <li className="list-inline-item">
              <a href="/about" className="text-white text-decoration-none" aria-label="About page link">
                About
              </a>
            </li>
            <li className="list-inline-item">
              <a href="/resources" className="text-white text-decoration-none" aria-label="Resources page link">
                Resources
              </a>
            </li>
            <li className="list-inline-item">
              <a href="/contact" className="text-white text-decoration-none" aria-label="Contact page link">
                Contact
              </a>
            </li>
          </ul>
        </nav>
        <p className="mb-0">
          Follow us:
          <a href="https://linkedin.com" className="text-white ms-2" aria-label="LinkedIn link">LinkedIn</a> |
          <a href="https://github.com" className="text-white ms-2" aria-label="GitHub link">GitHub</a>
        </p>
      </div>
    </footer>
  );
}
