import axios from 'axios'
import { users, articles, posts, comments, articles_content, articles_to_moderation, articles_draft } from './../redux/db'
import { randomIdGenerator } from '../utils/randomIdGenerator'


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
                    'moderationArticles': [articles_to_moderation.find(art => art.author_id === profileId)].filter(a => a !== undefined)
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
            const metaArticle = {
                ...articles[authId].find(art => art.id == articleId),
                'content': [...articles_content[articleId].content]
            }
            if (metaArticle) {
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
    isAuthorPublicArticle(articleId, authorId) {
        return new Promise((resolve) => {
            const metaArticle = Object.values(articles)
            .flatMap(articleArray => articleArray)
            .find(article => article.id == articleId && article.author_id == authorId)
            if (metaArticle) {
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
                if (metaArticleDraft) {
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
                if (metaArticleModer) {
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
            if (article['editing_from']) {
                delete article['editing_from']
            }
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
    },
    removePublicArticle(articleId, authId) {
        return new Promise((resolve) => {
            const metaArticlePublic = articles[authId]
            .find(article => article.id == articleId && article.author_id == authId)
            if (metaArticlePublic) {
                articles[authId] = articles[authId].filter(article => article.id !== articleId)
                resolve({
                    'statusCode': 1
                })
            } else {
                resolve({
                    'statusCode': 2
                })
            }
        })
    },
    removeDraftArticle(articleId, authId) {
        return new Promise((resolve) => {
            const metaArticleDraft = articles_draft[authId]
            .find(article => article.id == articleId && article.author_id == authId)
            if (metaArticleDraft) {
                articles_draft[authId] = articles_draft[authId].filter(article => article.id !== articleId)
                resolve({
                    'statusCode': 1
                })
            } else {
                resolve({
                    'statusCode': 2
                })
            }
        })
    },
    removeModerArticle(articleId, authId) {
        return new Promise((resolve) => {
            const metaArticleModer = articles_to_moderation.find(article => article.id == articleId && article.author_id == authId)
            if (metaArticleModer) {
                for (let i = 0; i < articles_to_moderation.length; i++) {
                    if (articles_to_moderation[i].id === articleId) {
                        articles_to_moderation.splice(i, 1)
                        break
                    }
                }
                resolve({
                    'statusCode': 1
                })
            } else {
                resolve({
                    'statusCode': 2
                })
            }
        })
    },
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
    },
    removePost(postId, authId) {
        return new Promise((resolve) => {
            if (posts[authId]) {
                if (posts[authId].find(post => post.id === postId)) {
                    posts[authId] = posts[authId].filter(post => post.id !== postId)
                    resolve({
                        'statusCode': 1
                    })
                    return
                }
            }
            resolve({
                'statusCode': 2
            })
        })
    }
}

export const commentsAPI = {
    getComments(commentsId) {
        return new Promise((resolve) => {
            let parsedComments = []
            for (let i = 0; i <= commentsId.length - 1; i++) {
                parsedComments.push(comments.find(c => c.id === commentsId[i]))

            }
            resolve({
                'statusCode': 1,
                'data': parsedComments
            })
        })
    },
    sendCommentToArticle(comment, authorId, articleId) {
        return new Promise((resolve) => {
            comment.id = randomIdGenerator()
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
            comment.id = randomIdGenerator()
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
            const editingComment = comments.find(com => com.id === commentId)
            if (editingComment) {
                if (editingComment.dislike_id.find(id => id === likeAuthorId)) {
                    editingComment.dislike_count -= 1
                    editingComment.dislike_id = editingComment.dislike_id.filter(id => id !== likeAuthorId)
                }
                if (editingComment.likes_id.find(id => id === likeAuthorId)) {
                    editingComment.likes_count -= 1
                    editingComment.likes_id = editingComment.likes_id.filter(id => id !== likeAuthorId)
                } else {
                    editingComment.likes_count += 1
                    editingComment.likes_id.push(likeAuthorId)
                }
                resolve({
                    'statusCode': 1
                })
                return
            }
            resolve({
                'statusCode': 2
            })
        })
    },
    dislikeComment(commentId, dislikeAuthorId) {
        return new Promise((resolve) => {
            const editingComment = comments.find(com => com.id === commentId)
            if (editingComment) {
                if (editingComment.likes_id.find(id => id === dislikeAuthorId)) {
                    editingComment.likes_count -= 1
                    editingComment.likes_id = editingComment.likes_id.filter(id => id !== dislikeAuthorId)
                }
                if (editingComment.dislike_id.find(id => id === dislikeAuthorId)) {
                    editingComment.dislike_count -= 1
                    editingComment.dislike_id = editingComment.dislike_id.filter(id => id !== dislikeAuthorId)
                } else {
                    editingComment.dislike_count += 1
                    editingComment.dislike_id.push(dislikeAuthorId)
                }
                resolve({
                    'statusCode': 1
                })
                return
            }
            resolve({
                'statusCode': 2
            })
        })
    },
    removeCommentFromArticle(commentId, authId, authorId, articleId) {
        return new Promise((resolve) => {
            const findComment = comments.find(com => com.id === commentId && com.author_id === authId)
            if (findComment) {
                for (let i = 0; i < comments.length; i++) {
                    if (comments[i].id === commentId) {
                        comments.splice(i, 1)
                        break
                    }
                }
                for (let i = 0; i <= articles[authorId].length - 1; i++) {
                    if (articles[authorId][i].id === articleId) {
                        articles[authorId][i].comments_id = articles[authorId][i].comments_id.filter(c => c !== commentId)
                        articles[authorId][i].comments_count -= 1
                        break
                    }
                }
                resolve({
                    'statusCode': 1
                })
                return
            }
            resolve({
                'statusCode': 2
            })
        })
    },
    removeCommentFromPost(commentId, authId, authorId, articleId) {
        return new Promise((resolve) => {
            const findComment = comments.find(com => com.id === commentId && com.author_id === authId)
            if (findComment) {
                for (let i = 0; i < comments.length; i++) {
                    if (comments[i].id === commentId) {
                        comments.splice(i, 1)
                        break
                    }
                }
                for (let i = 0; i <= posts[authorId].length - 1; i++) {
                    if (posts[authorId][i].id === articleId) {
                        posts[authorId][i].comments_id = posts[authorId][i].comments_id.filter(c => c !== commentId)
                        posts[authorId][i].comments_count -= 1
                        break
                    }
                }
                resolve({
                    'statusCode': 1
                })
                return
            }
            resolve({
                'statusCode': 2
            })
        })
    }
}