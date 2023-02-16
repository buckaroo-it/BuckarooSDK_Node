import Model from "./Model";

export default interface IArticle {
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
}
export class Article extends Model implements IArticle {
  brand?: string = '';
  description?: string = '';
  identifier?: string = '';
  manufacturer?: string = '';
  price?: number = 0;
  quantity?: number = 0;
  type?: string = '';
  unitCode?: string = '';
  vatCategory?: number = 0;
  vatPercentage?: number = 0;

}