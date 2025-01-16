export let users = {
    '1': {
        'id': 1,
        'custom_id': '1',
        'login': 'Shpaks',
        'password': '123456',
        'email': 'test@mail.ru',
        'created_at': '01.01.2025',
        'articles_id': [2],
        'posts_id': [1],
        'followers_id': [3],
        'followers_count': 1,
        'followeds_id': [5]
    },
    '2': {
        'id': 2,
        'custom_id': '2',
        'login': 'Matvei',
        'password': '123456',
        'email': 'matvei@mail.ru',
        'created_at': '01.01.2024',
        'articles_id': [1, 3],
        'posts_id': [],
        'followers_id': [],
        'followers_count': 0,
        'followeds_id': []
    },
    '3': {
        'id': 3,
        'custom_id': '3',
        'login': 'Ifnuh',
        'password': '123456',
        'email': 'ifnuh@mail.ru',
        'created_at': '24.02.2022',
        'articles_id': [],
        'posts_id': [2, 3],
        'followers_id': [],
        'followers_count': 0,
        'followeds_id': [1]
    },
    '4': {
        'id': 4,
        'custom_id': '4',
        'login': 'Boss KFS',
        'password': '123456',
        'email': 'boss@gmail.ru',
        'created_at': '01.01.2025',
        'articles_id': [],
        'posts_id': [],
        'followers_id': [],
        'followers_count': 0,
        'followeds_id': []
    },
    '5': {
        'id': 5,
        'custom_id': '5',
        'login': 'Яша Лава',
        'password': '123456',
        'email': 'yashalava@xui.ru',
        'created_at': '01.01.2007',
        'articles_id': [],
        'posts_id': [],
        'followers_id': [1],
        'followers_count': 1,
        'followeds_id': []
    }
}

export let posts = {
    '1': [{
        'id': 1,
        'text': 'My first post',
        'created_at': '09.01.2025 в 23:52',
        'likes_count': 0,
        'likes_id': [],
        'comments_id': [],
        'comments_count': 0,
        'author': 'Shpaks',
        'author_id': 1
    }],
    '3': [{
        'id': 2,
        'text': 'Гыга гага у меня дцп',
        'created_at': '09.01.2025 в 23:52',
        'likes_count': 1,
        'likes_id': [5],
        'comments_id': [],
        'comments_count': 0,
        'author': 'Ifnuh',
        'author_id': 3
    },
    {
        'id': 3,
        'text': 'Я дцп №2',
        'created_at': '09.01.2025 в 23:52',
        'likes_count': 0,
        'likes_id': [],
        'comments_id': [],
        'comments_count': 0,
        'author': 'Ifnuh',
        'author_id': 3
    },],
}

export let articles = {
    '2': [{
        'id': 1,
        'title': 'Как пукнуть так, чтобы было тихо?',
        'description': 'В этой статье вы узнаете как пукнуть тихо, чтобы вас никто не заметил и не наругал за ваши грешки)',
        'banner': 'https://cs13.pikabu.ru/post_img/2022/12/17/9/og_og_1671286379260820250.jpg',
        'created_at': '09.01.2025 в 23:52',
        'likes_count': 2,
        'likes_id': [1, 3],
        'comments_id': [1, 2],
        'comments_count': 2,
        'scopes': ['#первый', '#рек'],
        'author': 'Matvei',
        'author_id': 2
    },
    {
        'id': 3,
        'title': 'Как пукнуть так, чтобы было тихо? ЧАСТЬ 2',
        'description': 'В этой статье вы узнаете как пукнуть тихо, чтобы вас никто не заметил и не наругал за ваши грешки)',
        'banner': 'https://cs13.pikabu.ru/post_img/2022/12/17/9/og_og_1671286379260820250.jpg',
        'created_at': '09.01.2025 в 23:52',
        'likes_count': 0,
        'likes_id': [],
        'comments_id': [],
        'comments_count': 0,
        'scopes': ['#первый', '#рек'],
        'author': 'Matvei',
        'author_id': 2
    }],
    '1': [{
        'id': 2,
        'title': 'Моя первая статья',
        'description': 'Что-то написано...',
        'banner': 'https://thumbs.dreamstime.com/b/%D0%BF%D0%BB%D0%BE%D1%81%D0%BA%D0%B8%D0%B9-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B8%D0%B7%D0%BE%D0%B3%D0%BD%D1%83%D1%82%D0%BE%D0%B9-%D0%BA%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D0%B9-%D0%BB%D0%B5%D0%BD%D1%82%D1%8B-%D0%B1%D0%B0%D0%BD%D0%BD%D0%B5%D1%80%D0%B0-%D0%BD%D0%B0-%D0%B1%D0%B5%D0%BB%D0%BE%D0%BC-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F-216494194.jpg',
        'created_at': '09.01.2025 в 23:52',
        'likes_count': 0,
        'likes_id': [],
        'comments_id': [3],
        'comments_count': 1,
        'scopes': ['#моя', '#статья'],
        'author': 'Shpaks',
        'author_id': 1
    }],
}

export let comments = [
    {
        'id': 1,
        'text': 'Это лучшая статья на свете!!! Делайте вторую часть',
        'likes_count': 2,
        'likes_id': [5, 1],
        'dislike_count': 0,
        'dislike_id': [],
        'created_at': '09.01.2025 в 23:53',
        'author': 'Ifnuh',
        'author_id': 3
    },
    {
        'id': 2,
        'text': 'Я ифнух',
        'likes_count': 0,
        'likes_id': [],
        'dislike_count': 1,
        'dislike_id': [1],
        'created_at': '09.01.2025 в 23:53',
        'author': 'Ifnuh',
        'author_id': 3
    },
    {
        'id': 3,
        'text': 'Я ифнух',
        'likes_count': 0,
        'likes_id': [],
        'dislike_count': 1,
        'dislike_id': [1],
        'created_at': '09.01.2025 в 23:53',
        'author': 'Ifnuh',
        'author_id': 3
    },
]