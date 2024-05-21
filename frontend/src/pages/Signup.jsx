import { useState } from "react"
import { useSignup } from "../hooks/useSignup.jsx"
import Navbar from "../components/Navbar.jsx"

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await signup(email, password)
    }

    return (
        <>
            <Navbar />

            <form className="signup" onSubmit={handleSubmit}>
                <center>
                    <h3>Sign Up</h3>
                </center>

                <label>Email address:</label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <label>Password:</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />

                <center>
                    <button disabled={isLoading}>Sign up</button>
                    {error && <div className="error">{error}</div>}
                </center>
            </form>
        </>
    )
}

export default Signup