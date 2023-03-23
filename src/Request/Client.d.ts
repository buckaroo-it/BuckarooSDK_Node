import { RequestType } from '../Constants/Endpoints';
import HttpMethods from '../Constants/HttpMethods';
import PaymentMethod from '../PaymentMethods/PaymentMethod';
import { ITransaction } from '../Models/ITransaction';
import { IConfig, ICredentials } from '../Utils/Types';
import { Methods } from "../Utils/PaymentMethods";
declare class Client extends Methods {
    private static _credentials;
    private static _config;
    private constructor();
    static initialize(credentials: any, config: any): Client;
    getCredentials: () => ICredentials;
    getConfig: () => IConfig;
    protected getHeaders(method: any, data: any, url: any): {
        [key: string]: string;
    };
    protected getOptions(method: HttpMethods, url: string | URL, data: string): {
        hostname: string;
        path: string;
        method: HttpMethods;
        headers: {
            [key: string]: string;
        };
        data: string;
    };
    private getEndpoint;
    private getTransactionUrl;
    private getDataRequestUrl;
    protected getSpecificationUrl(paymentName: any, serviceVersion: any, type?: RequestType): string;
    private get;
    private post;
    transactionRequest(data: ITransaction): Promise<any>;
    dataRequest(data: ITransaction): Promise<any>;
    specification(paymentName: string, serviceVersion?: number, type?: RequestType): Promise<any>;
    specifications(paymentMethods: PaymentMethod[] | {
        name: string;
        version: Number;
    }[], type?: RequestType): Promise<any>;
    status(transactionKey: any): Promise<any>;
    cancelInfo(transactionKey: any): Promise<any>;
    refundInfo(transactionKey: any): Promise<any>;
    invoiceInfo(invoiceKey: any): Promise<any>;
}
export default Client;
