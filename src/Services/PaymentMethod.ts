import { RequestTypes } from '../Constants';
import { IParameter, IRequest, IService, ServiceList, ServiceParameter } from '../Models';
import Buckaroo, { PaymentMethodInstance } from '../index';
import { Request, TransactionData } from '../Request';
import { ServiceCode } from '../Utils';

export default abstract class PaymentMethod {
    protected _serviceCode?: ServiceCode;
    protected _serviceVersion: number = 0;
    protected _payload: TransactionData = new TransactionData();
    protected _requiredFields: Array<keyof IRequest> = [];

    constructor(serviceCode?: ServiceCode) {
        this.setServiceCode((serviceCode ?? this._serviceCode) as ServiceCode);
    }

    get serviceVersion() {
        return this._serviceVersion;
    }

    set serviceVersion(value: number) {
        this._serviceVersion = value;
    }

    get serviceCode(): ServiceCode {
        return this._serviceCode ?? 'noservice';
    }

    public abstract defaultServiceCode(): ServiceCode;

    setServiceCode(value: ServiceCode): this {
        this._serviceCode = value;
        return this;
    }

    setPayload(payload?: IRequest) {
        this.setRequiredFields();
        this._payload.initialize(payload);
    }

    setServiceVersion(value: number): this {
        this._serviceVersion = value;
        return this;
    }

    getPayload(): Record<string, any> {
        return this._payload.getData();
    }

    getServiceList() {
        return this._payload.getServiceList();
    }

    combine<Name extends ServiceCode>(data: Name): PaymentMethodInstance<Name>;

    combine<Payload extends TransactionData>(data: Payload): this;

    combine<Method extends PaymentMethod>(method: Method): this;

    combine(data: any): this {
        if (typeof data === 'string') {
            const method: PaymentMethod = Buckaroo.Client.method(data as any);
            method.setPayload(this._payload);
            return method as any;
        }
        this.setPayload(data instanceof PaymentMethod ? data.getPayload() : data);
        return this;
    }

    public specification(
        type: RequestTypes.Transaction | RequestTypes.Data = RequestTypes.Data,
        serviceVersion: number = this.serviceVersion
    ) {
        return Request.Specification(type, { name: this.serviceCode, version: serviceVersion });
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

    protected transactionRequest(payload?: IRequest) {
        this.setPayload(payload);
        return Request.Transaction(this._payload);
    }

    protected dataRequest(payload?: IRequest) {
        this.setPayload(payload);
        return Request.DataRequest(this._payload);
    }
}
