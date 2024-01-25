import { Box } from "@mui/material";
import React from "react";
import tofu from "../../assets/images/tofu.jpg";

function Hero() {
    return (
        <>
            <Box sx={{
                display: 'flex', 
                width: '25vw', 
                height: '25vw', 
                borderRadius: '50%', 
                backgroundColor: '#AACCBB',
                alignItems: 'center',
                justifyContent: 'center'
                }}>
                <img 
                    style={{width: '20vw', height: '20vw', objectFit: 'cover', borderRadius: '50%'}}
                    src={tofu} alt="Logo" 
                />
            </Box>
        </>
    )
};

export default Hero;