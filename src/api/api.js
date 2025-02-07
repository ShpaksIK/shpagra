import axios from 'axios'
import { users, articles, posts, comments, articles_content, articles_to_moderation, articles_draft } from './../redux/db'


// const instance = axios.create({
//     withCredentials: true,
//     baseURL: "",
//     headers: {
        
//     }
// })

export const authAPI = {
    me() {
        return new Promise((resolve) => {
            resolve(users['1'])
        })
    }
}

export const profileAPI = {
    getProfile(id) {
        return new Promise((resolve) => {
            resolve(users[id])
        })
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
                'statusCode': 1,
                'type': subscribeType
            })
        })
    }
}

export const articlesAPI = {
    getMainArticles(authId) {
        return new Promise((resolve) => {
            const outputArticles = Object.values(articles)
            .flatMap(articleArray => articleArray)
            .filter(article => article.author_id !== authId)
            setTimeout(() => resolve(outputArticles), 0)
            // resolve(outputArticles)
        })
    },
    getProfileArticles(profileId, authId) {
        return new Promise((resolve) => {
            // setTimeout(() => resolve(articles[`${profileId}`]), 2000)
            if (profileId === authId) {
                resolve({
                    'statusCode': 1,
                    'profileArticles': articles[`${profileId}`],
                    'draftArticles': articles_draft[`${profileId}`],
                    'moderationArticles': [articles_to_moderation.find(art => art.author_id === profileId)]
                })
            } else {
                resolve({
                    'statusCode': 1,
                    'profileArticles': articles[`${profileId}`],
                })
            }
        })
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
                'statusCode': 1
            })
        })
    },
    getFullArticle(articleId) {
        return new Promise((resolve) => {
            const metaArticle = Object.values(articles)
            .flatMap(articleArray => articleArray)
            .find(article => article.id == articleId)
            const fullArticle = {
                ...metaArticle,
                ...articles_content[articleId]
            }
            resolve({
                'statusCode': 1,
                'data': fullArticle
            })
        })
    },
    getArticleForEditing(articleId) {
        return new Promise((resolve) => {
            const metaArticle = Object.values(articles_draft)
            .flatMap(articleArray => articleArray)
            .find(article => article.id == articleId)
            resolve({
                'statusCode': 1,
                'data': metaArticle
            })
        })
    },
    getArticleForEditingFormMain(articleId, authId) {
        return new Promise((resolve) => {
            const metaArticle = articles[authId].find(art => art.id == articleId)
            if (metaArticle.id) {
                resolve({
                    'statusCode': 1,
                    'data': metaArticle
                })
            } else {
                resolve({
                    'statusCode': 2
                }) 
            }
        })
    },
    getArticleForEditingFormDraft(articleId) {
        return new Promise((resolve) => {
            const metaArticle = Object.values(articles_draft)
            .flatMap(articleArray => articleArray)
            .find(article => article.id == articleId)
            resolve({
                'statusCode': 1,
                'data': metaArticle
            })
        })
    },
    getArticleForEditingFormModer(articleId) {
        return new Promise((resolve) => {
            const metaArticle = Object.values(articles_to_moderation).find(article => article.id == articleId)
            resolve({
                'statusCode': 1,
                'data': metaArticle
            })
        })
    },
    // isAuthorArticle(articleId, authorId) {
    //     return new Promise((resolve) => {
    //         let isAuthor = false
    //         let isDraft = false
    //         const metaArticle = Object.values(articles)
    //         .flatMap(articleArray => articleArray)
    //         .find(article => article.id == articleId && article.author_id == authorId)
    //         const metaDraftArticle = Object.values(articles_draft)
    //         .flatMap(articleArray => articleArray)
    //         .find(article => article.id == articleId && article.author_id == authorId)
    //         if (metaArticle) {
    //             isAuthor = true
    //         } else if (metaDraftArticle) {
    //             isAuthor = true
    //             isDraft = true
    //         } 
    //         resolve({
    //             'statusCode': 1,
    //             'data': {
    //                 'isAuthor': isAuthor,
    //                 'isDraft': isDraft
    //             },
    //         })
    //     })
    // },
    isAuthorPublicArticle(articleId, authorId) {
        return new Promise((resolve) => {
            const metaArticle = Object.values(articles)
            .flatMap(articleArray => articleArray)
            .find(article => article.id == articleId && article.author_id == authorId)
            if (metaArticle.id) {
                resolve({
                    'statusCode': 1,
                    'data': {
                        'isAuthor': true
                    },
                })
                return
            }
            resolve({
                'statusCode': 1,
                'data': {
                    'isAuthor': false
                },
            })
        })
    },
    isAuthorArticle(articleId, authorId, type) {
        return new Promise((resolve) => {
            if (type === 'redactor') {
                const metaArticleDraft = Object.values(articles_draft)
                .flatMap(articleArray => articleArray)
                .find(article => article.id == articleId && article.author_id == authorId)
                if (metaArticleDraft.id) {
                    resolve({
                        'statusCode': 1,
                        'data': {
                            'from': 'draft',
                            'id': metaArticleDraft.id,
                            'isAuthor': true
                        },
                    })
                    return
                }
            } else if (type === 'moder') {
                const metaArticleModer = Object.values(articles_to_moderation).find(article => article.id == articleId && article.author_id == authorId)
                if (metaArticleModer.id) {
                    resolve({
                        'statusCode': 1,
                        'data': {
                            'from': 'draft',
                            'id': metaArticleModer.id,
                            'isAuthor': true
                        },
                    })
                    return
                }
            }            
            resolve({
                'statusCode': 1,
                'data': {
                    'isAuthor': false
                },
            })
        })
    },
    saveArticleToDraft(article, authId) {
        return new Promise((resolve) => {
            let id = Object.values(articles_draft).reduce((accumulator, current) => accumulator + current.length, 0) + 1
            article.id = id
            articles_draft[`${authId}`] = [article, ...articles_draft[`${authId}`]]
            users[`${authId}`].draft_articles.push(id)
            resolve({
                'statusCode': 1
            })
        })
    },
    updateArticleToDraft(article, authId) {
        return new Promise((resolve) => {
            articles_draft[`${authId}`] = [article, ...articles_draft[`${authId}`].filter(art => art.id != article.id)]
            resolve({
                'statusCode': 1
            })
        })
    },
    requestArticle(article) {
        return new Promise((resolve) => {
            if (articles_to_moderation.find(atm => atm.author_id === article.author_id)) {
                resolve({
                    'statusCode': 2
                })
                return
            }
            const id = articles_to_moderation.length    
            articles_to_moderation.push({
                ...article,
                'id': id
            })
            article.id = articles_to_moderation.length + 1
            articles_to_moderation.push(article)
            users[`${article.author_id}`].moderation_articles.push(id)
            resolve({
                'statusCode': 1
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