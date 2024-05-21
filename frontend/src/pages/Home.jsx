import Header from "../components/Header";
import Navbar from '../components/Navbar';
// import home from "../assets/images/homepage.jpg";
import home from "../assets/images/homepage5.jpg";
import "../assets/css/Home.css";

function Home() {
    return (
        <>
            <Navbar />
            <Header />
            <div className="imageContainer">
                <img src={home} alt="homepage" />
                <div className="overlayText">
                    <p>Welcome to <span> Botanic Sense !!!</span></p>
                </div>
            </div>
        </>
    );
}

export default Home;
