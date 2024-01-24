import * as React from 'react';
import { TextField, Box, Rating, Typography, Button, Stack } from '@mui/material';
import { InputLabel, MenuItem, FormControl, Chip, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import { getCsrfToken } from '../helpers/csrfUtils';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../helpers/AuthProvider';
import axios from 'axios';

//might implement interface

const Form: React.FC = () => {
    const {appState, setAppState} = useAuth();
    const [rating, setRating] = React.useState<number | null>(null);
    const [animalType, setAnimalType] = React.useState<string[]>([]);
    const navigate = useNavigate();
    const BASE_URL = "http://localhost:3000/";

    const handleChange = (event: SelectChangeEvent<typeof animalType>) => {
        const {
          target: { value },
        } = event;
        setAnimalType(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
      };

    const stripHtmlEntities = (value: FormDataEntryValue | null | string) => {
        if (value === null) {
            return value;
        }

        return String(value)
            .replace(/\n/g, "<br> <br>")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    };

    interface Payload {
        email: string | null | undefined,
        review: {
            email: string | null | undefined,
            title: string,
            description: string,
            rating: number,
            price: number,
            address: string,
            nearest_mrt: string,
            animal_type: string[],
        },
    }

    const createReview = (payload: Payload) => {
        return new Promise<void>((resolve, reject) => {
            axios
                .post(`${BASE_URL}api/v1/reviews`, payload)
                .then((response) => {
                    console.log(response);
                    resolve()
                })
                .catch((error) => {console.log(error); reject(error)})
        })
    }

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        
        const payload: Payload = {
            email: appState.user.email,
            review: {
                email: appState.user.email,
                title: stripHtmlEntities(data.get('title'))!,
                description: stripHtmlEntities(data.get('description'))!,
                address: stripHtmlEntities(data.get('address'))!,
                nearest_mrt: stripHtmlEntities(data.get('nearest_mrt'))!,
                rating: rating!,
                price: 20.0,
                animal_type: animalType
            }
        };
        createReview(payload)
    }

    const ListofAnimals: string[] = ['Dog', 'Cat', 'Bird', 'Rabbit', 'Horse', 'Others'];
    const allAnimalTypes: JSX.Element[] = ListofAnimals.map((animal, index) => (
        <MenuItem key={index} value={animal}>
            {animal}
        </MenuItem>
    ))


    return (
        <Stack 
            component={'form'}
            onSubmit={onSubmit}
        >
            <TextField 
                id='title'
                label='Title'
                name='title'
                required
            /> 
            <TextField 
                id='description'
                label='Description'
                name='description'
            /> 
            <TextField 
                id='address'
                label='Address'
                name='address'
                required
            /> 
            <TextField 
                id='nearest_mrt'
                label='Nearest MRT'
                name='nearest_mrt' // will consider using the autocomplete MUI
                required // might want to change to only specific MRT locations, dropdown
            /> 
            <Box>
                <Typography component="legend">Rating</Typography>
                <Rating
                    name="rating"
                    value={rating}
                    onChange={(event, newValue) => {
                    setRating(newValue);
                    }}
                />
            </Box>
            <FormControl sx={{ m: 1, width: 300 }}>
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
            <Button type='submit' variant='contained' color='primary'>Submit</Button>
        </Stack>
    )
};

export default Form;
