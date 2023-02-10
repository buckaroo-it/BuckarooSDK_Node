import Model from "../../../Models/Model";
import IArticle from "../../../Models/IArticle";

export default class Article  implements IArticle{
  identifier: string = '';
  quantity: number = 0;
  price: number = 0;
  vatPercentage: number = 0;
  description?: string;
  constructor(data) {
    Model.setParameters(this,data)
    Model.setKeys(this,{
      price: "GrossUnitPrice",
    })
  }
  groupType?(): string {
    return 'Article';
  }
  groupID?(id:string): number {
    return Number(id)+1;
  }

}
