import axios from 'axios'
import { users, articles, posts, comments } from './../redux/db'


// const instance = axios.create({
//     withCredentials: true,
//     baseURL: "",
//     headers: {
        
//     }
// })

export const authAPI = {
    me() {
        return new Promise((resolve) => {
            resolve()
        }).then(data => data)
    }
}

export const profileAPI = {
    getProfile(id) {
        return new Promise((resolve) => {
            resolve(users[id])
        }).then(data => data)
    },
    subscribe(id, authId) {
        return new Promise((resolve) => {
            let subscribeType
            if (users[authId].followeds_id.filter(u => u === id).length === 0) {
                users[id].followers_count += 1
                users[id].followers_id = [...users[id].followers_id, authId]
                users[authId].followeds_id = [...users[authId].followeds_id, id]
                subscribeType = 'sub'
            } else {
                users[id].followers_count -= 1
                users[id].followers_id = users[id].followers_id.filter(u => u !== authId)
                users[authId].followeds_id = users[authId].followeds_id.filter(u => u !== id)
                subscribeType = 'unsub'
            }
            resolve({
                'statusCode': 0,
                'type': subscribeType
            })
        })
    }
}

export const articlesAPI = {
    getMainArticles(authId) {
        return new Promise((resolve) => {
            const outputArticles = Object.values(articles)
            .flatMap(postArray => postArray)
            .filter(post => post.author_id !== authId)
            setTimeout(() => resolve(outputArticles), 0)
            // resolve(outputArticles)
        }).then(data => data)
    },
    getProfileArticles(profileId) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(articles[`${profileId}`]), 0)
            // resolve(articles[`${profileId}`])
        }).then(data => data)
    },
    likeArticle(profileId, articleId, authId) {
        return new Promise((resolve) => {
            for (let i = 0; i <= articles[`${profileId}`].length; i++) {
                if (articles[`${profileId}`][i].id == articleId) {
                    if (articles[`${profileId}`][i].likes_id.filter(id => id === authId).length === 1) {
                        articles[`${profileId}`][i].likes_count -= 1
                        articles[`${profileId}`][i].likes_id = articles[`${profileId}`][i].likes_id.filter(id => id !== authId)
                        break
                    }
                    articles[`${profileId}`][i].likes_count += 1
                    articles[`${profileId}`][i].likes_id = [authId, ...articles[`${profileId}`][i].likes_id]
                    break
                }
            }
            resolve({
                'statusCode': 0
            })
        })
    }
}

export const postsAPI = {
    getMainPosts(authId) {
        return new Promise((resolve) => {
            const outputPosts = Object.values(posts)
            .flatMap(postArray => postArray)
            .filter(post => post.author_id !== authId)
            setTimeout(() => resolve(outputPosts), 2000)
            // resolve(outputPosts)
        })
    },
    getProfilePosts(profileId) {
        return new Promise((resolve) => {
            setTimeout(() => resolve(posts[`${profileId}`]), 0)
            // resolve(posts[`${profileId}`])
        })
    },
    sendPost(post, authId) {
        return new Promise((resolve) => {
            post.id = Object.values(posts).reduce((accumulator, current) => accumulator + current.length, 0) + 1
            posts[`${authId}`] = [post, ...posts[authId]]
            resolve({
                'statusCode': 1
            })
        })
    },
    likePost(profileId, postId, authId) {
        return new Promise((resolve) => {
            for (let i = 0; i <= posts[`${profileId}`].length; i++) {
                if (posts[`${profileId}`][i].id == postId) {
                    if (posts[`${profileId}`][i].likes_id.filter(id => id === authId).length === 1) {
                        posts[`${profileId}`][i].likes_count -= 1
                        posts[`${profileId}`][i].likes_id = posts[`${profileId}`][i].likes_id.filter(id => id !== authId)
                        break
                    }
                    posts[`${profileId}`][i].likes_count += 1
                    posts[`${profileId}`][i].likes_id = [authId, ...posts[`${profileId}`][i].likes_id]
                    break
                }
            }
            resolve({
                'statusCode': 1
            })
        })
    }
}

export const commentsAPI = {
    getComments(commentsId) {
        return new Promise((resolve) => {
            let parsedComments = []
            for (let i = 0; i <= commentsId.length - 1; i++) {
                parsedComments.push(comments[commentsId[i]-1])
            }
            resolve({
                'statusCode': 1,
                'data': parsedComments
            })
        })
    },
    sendCommentToArticle(comment, authorId, articleId) {
        return new Promise((resolve) => {
            comment.id = comments.length + 1
            comments.push(comment)
            for (let i = 0; i <= articles[authorId].length - 1; i++) {
                if (articles[authorId][i].id === articleId) {
                    articles[authorId][i].comments_id.push(comment.id)
                    articles[authorId][i].comments_count += 1
                    break
                }
            }
            resolve({
                'statusCode': 1
            })
        })
    },
    sendCommentToPost(comment, authorId, postId) {
        return new Promise((resolve) => {
            comment.id = comments.length + 1
            comments.push(comment)
            for (let i = 0; i <= posts[authorId].length - 1; i++) {
                if (posts[authorId][i].id === postId) {
                    posts[authorId][i].comments_id.push(comment.id)
                    posts[authorId][i].comments_count += 1
                    break
                }
            }
            resolve({
                'statusCode': 1
            })
        })
    },
    likeComment(commentId, likeAuthorId) {
        return new Promise((resolve) => {
            if (comments[commentId - 1].dislike_id.find(id => id === likeAuthorId)) {
                comments[commentId - 1].dislike_count -= 1
                comments[commentId - 1].dislike_id = comments[commentId - 1].dislike_id.filter(id => id !== likeAuthorId)
            }
            if (comments[commentId - 1].likes_id.find(id => id === likeAuthorId)) {
                comments[commentId - 1].likes_count -= 1
                comments[commentId - 1].likes_id = comments[commentId - 1].likes_id.filter(id => id !== likeAuthorId)
            } else {
                comments[commentId - 1].likes_count += 1
                comments[commentId - 1].likes_id.push(likeAuthorId)
            }
            resolve({
                'statusCode': 1
            })
        })
    },
    dislikeComment(commentId, dislikeAuthorId) {
        return new Promise((resolve) => {
            if (comments[commentId - 1].likes_id.find(id => id === dislikeAuthorId)) {
                comments[commentId - 1].likes_count -= 1
                comments[commentId - 1].likes_id = comments[commentId - 1].likes_id.filter(id => id !== dislikeAuthorId)
            }
            if (comments[commentId - 1].dislike_id.find(id => id === dislikeAuthorId)) {
                comments[commentId - 1].dislike_count -= 1
                comments[commentId - 1].dislike_id = comments[commentId - 1].dislike_id.filter(id => id !== dislikeAuthorId)
            } else {
                comments[commentId - 1].dislike_count += 1
                comments[commentId - 1].dislike_id.push(dislikeAuthorId)
            }
            resolve({
                'statusCode': 1
            })
        })
    }
}