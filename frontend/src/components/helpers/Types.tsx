interface Card {
    email: string,
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

interface ActionAreaCardProps {
    review: Review;
  }
  
//   interface Review {
//     email: string,
//     id: BigInt,
//     user_id: BigInt,
//     title: string,
//     description: string | null,
//     rating: number | null,
//     price: number | null,
//     address: string | null,
//     nearest_mrt: string | null,
//     animal_type: string[] | null,
//     created_at: Date,
//     updates_at: Date
//   };

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

export {Card, ActionAreaCardProps, Review, Comment, CommentPayload};

