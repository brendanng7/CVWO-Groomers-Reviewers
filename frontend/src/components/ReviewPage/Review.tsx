import { Box, Card, CardContent, FormControl, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { Params, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../helpers/AuthProvider';
import { Button } from 'reactstrap';

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
interface Comment {
    id: BigInt | number,
    user_id: BigInt | number,
    review_id: BigInt | number,
    content: string,
    vote: number,
    email: string,
    created_at: Date | null,
    updates_at: Date | null,
}

interface CommentPayload {
    id: BigInt | number,
    email: string | undefined | null,
    comment: {
        content: string | null
    }
}

const Review = () => {
    const {appState, setAppState} = useAuth();
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
                .get(`${BASE_URL}api/v1/reviews/${params.id}`)
                .then((response) => {
                    console.log(response);
                    setReview(response.data);
                })
                .catch((error) => reject(error))
        })
    }

    const deleteReview = (params: Readonly<Params<string>>) => {
        return new Promise<void>((resolve, reject) => {
            axios
                .delete(`${BASE_URL}api/v1/reviews/${params.id}`)
                .then((response) => {
                    alert(response)
                    resolve()
                })
                .catch((error) => reject(error))
                .finally(() => navigate('/session'))
        })
    }

    React.useEffect(() => {
        getReview(params);
        const payload: CommentPayload = {
            id: review.id,
            email: appState.user.email,
            comment: {
                content: null
            }
        };
        getComments();


    },[params]);

    const [comments, setComments] = React.useState<Comment[]>([])
    const [commentContent, setCommentContent] = React.useState('');
    const [isEditing, setIsEditing] = React.useState(false);
    const [commentID, setCommentID] = React.useState<BigInt | number>(0);
    const getComments = () => {
        return new Promise<void>((resolve, reject) => {
            axios
                .get(`${BASE_URL}api/v1/reviews/${params.id}/comments`)
                .then((response) => {
                    setComments(response.data);
                    resolve()
                })
                .catch((error) => reject(error))
        })
    }

    const allComments = comments.map((comment, index) => {
        return (
            <>
                <Card key={index}>
                    {comment.content}
                </Card>
                {comment.email === appState.user.email && !isEditing &&
                <Button key={comments.length + index} onClick={(event) => {
                    setIsEditing(!isEditing);
                    setCommentContent(comment.content);
                    setCommentID(comment.id);
                    }}>
                    edit
                </Button>
                }
            </>
        )
    })

    const submitComment = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCommentContent('');
        
        const payload = {
            id: appState.user.id , 
            comment: {
                content: commentContent,
                email: appState.user.email,
            }
        }

        return new Promise<void>((resolve, reject) => {
            axios
                .post(`${BASE_URL}api/v1/reviews/${params.id}/comments`, payload)
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => reject(error))
                .finally(() => {
                    navigate(`/review/${params.id}`)
                })
        })
    };

    const editComment = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setCommentContent('');
        const payload = {
            // id:  commentID, 
            comment: {
                content: commentContent,
                email: appState.user.email,
            }
        }

        return new Promise<void>((resolve, reject) => {
            axios
                .put(`${BASE_URL}api/v1/comments/${commentID}`, payload)
                .then((response) => {
                    console.log(response)
                })
                .catch((error) => reject(error))
                .finally(() => {
                    navigate(`/review/${params.id}`)
                })
        })
    }

    React.useEffect(() => {
        getReview(params);
    },[params]);
    return (
        <>
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
                    {appState.user.email === review.email && 
                    <Button onClick={() => deleteReview(params)}>
                        DELETE
                    </Button>}
                </CardContent>
            </Card>
            <Card>
                {allComments}
            </Card>
            <Box component={'form'} onSubmit={!isEditing ? submitComment : editComment}>
                <TextField
                    label={!isEditing? 'leave a comment' : ''}
                    name='new-comment-content'
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    InputLabelProps={{
                        disableAnimation: true
                    }}
                >
                </TextField>
                {isEditing && <Button onClick={() => {
                    setCommentContent('');
                    setIsEditing(!isEditing);
                }}>stop editing</Button>}
            </Box>
        </>
    );
}

export default Review;