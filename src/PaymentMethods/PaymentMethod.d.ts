import { TransactionRequest } from '../Models/Request';
import { IConfig } from '../Utils/Types';
import { Combinable } from '../Utils/Combinable';
import { ITransaction } from '../Models/ITransaction';
import { RequestType } from '../Constants/Endpoints';
import { TransactionResponse } from '../Models/TransactionResponse';
export default abstract class PaymentMethod {
    protected readonly _requiredFields: Array<keyof IConfig>;
    get requiredFields(): Array<keyof IConfig>;
    protected _paymentName: string;
    protected _serviceVersion: number;
    protected request: TransactionRequest;
    private _action;
    protected serviceParameters: {
        action?: string;
        name?: string;
        version?: number;
        parameters?: any;
    };
    protected servicesStrategy: (data: any) => object;
    get paymentName(): string;
    protected set paymentName(value: string);
    get serviceVersion(): number;
    protected get action(): string;
    protected set action(value: string);
    protected setServiceList(serviceList: object): void;
    protected setAdditionalParameters(additionalParameters?: AdditionalParameters): void;
    protected setRequiredFields(): void;
    protected transactionRequest(): Promise<any>;
    protected dataRequest(): Promise<TransactionResponse>;
    combine(method: Combinable): this;
    setRequest(data: ITransaction): void;
    specification(type?: RequestType): Promise<any>;
    private takeBasicParameters;
}
export declare interface AdditionalParameters {
    additionalParameters?: Array<any>;
}
