import { IRequest } from '../../../Models';
import { ISeller } from './Seller';
import { IMarketplace } from './Marketplace';

export interface ITransfer extends IRequest {
    seller?: ISeller[];
    marketplace?: IMarketplace;
    originalTransactionKey: string;
}
