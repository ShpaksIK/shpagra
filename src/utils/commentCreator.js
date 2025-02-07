import { formattedDateCreator } from "./formattedDateCreator"


export const createComment = (text, author, authorId) => {
    return {
        'text': text,
        'likes_id': [],
        'likes_count': 0,
        'dislike_id': [],
        'dislike_count': 0,
        'created_at': formattedDateCreator(),
        'author': author,
        'author_id': authorId
    }
}