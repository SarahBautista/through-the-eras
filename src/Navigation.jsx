import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <a href="/" className="navbar-brand">
          THROUGH THE ERAS
        </a>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/eras" className="nav-link">
                Eras
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
