import { Box, Card, CardActions, CardContent, Chip, FormControl, Rating, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { Params, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../helpers/AuthProvider';
import { Button } from '@mui/material';
import { BASE_URL } from '../helpers/BaseURL';
import {Review, Comment, CommentPayload} from '../helpers/Types';

const ReviewPost = () => {
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
        animal_type: [],
        created_at: null,
        updates_at: null
    }

    const {appState, setAppState} = useAuth();
    const params = useParams();
    const navigate = useNavigate();
    const [comments, setComments] = React.useState<Comment[]>([])
    const [commentContent, setCommentContent] = React.useState('');
    const [isEditing, setIsEditing] = React.useState(false);
    const [commentID, setCommentID] = React.useState<BigInt | number>(0);
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
        getComments();
    },[params]);

    const allComments = comments.map((comment, index) => {
        const position = comment.email === appState.user.email ? 'right' : 'left';
        return (
            <> 
                <Card key={index} sx={{marginY: 2, padding: 2, textAlign: position}}>
                    {comment.email !== appState.user.email && comment.email + ': '}
                    {comment.content}
                    <br />
                    {comment.email === appState.user.email && !isEditing &&
                <Button key={comments.length + index} onClick={(event) => {
                    setIsEditing(!isEditing);
                    setCommentContent(comment.content);
                    setCommentID(comment.id);
                    }}>
                    edit
                </Button>
                }
                </Card>
                
            </>
        )
    })

    const filterables = review.animal_type!.map((value, index) => {
        return (
          <Chip label={value} key={index} sx={{marginY: 1}}/>
        )
    })

    const created_at = new Date(review.created_at!)


    return (
        <Box sx={{backgroundColor: '#AACCBB', display: 'flex', alignItems: 'start'}}>
            <Button sx={{margin: 2}} href='/session'>Back</Button>
            <Box mt={3} mx="auto" width="60%" textAlign='left'>
                <Card>
                    <CardContent>
                        <Typography variant="h5" mb={2}>
                            {review.title}
                        </Typography>
                        <Typography variant="subtitle1" mb={2}>
                            by {review.email} | {created_at.toLocaleDateString()}
                        </Typography>
                        <Box sx={{height: 150}}></Box>
                            <img src="" alt="Review Image" />
                        <Box>
                        {filterables}
                        </Box>
                        <Rating value={review.rating}/>
                        <Typography variant="body1" mb={2}>
                            ${review.price}
                        </Typography>
                        <Typography variant="body1" mb={2}>
                            Address: {review.address}
                        </Typography>
                        <Typography variant="body1" mb={2}>
                            Nearest MRT: {review.nearest_mrt}
                        </Typography>
                        <Typography variant="body1">
                            Description:
                        </Typography>
                        <Typography variant="body1">
                            {review.description}
                        </Typography>
                        {appState.user.email === review.email && (
                            <CardActions>
                                <Button onClick={() => deleteReview(params)}>
                                    DELETE
                                </Button>
                            </CardActions>
                        )}
                    </CardContent>
                </Card>
                <Box mt={3}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" mb={2}>
                                Comments
                            </Typography>
                            {allComments}
                        </CardContent>
                    </Card>
                    <Box mt={2} component="form" 
                        onSubmit={(e) => {
                                        !isEditing ? submitComment(e) : editComment(e)
                                        setCommentContent('');
                                        setIsEditing(false);
                                        }}>
                        <TextField
                            label={!isEditing ? 'Leave a comment' : ''}
                            name="new-comment-content"
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            InputLabelProps={{
                                disableAnimation: true,
                            }}
                            fullWidth
                            variant="outlined"
                            multiline
                            rows={3}
                        />
                        <Box sx={{justifyContent: 'center', alignItems: 'start'}}>
                            <CardActions>
                                <Button
                                    type='submit'
                                >
                                    Submit
                                </Button>
                            </CardActions>
                        </Box>
                        {isEditing && (
                            <CardActions>
                                <Button
                                    onClick={() => {
                                        setCommentContent('');
                                        setIsEditing(!isEditing);
                                    }}
                                >
                                    Stop Editing
                                </Button>
                            </CardActions>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );

    // return (
    //     <>
    //         <Card>
    //             <CardContent>
    //                 <Typography>
    //                     {review.email}
    //                 </Typography>
    //                 <Typography >
    //                     {review.title}
    //                 </Typography>
    //                 <Typography>
    //                     {review.created_at?.toString()}
    //                 </Typography>
    //                 <Box>
    //                     IMAGE GOES HERE
    //                 </Box>
    //                 <Typography >
    //                     {review.animal_type}
    //                 </Typography>
    //                 <Typography >
    //                     {review.rating}
    //                 </Typography>
    //                 <Typography >
    //                     {review.price}
    //                 </Typography>
    //                 <Typography >
    //                     {review.address}
    //                 </Typography>
    //                 <Typography >
    //                     {review.nearest_mrt}
    //                 </Typography>
    //                 <Typography >
    //                     {review.description}
    //                 </Typography>
    //                 {appState.user.email === review.email && 
    //                 <Button onClick={() => deleteReview(params)}>
    //                     DELETE
    //                 </Button>}
    //             </CardContent>
    //         </Card>
    //         <Card>
    //             {allComments}
    //         </Card>
    //         <Box component={'form'} onSubmit={!isEditing ? submitComment : editComment}>
    //             <TextField
    //                 label={!isEditing? 'leave a comment' : ''}
    //                 name='new-comment-content'
    //                 value={commentContent}
    //                 onChange={(e) => setCommentContent(e.target.value)}
    //                 InputLabelProps={{
    //                     disableAnimation: true
    //                 }}
    //             >
    //             </TextField>
    //             {isEditing && <Button onClick={() => {
    //                 setCommentContent('');
    //                 setIsEditing(!isEditing);
    //             }}>stop editing</Button>}
    //         </Box>
    //     </>
    // );
}

export default ReviewPost;