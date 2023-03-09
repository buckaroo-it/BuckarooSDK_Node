import { ServiceParameterList } from '../../../Utils/ServiceParameter'
import {ICreditArticle} from "./Article";
import {ITransaction} from "../../../Models/ITransaction";

export interface IAddOrUpdateProductLines extends ITransaction{
    invoiceKey:string
    articles:ICreditArticle[]
}
export const AddOrUpdateProductLines = (data: IAddOrUpdateProductLines) => {

    let services = new ServiceParameterList({
        invoiceKey:data.invoiceKey,
        articles:data.articles,
    })

    services.list.articles.groupType = 'ProductLine'
    services.list.articles.setKeys({
        identifier: 'ProductId',
        description: 'ProductName',
        price: 'PricePerUnit'
    })
    services.setCountable('articles')

    return  services
}
