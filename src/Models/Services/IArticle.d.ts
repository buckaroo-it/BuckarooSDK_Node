import { ServiceParameters } from '../../Utils/ServiceParameter';
export default interface IArticle {
    identifier: string;
    type?: string | Number;
    brand?: string;
    manufacturer?: string;
    unitCode?: string;
    quantity: Number;
    price: Number;
    vatCategory?: Number;
    vatPercentage?: Number;
    description?: string;
}
export type Adapters = {
    keys?: {
        [key: string]: string;
    };
    groupType?: string;
    groupId?: boolean | string | number;
};
export declare function ArticleService(articlesData: any, adapters?: Adapters): ServiceParameters;
