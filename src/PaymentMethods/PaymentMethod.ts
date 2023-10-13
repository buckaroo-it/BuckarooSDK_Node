import { RequestTypes } from '../Constants/Endpoints';
import IRequest from '../Models/IRequest';
import Buckaroo from '../index';
import Request from '../Request/Request';
import {IService, ServiceList} from '../Models/IServiceList';
import { ServiceParameter } from '../Models/ServiceParameters';
import { IParameter } from '../Models/IParameters';
import { TransactionData } from '../Request/DataModels';
import {MethodFromServiceCode, ServiceCode} from "../Utils/MethodTypes";

export default abstract class PaymentMethod {
    protected _paymentName: string = '';
    protected _serviceCode?: string;
    protected _serviceVersion: number = 0;
    protected _payload: TransactionData = new TransactionData();
    protected _requiredFields: Array<keyof IRequest> = [];
    constructor(serviceCode?: string) {
        this._serviceCode = serviceCode ?? this.paymentName;
    }
    get serviceVersion() {
        return this._serviceVersion;
    }
    set serviceVersion(value: number) {
        this._serviceVersion = value;
    }
    get serviceCode() {
        return this._serviceCode || '';
    }
    get paymentName() {
        return this._paymentName;
    }
    protected setRequiredFields(requiredFields: Array<keyof IRequest> = this._requiredFields) {
        for (const fieldKey of requiredFields) {
            let field = this._payload[fieldKey] ?? Buckaroo.Client.config[fieldKey];
            if (field === undefined) {
                throw new Error(`Missing required config parameter ${String(fieldKey)}`);
            }
            this._payload[fieldKey] = field;
        }
        return this;
    }
    setPayload(payload?: IRequest) {
        this.setRequiredFields();
        this._payload.initialize(payload);
    }
    getPayload():Record<string,any> {
        return this._payload.getData();
    }
    protected setServiceList(action: string, serviceParameters?: IParameter[] | ServiceParameter, serviceCode = this.serviceCode, serviceVersion = this.serviceVersion) {
        const service:IService = {
            name: serviceCode,
            action: action,
            version: serviceVersion,
            parameters: serviceParameters instanceof ServiceParameter ? serviceParameters.toParameterList() : serviceParameters,
        };
        if (this.getServiceList() instanceof ServiceList) {
            this.getServiceList()!.addService(service);
        } else {
            this._payload.setServiceList(new ServiceList(service));
        }
        return this;
    }
    getServiceList() {
        return this._payload.getServiceList();
    }
    protected transactionRequest(payload?: IRequest) {
        this.setPayload(payload);
        return Request.Transaction(this._payload);
    }
    protected dataRequest(payload?: IRequest) {
        this.setPayload(payload);
        return Request.DataRequest(this._payload);
    }
    public specification(type: RequestTypes.Transaction | RequestTypes.Data = RequestTypes.Data) {
        return Request.Specification(type, { name: this.serviceCode, version: this.serviceVersion });
    }

    combine<Name extends ServiceCode>(data: Name): MethodFromServiceCode<Name>;
    combine<Payload extends TransactionData>(data: Payload): this;
    combine<Method extends PaymentMethod>(method: Method): this;
    combine(data): this {
        if(typeof data === "string") {
            const method:PaymentMethod = Buckaroo.Client.method(data as any)
            method.setPayload(this._payload);
            return method as any
        }
        this.setPayload(data instanceof PaymentMethod ? data.getPayload() : data);
        return this;
    }
}
