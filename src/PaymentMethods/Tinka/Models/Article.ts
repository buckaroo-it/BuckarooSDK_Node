import IArticle from '../../../Models/Services/IArticle'
import { ArticleService } from '../../../Models/Services/IArticle'
export interface ITinkaArticle extends Omit<IArticle, 'identifier'> {
    color?: string
    size?: string
}

export const TinkaArticle = (data) => {
    return ArticleService(data, {
        keys: {
            price: 'UnitGrossPrice'
        }
    })
}
