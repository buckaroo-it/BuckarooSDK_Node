import ArticleModel from '../../../Models/IArticle'
import Model from '../../../Models/Model'

export default class Article extends Model implements ArticleModel {
  identifier?: string
  type?: string
  brand?: string
  manufacturer?: string
  unitCode?: string
  quantity?: number
  price?: number
  vatCategory?: number
  vatPercentage?: number
  description?: string
  color?: string
  constructor (data) {
    super()
    this.identifier = data.identifier
    this.type = data.type
    this.description = data.description
    this.brand = data.brand
    this.manufacturer = data.manufacturer
    this.unitCode = data.unitCode
    this.quantity = data.quantity
    this.price = data.price
    this.vatCategory = data.vatCategory
    this.vatPercentage = data.vatPercentage
    this.color = data.color

    this.setKeys({
      price: 'UnitGrossPrice'
    })
  }
}
