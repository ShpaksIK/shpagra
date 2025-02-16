export let users = {
    '1': {
        'id': 1,
        'custom_id': '1',
        'login': 'Shpaks',
        'password': '123456',
        'email': 'test@mail.ru',
        'created_at': '01.01.2025',
        'avatar': '',
        'articles_id': [2],
        'posts_id': [1],
        'followers_id': [3],
        'followers_count': 1,
        'followeds_id': [5],
        'draft_articles': [1],
        'moderation_articles': [1]
    },
    '2': {
        'id': 2,
        'custom_id': '2',
        'login': 'Matvei',
        'password': '123456',
        'email': 'matvei@mail.ru',
        'created_at': '01.01.2024',
        'avatar': '',
        'articles_id': [1, 3],
        'posts_id': [],
        'followers_id': [],
        'followers_count': 0,
        'followeds_id': [],
        'draft_articles': [],
        'moderation_articles': []
    },
    '3': {
        'id': 3,
        'custom_id': '3',
        'login': 'Ifnuh',
        'password': '123456',
        'email': 'ifnuh@mail.ru',
        'created_at': '24.02.2022',
        'avatar': '',
        'articles_id': [],
        'posts_id': [2, 3],
        'followers_id': [],
        'followers_count': 0,
        'followeds_id': [1],
        'draft_articles': [],
        'moderation_articles': []
    },
    '4': {
        'id': 4,
        'custom_id': '4',
        'login': 'Boss KFS',
        'password': '123456',
        'email': 'boss@gmail.ru',
        'created_at': '01.01.2025',
        'avatar': '',
        'articles_id': [],
        'posts_id': [],
        'followers_id': [],
        'followers_count': 0,
        'followeds_id': [],
        'draft_articles': [],
        'moderation_articles': []
    },
    '5': {
        'id': 5,
        'custom_id': '5',
        'login': 'Sigma boy',
        'password': '123456',
        'email': 'yashalava@xui.ru',
        'created_at': '01.01.2007',
        'avatar': '',
        'articles_id': [],
        'posts_id': [],
        'followers_id': [1],
        'followers_count': 1,
        'followeds_id': [],
        'draft_articles': [],
        'moderation_articles': []
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
        'text': 'Hello world!',
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
        'text': 'Мой пост №2',
        'created_at': '09.01.2025 в 23:52',
        'likes_count': 0,
        'likes_id': [],
        'comments_id': [],
        'comments_count': 0,
        'author': 'Ifnuh',
        'author_id': 3
    },],
}

// Таблица articles_to_moderation (массив статей на проверку)
// Данная таблица содержит массив со статьями, которые были
// запрошены пользователями на публикацию.
// При дальнейшем раскладе они будут либо удалены, либо опубликованы
// и перенесуться в таблицу articles к пользователю.
// Id статьи не имеет отношений к другим id.
// После публикации значение content перейдет в другую таблицу и удалится.
// Поле is_update удалится, но будет проверка с ним.
export let articles_to_moderation = [
    {
        'id': 1,
        'title': 'Статья на проверку',
        'description': 'Что же написать во этой статье...',
        'banner': 'https://png.pngtree.com/thumb_back/fh260/background/20201015/pngtree-christmas-banner-background-with-black-snowflakes-and-green-pine-tree-merry-image_417517.jpg',
        'created_at': '09.01.2025 в 23:52',
        'content': [
            {
                'type': 'title',
                'text': 'Заголовок 1'
            },
            {
                'type': 'text',
                'text': 'Параграф 1'
            },
        ],
        'scopes': ['#рек'],
        'author': 'Shpaks',
        'author_id': 1,
        'is_update': false
    }
]

// Таблица articles_draft (id пользователя : массив его статей в черновиках)
// Будет отдельная таблица, чтобы не нагружать таблицу articles
// и эффективнее использовать ресурсы.
// Id статьи не связано с id в таблице articles. Id будет перезаписан в будущем.
// Также id имеет префикс 'r', чтобы отличаться при вводе в URL адресс id статьи.
export let articles_draft = {
    '1': [
        {
            'id': 1,
            'title': 'Моя вторая статья!',
            'description': 'Что же написать во второй статье...',
            'banner': 'https://png.pngtree.com/thumb_back/fh260/background/20201015/pngtree-christmas-banner-background-with-black-snowflakes-and-green-pine-tree-merry-image_417517.jpg',
            'created_at': '09.01.2025 в 23:52',
            'content': [
                {
                    'type': 'title',
                    'text': 'Заголовок 1'
                },
                {
                    'type': 'text',
                    'text': 'Параграф 1'
                },
                {
                    'type': 'img',
                    'src': 'https://png.pngtree.com/thumb_back/fh260/background/20201015/pngtree-christmas-banner-background-with-black-snowflakes-and-green-pine-tree-merry-image_417517.jpg',
                    'description': 'Моя первая картинка в статье'
                },
            ],
            'scopes': ['#первый', '#рек'],
            'author': 'Shpaks',
            'author_id': 1
        }
    ]
}

// Таблица articles (id пользователя : массив его статей)
// Сделал таким образом, чтобы система быстро получала доступ
// к статьям конкретного пользователя.
export let articles = {
    '2': [{
        'id': 2,
        'title': 'Как пукнуть так, чтобы было тихо?',
        'description': 'В этой статье вы узнаете как пукнуть тихо, чтобы вас никто не заметил и не наругал за ваши грешки)',
        'banner': 'https://cs13.pikabu.ru/post_img/2022/12/17/9/og_og_1671286379260820250.jpg',
        'created_at': '09.01.2025 в 23:52',
        'likes_count': 2,
        'likes_id': [1, 3],
        'comments_id': [5436346, 632657],
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
        'id': 1,
        'title': 'Моя первая статья',
        'description': 'Что-то написано...',
        'banner': 'https://thumbs.dreamstime.com/b/%D0%BF%D0%BB%D0%BE%D1%81%D0%BA%D0%B8%D0%B9-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B8%D0%B7%D0%BE%D0%B3%D0%BD%D1%83%D1%82%D0%BE%D0%B9-%D0%BA%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D0%B9-%D0%BB%D0%B5%D0%BD%D1%82%D1%8B-%D0%B1%D0%B0%D0%BD%D0%BD%D0%B5%D1%80%D0%B0-%D0%BD%D0%B0-%D0%B1%D0%B5%D0%BB%D0%BE%D0%BC-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F-216494194.jpg',
        'created_at': '09.01.2025 в 23:52',
        'likes_count': 0,
        'likes_id': [],
        'comments_id': [373568756],
        'comments_count': 1,
        'scopes': ['#моя', '#статья'],
        'author': 'Shpaks',
        'author_id': 1
    }],
}

// Таблица articles_content (id статьи : данные контента статьи)
// Создал отдельную таблицу с контентом статей, чтобы не нагружать
// таблицу articles, для эффективного использования ресурсов (память, тафик).
// Иначе, при просмотре главной ленты, статьи грузились бы вместе с контентом,
// что не эффективно, так как пользователь, вероятней всего, не будет смотреть
// содержимое данной статьи.
export let articles_content = {
    '1': {
        'id': 1,
        'content': [
            {
                'type': 'title',
                'text': 'Заголовок 1'
            },
            {
                'type': 'text',
                'text': 'Параграф №1. Это текст.'
            },
            {
                'type': 'img',
                'src': 'https://thumbs.dreamstime.com/b/%D0%BF%D0%BB%D0%BE%D1%81%D0%BA%D0%B8%D0%B9-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80-%D0%B8%D0%B7%D0%BE%D0%B3%D0%BD%D1%83%D1%82%D0%BE%D0%B9-%D0%BA%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D0%B9-%D0%BB%D0%B5%D0%BD%D1%82%D1%8B-%D0%B1%D0%B0%D0%BD%D0%BD%D0%B5%D1%80%D0%B0-%D0%BD%D0%B0-%D0%B1%D0%B5%D0%BB%D0%BE%D0%BC-%D0%B2%D0%B5%D0%BA%D1%82%D0%BE%D1%80%D0%BD%D0%B0%D1%8F-216494194.jpg'
            },
            {
                'type': 'indent'
            },
            {
                'type': 'title',
                'text': 'Заголовок 2'
            },
            {
                'type': 'text',
                'text': 'Параграф №2. Это текст.'
            },
            {
                'type': 'ol',
                'list': ['Первый случай', 'Второй случай', 'Третий случай']
            },
            {
                'type': 'ul',
                'list': ['Первый случай', 'Второй случай', 'Третий случай']
            },
        ]
    },
    '2': {
        'id': 2,
        'content': [
            {
                'type': 'title',
                'text': 'Заголовок 1'
            },
            {
                'type': 'text',
                'text': 'Параграф №1. Это текст.'
            },
            {
                'type': 'title',
                'text': 'Заголовок 2'
            },
            {
                'type': 'text',
                'text': 'Параграф №2. Это текст.'
            },
            {
                'type': 'ol',
                'list': ['Первый случай', 'Второй случай', 'Третий случай']
            },
            {
                'type': 'title',
                'text': 'Заголовок 2'
            },
        ]
    },
    '3': {
        'id': 3,
        'content': [
            {
                'type': 'title',
                'text': 'ЧАСТЬ 2. Как это сделать?'
            },
            {
                'type': 'text',
                'text': 'Берем и делаем!'
            },
            {
                'type': 'title',
                'text': 'Заголовок 2'
            },
            {
                'type': 'text',
                'text': 'Параграф №2. Это текст.'
            },
            {
                'type': 'ol',
                'list': ['Первый случай', 'Второй случай', 'Третий случай']
            },
            {
                'type': 'title',
                'text': 'Збазибо за внимание'
            },
        ]
    },
}

// Таблица comments (массив всех комментариев)
// Данная таблица содержит массив абсолютно всех комментариев пользователей
// на сайте (статей и постов).
export let comments = [
    {
        'id': 5436346,
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
        'id': 632657,
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
        'id': 373568756,
        'text': 'Я ифнух 2',
        'likes_count': 0,
        'likes_id': [],
        'dislike_count': 1,
        'dislike_id': [1],
        'created_at': '09.01.2025 в 23:53',
        'author': 'Ifnuh',
        'author_id': 3
    },
]