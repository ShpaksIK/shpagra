import Title from './articleComponents/Title'
import Text from './articleComponents/Text'
import Image from './articleComponents/Image'
import NumberedList from './articleComponents/NumberedList'
import Margin from './articleComponents/Margin'
import BulletedList from './articleComponents/BulletedList'


export const ArticleRender = ({ content }) => {
    // Рендеринг элементов статьи
    let titleCount = 0

    return content.map((block, index) => {
        switch (block.type) {
            case 'title':
                titleCount += 1
                return <Title key={index} text={block.text} hrefId={titleCount} />
            case 'text':
                return <Text key={index} text={block.text} />
            case 'img':
                return <Image key={index} src={block.src} />
            case 'indent':
                return <Margin key={index} />
            case 'ol':
                return <NumberedList key={index} list={block.list} />
            case 'ul':
                return <BulletedList key={index} list={block.list} />
            default:
                return
        }
    })
}