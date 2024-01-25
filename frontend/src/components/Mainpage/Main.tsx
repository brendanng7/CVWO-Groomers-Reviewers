import React from "react";
import { useNavigate } from "react-router-dom";
import ResponsiveAppBar from "../Navbar";
import ActionAreaCard from "./Card";
import Grid from '@mui/material/Grid';
import Box from '@mui/system/Box';
import axios from "axios";
import { BASE_URL } from "../helpers/BaseURL";
import {Card} from '../helpers/Types'
import { Chip, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Typography } from "@mui/material";
import { Button } from "reactstrap";


function Main() {
    const ListofAnimals: string[] = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Horse', 'Others'];
    const [cardList, setCardList] = React.useState<null | Card[]>(null);
    const [animalType, setAnimalType] = React.useState<string[]>(ListofAnimals);
    const [priceSort, setPriceSort] = React.useState<'unsorted' | 'asc' | 'desc'>('unsorted')
    const navigate = useNavigate();

    const getAllCards = () => {
        new Promise<void>((resolve, reject) => {
            axios
                .get(`${BASE_URL}api/v1/reviews`)
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

    
    const handleChange = (event: SelectChangeEvent<typeof animalType>) => {
        const {
          target: { value },
        } = event;
        setAnimalType(
          typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handlePriceSort = (event: SelectChangeEvent) => {
        setPriceSort(event.target.value as 'unsorted' | 'asc' | 'desc');
      };


    const allAnimalTypes: JSX.Element[] = ListofAnimals.map((animal, index) => (
        <MenuItem key={index} value={animal}>
            {animal}
        </MenuItem>
    ))

    const sortByPrice = (card1: Card, card2: Card) => {
        if (priceSort === 'desc') {
            return card1.price! < card2.price! ? 1 : card1.price! > card2.price! ? -1 : 0
        }
        else if (priceSort === 'asc') {
            return card1.price! < card2.price! ? -1 : card1.price! > card2.price! ? 1 : 0
        }
        else {
            return card1.price! < card2.price! ? 0 : card1.price! > card2.price! ? 0 : 0
        }
    }

    const allCards = (cardList !== null) && 
        cardList?.filter((card) =>
                            card.animal_type?.some((type) => animalType.includes(type)))
                            .sort(sortByPrice)
                            .map((card, index) => (
        <Grid item key={index}>
            <ActionAreaCard review={card} />
        </Grid>
    ));

    const noCards = (
        <Typography>
            there are no reviews yet. come back later or create your own review!
        </Typography>
    );
    
    return (
        <Box sx={{backgroundColor: '#AACCBB', overflow: 'hidden', marginTop: 15}} className="test">
            <ResponsiveAppBar />
            <Box sx={{ flexGrow: 1, mt: 10 }}>
                <Grid container spacing={4}>
                    <Grid item xs={4} className="d-flex justify-content-center h-50">
                        <Box>
                        <FormControl sx={{ m: 1, width: 300, backgroundColor: 'white',borderRadius: '8px'}}>
                            <InputLabel id="animal-type-multiple-chip-label">Animal Type</InputLabel>
                            <Select
                            labelId="animal-type-multiple-chip-label"
                            id="animal-type-multiple-chip"
                            multiple
                            value={animalType}
                            onChange={handleChange}
                            input={<OutlinedInput id="animal-type-multiple-chip" label="Animal Type" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value} />
                                ))}
                                </Box>
                            )}
                            >
                            {allAnimalTypes}
                            </Select>
                        </FormControl>
                        </Box>
                        <Box sx={{ m: 1, width: 300, backgroundColor: 'white',borderRadius: '8px'}}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Price</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={priceSort}
                                label="Price"
                                onChange={handlePriceSort}
                                >
                                <MenuItem value={'unsorted'}>Unsorted</MenuItem>
                                <MenuItem value={'asc'}>Sort by Ascending</MenuItem>
                                <MenuItem value={'desc'}>Sort by Descending</MenuItem>
                                </Select>
                            </FormControl>
                            </Box>
                    </Grid>
                    <Grid container xs={8} flexWrap={'wrap'} justifyContent={'center'} overflow={'auto'} height={'100vh'} maxHeight={'100vh'} sx={{display: 'flex',}}>
                        {cardList !== null? allCards : noCards}
                        <Grid item xs={8} height={400}>
                            <Box display={'flex'} justifyContent={'center'}>
                                <Typography>
                                    no more reviews to show you... why not create your own!
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Main;
