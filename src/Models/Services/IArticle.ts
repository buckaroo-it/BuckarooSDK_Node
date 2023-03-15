import {Adapters, ServiceModel} from "../Adapters";

export default interface IArticle {
    identifier?: string
    type?: string
    brand?: string
    manufacturer?: string
    unitCode?: string
    quantity?: Number
    price?: Number
    vatCategory?: Number
    vatPercentage?: Number
    description?: string
}
export function ArticleService(data, adapters:Adapters = { groupId:true,groupType:'Article'}) {
    return ServiceModel(data,adapters)
}
