import { NavLink } from "react-router-dom";
import '../assets/styles/NavBarStyle.css';

const NavBar = () => {
    return (
        <nav className="nav-container" style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
          <div className="link1">
            <NavLink to="/" style={{ textDecoration: 'none' }}>Lista Task</NavLink>
          </div>
          <div className="link2">
            <NavLink to="/add" style={{ textDecoration: 'none' }} >Aggiungi Task</NavLink>
          </div>
        </nav>
    )
}

export default NavBar;