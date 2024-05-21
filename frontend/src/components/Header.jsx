import { Link, useLocation } from 'react-router-dom';
import '../assets/css/componentCss/Header.css';

function Header() {
    // Get the current location using useLocation hook
    const location = useLocation();

    return (
        <>
            <nav>
                <ul className="navbar">
                    <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
                    <li><Link to="/predict" className={location.pathname === '/predict' ? 'active' : ''}>Predict</Link></li>
                    <li><Link to="/map" className={location.pathname === '/map' ? 'active' : ''}>Map</Link></li>
                    <li><Link to="/quiz" className={location.pathname === '/quiz' ? 'active' : ''}>Quiz</Link></li>
                    <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>Glossary</Link></li>
                    <li><Link to="/feedback" className={location.pathname === '/feedback' ? 'active' : ''}>Feedback</Link></li>
                    {/* <li><Link to="/test" className={location.pathname === '/test' ? 'active' : ''}>Test</Link></li> */}
                </ul>
            </nav>
        </>
    )
}

export default Header;
