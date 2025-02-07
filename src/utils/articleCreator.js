import { formattedDateCreator } from "./formattedDateCreator"


export const articleCreator = (title = '', description = '', author, authorId) => {
    return {
        'title': title,
        'description': description,
        'banner': '',
        'created_at': formattedDateCreator(),
        'likes_count': 0,
        'likes_id': [],
        'comments_id': [],
        'comments_count': 0,
        'scopes': [],
        'author': author,
        'author_id': authorId
    }
}