import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { Params, useNavigate, useParams } from 'react-router-dom';

interface Review {
    id: BigInt | number,
    user_id: BigInt | number,
    email: string,
    title: string,
    description: string | null,
    rating: number | null,
    price: number | null,
    address: string | null,
    nearest_mrt: string | null,
    animal_type: string[] | null,
    created_at: Date | null,
    updates_at: Date | null
  };

const Review = () => {
    const params = useParams();
    const navigate = useNavigate();
    const BASE_URL = "http://localhost:3000/";
    const initialReview: Review = {
        id: 0,
        user_id: 0,
        email: '',
        title: '',
        description: '',
        rating: null,
        price: null,
        address: null,
        nearest_mrt: null,
        animal_type: null,
        created_at: null,
        updates_at: null
    }

    const [review, setReview] = React.useState<Review>(initialReview)
    
    const getReview = (params: Readonly<Params<string>>) => {
        return new Promise<void>((resolve, reject) => {
            axios
                .get(`${BASE_URL}api/v1/show/${params.id}`)
                .then((response) => {
                    console.log(response);
                    setReview(response.data);
                })
                .catch((error) => reject(error))
        })
    }

    React.useEffect(() => {
        getReview(params);
    },[params]);

    return (
            <Card>
                <CardContent>
                    <Typography>
                        {review.email}
                    </Typography>
                    <Typography >
                        {review.title}
                    </Typography>
                    <Typography>
                        {review.created_at?.toString()}
                    </Typography>
                    <Box>
                        IMAGE GOES HERE
                    </Box>
                    <Typography >
                        {review.animal_type}
                    </Typography>
                    <Typography >
                        {review.rating}
                    </Typography>
                    <Typography >
                        {review.price}
                    </Typography>
                    <Typography >
                        {review.address}
                    </Typography>
                    <Typography >
                        {review.nearest_mrt}
                    </Typography>
                    <Typography >
                        {review.description}
                    </Typography>
                </CardContent>
            </Card>


    );
}

export default Review;