import Model from '../../../Models/Model'

export interface IArticle {
  identifier: string
  quantity: number
  price: number
  vatPercentage: number
  description?: string
}
export default class Article extends Model implements IArticle {
  identifier: string = ''
  quantity: number = 0
  price: number = 0
  vatPercentage: number = 0
  description?: string
  constructor (data) {
    super()
    this.setParameters( data)
    this.setKeys( {
      price: 'GrossUnitPrice'
    })
  }

  groupType? (): string {
    return 'Article'
  }

  groupID? (id: string): number {
    return Number(id) + 1
  }
}
