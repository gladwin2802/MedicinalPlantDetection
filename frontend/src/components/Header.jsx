import { Link } from 'react-router-dom';
import '../assets/css/componentCss/Header.css'

function Header() {
    return (
        <>
            <div className="header">
                Medicinal Plant Detection
            </div>
            <nav>
                <ul className="navbar">
                    <li><Link to="/predict">Predict</Link></li>
                    <li><Link to="/map">Map</Link></li>
                    <li><Link to="/quiz">Quiz</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/feedback">Feedback</Link></li>
                    <li><Link to="/test">Test</Link></li>
                </ul>
            </nav>
        </>
    )
}

export default Header;