import { Link } from "react-router-dom";

export default function Navbar(){
    
    return (
        <>
            <div>
                <Link to={"/"}>
                    <a>Logo</a>
                </Link>

                <a>Career</a>

                <a>Job</a>

                <a>Profile</a>

                <Link to={"/Signup"}>
                    <a>Profile</a>
                </Link>
            </div>
        </>
    );
}