export const articleCreator = (author, authorId) => {
    
    const currentDate = new Date()
    const day = String(currentDate.getDate()).padStart(2, '0')
    const month = String(currentDate.getMonth() + 1).padStart(2, '0')
    const year = currentDate.getFullYear();
    const hours = String(currentDate.getHours()).padStart(2, '0')
    const minutes = String(currentDate.getMinutes()).padStart(2, '0')
    const formattedDate = `${day}.${month}.${year} в ${hours}:${minutes}`

    return {
        'title': '',
        'description': '',
        'banner': '',
        'created_at': formattedDate,
        'likes_count': 0,
        'likes_id': [],
        'comments_id': [],
        'comments_count': 0,
        'scopes': [],
        'author': author,
        'author_id': authorId
    }
}