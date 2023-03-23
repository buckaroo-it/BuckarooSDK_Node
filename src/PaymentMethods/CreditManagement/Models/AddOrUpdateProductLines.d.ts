import { ICreditArticle } from './Article';
import { ITransaction } from '../../../Models/ITransaction';
export interface IAddOrUpdateProductLines extends ITransaction {
    invoiceKey: string;
    articles: ICreditArticle[];
}
export declare const AddOrUpdateProductLines: (data: any) => any;
