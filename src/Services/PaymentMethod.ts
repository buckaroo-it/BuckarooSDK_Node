import { RequestTypes } from '../Constants/Endpoints';
import IRequest from '../Models/IRequest';
import Buckaroo from '../index';
import Request from '../Request/Request';
import { IService, ServiceList } from '../Models/IServiceList';
import { ServiceParameter } from '../Models/ServiceParameters';
import { IParameter } from '../Models/IParameters';
import { DataRequestData, TransactionData } from '../Request/DataModels';
import { PaymentMethodInstanceType, PaymentMethodRegistryType, ServiceCode } from '../Utils/MethodTypes';
import { TransactionResponse } from '../Models/Response/TransactionResponse';
import { SpecificationRequestResponse } from '../Models/Response/SpecificationRequestResponse';

export default abstract class PaymentMethod<Code extends ServiceCode, Manually extends boolean = false> {
    public _isManually: Manually = false as Manually;
    protected _paymentName: string = '';
    protected _serviceCode?: Code;
    protected _serviceVersion: number = 0;
    protected _payload: TransactionData = new TransactionData();
    protected _requiredFields: Array<keyof IRequest> = [];

    constructor(serviceCode?: Code) {
        this._serviceCode = (serviceCode ?? this.paymentName) as Code;
    }

    get serviceVersion() {
        return this._serviceVersion;
    }

    set serviceVersion(value: number) {
        this._serviceVersion = value;
    }

    get serviceCode(): Code {
        return (this._serviceCode || 'noservice') as Code;
    }

    get paymentName() {
        return this._paymentName;
    }

    public manually(): PaymentMethodRegistryType<Code, true> {
        this._isManually = true as Manually;
        return this as any;
    }

    setServiceCode(value: ServiceCode): this {
        this._serviceCode = value as Code;
        return this;
    }

    setPayload(payload?: IRequest) {
        this.setRequiredFields();
        this._payload.initialize(payload);
    }

    getPayload(): Record<string, any> {
        return this._payload.getData();
    }

    getServiceList() {
        return this._payload.getServiceList();
    }

    combine<Name extends ServiceCode>(data: Name): PaymentMethodInstanceType<Name>;

    combine<Payload extends TransactionData>(data: Payload): this;

    combine<Method extends PaymentMethod<Code>>(method: Method): this;

    combine(data: any): this {
        if (typeof data === 'string') {
            const method: PaymentMethod<Code> = Buckaroo.Client.method(data as any);
            method.setPayload(this._payload);
            return method as any;
        }
        this.setPayload(data instanceof PaymentMethod ? data.getPayload() : data);
        return this;
    }

    public specification(
        type: RequestTypes.Transaction | RequestTypes.Data = RequestTypes.Data
    ): this['_isManually'] extends true ? any : Promise<SpecificationRequestResponse> {
        const request = Request.Specification(type, { name: this.serviceCode, version: this.serviceVersion });

        if (this._isManually) {
            return request as any;
        }

        return request.request() as any;
    }

    protected setRequiredFields(requiredFields: Array<keyof IRequest> = this._requiredFields) {
        for (const fieldKey of requiredFields) {
            let field = this._payload[fieldKey] ?? (Buckaroo.Client.config as IRequest)[fieldKey];
            if (field === undefined) {
                throw new Error(`Missing required config parameter ${String(fieldKey)}`);
            }
            this._payload[fieldKey] = field;
        }
        return this;
    }

    protected setServiceList(
        action: string,
        serviceParameters?: IParameter[] | ServiceParameter,
        serviceCode = this.serviceCode,
        serviceVersion = this.serviceVersion
    ) {
        const service: IService = {
            name: serviceCode,
            action: action,
            version: serviceVersion,
            parameters:
                serviceParameters instanceof ServiceParameter ? serviceParameters.toParameterList() : serviceParameters,
        };
        if (this.getServiceList() instanceof ServiceList) {
            this.getServiceList()!.addService(service);
        } else {
            this._payload.setServiceList(new ServiceList(service));
        }
        return this;
    }

    protected transactionRequest(
        payload?: IRequest
    ): this['_isManually'] extends true
        ? Request<typeof TransactionResponse, TransactionData>
        : Promise<TransactionResponse> {
        this.setPayload(payload);
        const request = Request.Transaction(this._payload);

        if (this._isManually) {
            return request as any;
        }

        return request.request() as any;
    }

    protected dataRequest(
        payload?: IRequest
    ): this['_isManually'] extends true
        ? Request<typeof TransactionResponse, DataRequestData>
        : Promise<TransactionResponse> {
        this.setPayload(payload);
        const request = Request.DataRequest(this._payload);

        if (this._isManually) {
            return request as any;
        }

        return request.request() as any;
    }
}