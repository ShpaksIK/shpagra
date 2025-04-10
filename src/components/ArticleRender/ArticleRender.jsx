import React from 'react'

import Title from './articleComponents/Title'
import Text from './articleComponents/Text'
import Image from './articleComponents/Image'
import NumberedList from './articleComponents/NumberedList'
import Margin from './articleComponents/Margin'
import BulletedList from './articleComponents/BulletedList'
import Quote from './articleComponents/Quote'


export const ArticleRender = ({ content, type = 'view' }) => {
    // Рендеринг элементов статьи
    let titleCount = 0
    const contentElementsCount = content.length

    return content.map((block, index) => {
        switch (block.type) {
            case 'title':
                titleCount += 1
                return <Title key={index} position={index} type={type} text={block.text} hrefId={titleCount} contentElementsCount={contentElementsCount} />
            case 'text':
                return <Text key={index} position={index} type={type} text={block.text} contentElementsCount={contentElementsCount} />
            case 'img':
                return <Image key={index} position={index} type={type} src={block.src} description={block.description} contentElementsCount={contentElementsCount} />
            case 'indent':
                return <Margin key={index} position={index} type={type} contentElementsCount={contentElementsCount} />
            case 'ol':
                return <NumberedList key={index} position={index} type={type} list={block.list} contentElementsCount={contentElementsCount} />
            case 'ul':
                return <BulletedList key={index} position={index} type={type} list={block.list} contentElementsCount={contentElementsCount} />
            case 'quote':
                return <Quote key={index} position={index} type={type} text={block.text} contentElementsCount={contentElementsCount} />
            default:
                return
        }
    })
}