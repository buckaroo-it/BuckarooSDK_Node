import {Article} from '../../../Models/IArticle'

export default class Articles {
    articles:Article[] = [];
    constructor(data) {
      if (!Array.isArray(data)) {
        data = [data]
      }
      for (const dataKey in data) {
        this.articles.push(
          new Article()
            .setParameters(data[dataKey])
            .setKeys({
              price: 'GrossUnitPrice'
          })
        )
      }
      if(this.articles?.length === 0) {
        throw new Error('Missing Parameter:articles')
      }
    }
}