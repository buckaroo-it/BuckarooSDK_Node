import { ITransaction } from './ITransaction';
import { IServiceList, IServices } from './ServiceList';
export interface RequestData extends ITransaction {
    services?: IServices;
}
export declare class Request {
    protected data: RequestData;
    getData(): RequestData;
    basicParameters: Record<keyof RequestData, boolean>;
}
export declare class TransactionRequest extends Request {
    setData(data: any): void;
    setDataKey(key: any, data: any): void;
    setServices(serviceList: IServiceList): void;
    addServices(serviceList: IServiceList): void;
}
