import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Chip, Rating } from '@mui/material';
import { Link } from 'react-router-dom';
import { ActionAreaCardProps } from '../helpers/Types';

export default function ActionAreaCard({ review }: ActionAreaCardProps) {
  const filterables = review.animal_type!.map((value, index) => {
    return (
      <Chip label={value} key={index} />
    )
  })

  return (
    <Link to={`/review/${review.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ width: 300, margin: 1 }}>
        <CardActionArea>
          <Typography
            margin={1}
            fontFamily='poppins'
            variant='body2'
            style={{ textDecoration: 'none' }}
          >
            {review.email}
          </Typography>
          <CardMedia
            component="img"
            height="140"
            // image={blogImageURL}
            alt=""
          />
          <CardContent className='card'>
            <Typography variant='h6' fontFamily='poppins' gutterBottom>
              {review.title}
            </Typography>
            <Box display={'flex'} justifyContent={'space-between'} alignItems="center">
              <Rating value={review.rating} size='small' readOnly />
              <Typography variant='body1' fontFamily='poppins'>
                ${review.price}
              </Typography>
            </Box>
            <Box display={'flex'} justifyContent={'space-between'}>
              <Typography variant='body2' fontFamily='poppins'>
                {review.address}
              </Typography>
              <Typography variant='body2' fontFamily='poppins'>
                {review.nearest_mrt}
              </Typography>
            </Box>
            {filterables}
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}


// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import { Box, CardActionArea, Chip, Rating } from '@mui/material';
// import { Link } from 'react-router-dom';
// import { ActionAreaCardProps } from '../helpers/Types';

// export default function ActionAreaCard({ review }: ActionAreaCardProps) {
//   const filterables = review.animal_type!.map((value, index) => {
//     return (
//       <Chip label={value} />
//     )
//   })

//   return (
//     <Link to={`/review/${review.id}`}>
//       <Card sx={{ width: 300, margin: 1 }}>
//       <CardActionArea>
//       <Typography
//         fontFamily={'poppins'}
        

//       >
//           {review.email}
//         </Typography>
//         <CardMedia
//           component="img"
//           height="140"
//         //   image={blogImageURL}
//           alt=""
//         />
//         <CardContent className='card'>
//             <Typography>
//               {review.title}
//             </Typography>
//             <Box display={'flex'} justifyContent={'space-between'}>
//               <Rating value={review.rating} size='small' readOnly/>
//               <Typography>
//                 ${review.price}
//               </Typography>
//             </Box>
//             <Box display={'flex'} justifyContent={'space-between'}>
//               <Typography>
//                 {review.address}
//               </Typography>
//               <Typography>
//                 {review.nearest_mrt}
//               </Typography>
//             </Box>
//             {filterables}
//         </CardContent>
//       </CardActionArea>
//     </Card>
//     </Link>
//   );
// }