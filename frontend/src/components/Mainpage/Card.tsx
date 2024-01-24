import * as React from 'react';
import Card, { CardTypeMap } from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

interface ActionAreaCardProps {
  review: Review;
}

interface Review {
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

export default function ActionAreaCard({ review }: ActionAreaCardProps) {
  

  return (
    <Link to={`/review/${review.id}`}>
      <Card sx={{ width: 300, margin: 1 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
        //   image={blogImageURL}
          alt=""
        />
        <CardContent className='card'>
            <h4>
                {review.title}
            </h4>
            <h6>
                {review.address}
            </h6>
            <h6>
                {review.nearest_mrt}
            </h6>
            <p>
                {review.animal_type}
            </p>
        </CardContent>
      </CardActionArea>
    </Card>
    </Link>
  );
}