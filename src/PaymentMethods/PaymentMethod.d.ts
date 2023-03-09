import { TransactionRequest } from '../Models/Request';
import { IConfig } from '../Utils/Types';
import { ServiceParameterList } from "../Utils/ServiceParameter";
import { Combinable } from "../Utils/Combinable";
import { ITransaction } from "../Models/ITransaction";
import { RequestType } from "../Constants/Endpoints";
export default abstract class PaymentMethod {
    protected readonly requiredFields: Array<keyof IConfig>;
    protected _paymentName: string;
    protected _serviceVersion: number;
    protected request: TransactionRequest;
    private _action;
    protected services: (data: any) => ServiceParameterList;
    get paymentName(): string;
    get serviceVersion(): number;
    get action(): string;
    set action(value: string);
    protected setServiceList(serviceList: ServiceParameterList): void;
    protected setAdditionalParameters(additionalParameters?: AdditionalParameters): void;
    protected setRequiredFields(): void;
    protected transactionRequest(): Promise<any>;
    protected dataRequest(): Promise<any>;
    combine(method: Combinable): this;
    setRequest(data: ITransaction): void;
    specification(type?: RequestType): Promise<any>;
}
export declare interface AdditionalParameters {
    additionalParameters?: Array<any>;
}
