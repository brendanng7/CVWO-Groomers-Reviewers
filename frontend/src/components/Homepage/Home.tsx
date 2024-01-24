import React from "react";
import { Link } from "react-router-dom";
import ResponsiveAppBar from "../Navbar";
import Hero from "./Hero";

function Home() {
    return (
        <div className="page-white">
            <ResponsiveAppBar />
            <div className="vh-90 d-flex align-items-center justify-content-center">
                <div className="jumbotron jumbotron-fluid flex-column">
                    <Hero />
                    <div className="d-flex justify-content-center m-4">
                        <Link role="button" to={"/register"} className="btn custom-button page-black">Register</Link>
                        <Link role="button" to={"/login"} className="btn custom-button page-black">Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;