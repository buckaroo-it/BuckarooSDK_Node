import IArticle,{Article as article} from '../../../Models/IArticle'

export default class Article extends article {
  description?: string = undefined;
  price?: number = undefined;
  vatCategory?: number = undefined;
  quantity?: number = undefined;
  identifier?: string = undefined;

  constructor (data) {
    super()
    this.setParameters(data)
    this.setKeys({
      quantity:'ArticleQuantity',
      identifier: 'ArticleId',
      description: 'ArticleDescription',
      price: 'GrossUnitPrice',
      vatCategory:'ArticleVatcategory'
    })
  }
}
