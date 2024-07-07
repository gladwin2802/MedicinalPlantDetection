import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout.jsx'
import { useAuthContext } from '../hooks/useAuthContext.jsx'
import logo from '../assets/images/logo.jpg'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to="/" style={{display: 'flex', alignItems: "center", justifyContent: "center", gap: "10px"}}>
                    <img src={logo} alt="logo" width={60} height={60} style={{borderRadius: "50%"}} />
                    <h1>Botanic Sense</h1>
                </Link>
                <nav>
                    {user && (
                        <div>
                            <span>{user.email}</span>
                            <button onClick={handleClick}>Log out</button>
                        </div>
                    )}
                    {!user && (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar