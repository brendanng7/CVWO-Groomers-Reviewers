import React from "react";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../Navbar";
import Hero from "./Hero";
import { Box, Button } from "@mui/material";

function Home() {
    const navigate = useNavigate();

    return (
        <Box sx={{backgroundColor: 'white'}}>
            <ResponsiveAppBar />
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: "15%"}}>
                <Box>
                    <Hero />
                    <Box sx={{display: 'flex', justifyContent: 'center', margin: 4}}>
                        <Button variant="contained" sx={{margin: 1, width: 100, backgroundColor: '#B17A02'}} onClick={() => navigate('/register')}>register</Button>
                        <Button variant="contained" sx={{margin: 1, width: 100, backgroundColor: '#B17A02'}} onClick={() => navigate('/login')}>login</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;