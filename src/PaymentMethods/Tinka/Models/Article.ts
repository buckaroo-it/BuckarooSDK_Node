import IArticle from '../../../Models/Services/IArticle'
export interface ITinkaArticle extends Omit<IArticle, 'identifier'> {
    color?: string
    size?: string
}
