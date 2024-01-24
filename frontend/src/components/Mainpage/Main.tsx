import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../Navbar";
import ActionAreaCard from "./Card";
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';
import { ClassNames } from "@emotion/react";
import { Height } from "@mui/icons-material";
import axios from "axios";


function Main() {
    interface Card {
        id: BigInt,
        user_id: BigInt,
        title: string,
        description: string | null,
        rating: number | null,
        price: number | null,
        address: string | null,
        nearest_mrt: string | null,
        animal_type: string[] | null,
        created_at: Date,
        updates_at: Date
    };

    const BASE_URL = "http://localhost:3000/";

    const [cardList, setCardList] = React.useState<null | Card[]>(null);
    const navigate = useNavigate();

    const getAllCards = () => {

        new Promise<void>((resolve, reject) => {
            axios
                .get(`${BASE_URL}api/v1/reviews/index`)
                .then((response) => {
                    console.log(response);
                    setCardList(response.data);
                    resolve();
                })
                .catch(() => {
                    console.log('failed')
                })
        })

    }

    React.useEffect(() => {
        getAllCards()
    },[]);

    const allCards = (cardList !== null) && cardList.map((card, index) => (
        <Grid item key={index}>
            <ActionAreaCard review={card} />
        </Grid>
    ));

    const noCards = (
        <div>
            NO CARDS SADGE
        </div>
    );

    return (
        <div className="reviews-bg-colour overflow-hidden test">
            <ResponsiveAppBar />
            <Box sx={{ flexGrow: 1, mt: 10 }}>
                <Grid container spacing={4}>
                    <Grid item xs={4} className="d-flex justify-content-center h-50">
                        <div className="test">
                            menu goes here
                        </div>
                    </Grid>
                    <Grid container xs={8}  className="d-flex flex-wrap justify-content-center overflow-auto vh-100 max-vh-100">
                        {cardList !== null? allCards : noCards}
                        <Grid item xs={8} height={400} width={400}>
                            no more cards
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default Main;
