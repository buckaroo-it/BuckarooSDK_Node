import IArticle from '../../../Models/Services/IArticle';
export interface ITinkaArticle extends Omit<IArticle, 'identifier'> {
    color?: string;
    size?: string;
}
export declare const TinkaArticle: (data: any) => import("../../../Utils/ServiceParameter").ServiceParameters;
