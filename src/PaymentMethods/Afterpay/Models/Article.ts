import IArticle from '../../../Models/IArticle'
import Model from '../../../Models/Model'

export default class Article extends Model implements IArticle {
  description: string = '';
  price: number = 0;
  vatPercentage: number = 0;
  quantity: number = 0;
  identifier: string = '';
  imageUrl?:string
  url?:string
  type?:string
  unitCode: string = '';
  marketPlaceSellerId?:string

  constructor (data) {
    super()
    this.setParameters(data)
    this.setKeys({
      price: 'GrossUnitPrice'
    })
  }
}
