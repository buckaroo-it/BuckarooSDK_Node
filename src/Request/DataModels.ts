import IRequest from '../Models/IRequest';
import { Model } from '../Models/Model';
import { ClientIP } from '../Constants/IPProtocolVersion';
import { DataFormatter } from '../Utils/Functions';
import { ServiceCode } from '../Utils/MethodTypes';
import { IService, ServiceList } from '../Models/IServiceList';
import { IAdditionalParameters } from '../Models/IParameters';

export class TransactionData extends Model implements IRequest {
    constructor(data?: IRequest) {
        super(data);
    }
    set clientUserAgent(value: string) {
        this.set('clientUserAgent', value);
    }
    set order(order: string) {
        this.set('order', order);
    }
    set invoice(invoice: string) {
        this.set('invoice', invoice);
    }
    set description(description: string) {
        this.set('description', description);
    }
    set amountCredit(amountCredit: number) {
        this.set('amountCredit', amountCredit);
    }
    set amountDebit(amountDebit: number) {
        this.set('amountDebit', amountDebit);
    }
    set currency(currency: string) {
        this.set('currency', currency);
    }
    set clientIP(ipAddress: string) {
        this.set('clientIP', new ClientIP(ipAddress));
    }
    set additionalParameters(value: IAdditionalParameters) {
        this.set('additionalParameters', {
            AdditionalParameter: DataFormatter.parametersMap(value),
        });
    }
    set customParameters(value: IAdditionalParameters) {
        this.set('customParameters', {
            List: DataFormatter.parametersMap(value),
        });
    }
    set pushURL(pushURL: string) {
        this.set('pushURL', pushURL);
    }
    set continueOnIncomplete(value: boolean) {
        this.set('continueOnIncomplete', value ? 1 : 0);
    }
    set culture(value: string) {
        this.set('culture', value);
    }
    set originalTransactionKey(value: string) {
        this.set('originalTransactionKey', value);
    }
    set originalTransactionReference(value: { type: string; reference: string }) {
        this.set('originalTransactionReference', value);
    }
    set pushURLFailure(value: string) {
        this.set('pushURLFailure', value);
    }
    set returnURL(value: string) {
        this.set('returnURL', value);
    }
    set returnURLCancel(value: string) {
        this.set('returnURLCancel', value);
    }
    set returnURLError(value: string) {
        this.set('returnURLError', value);
    }
    set returnURLReject(value: string) {
        this.set('returnURLReject', value);
    }
    set servicesExcludedForClient(services: ServiceCode[] | string) {
        this.set('servicesExcludedForClient', Array.isArray(services) ? services?.join(',') : services);
    }
    get servicesSelectableByClient() {
        return '';
    }
    set servicesSelectableByClient(services: ServiceCode[] | string) {
        this.set('servicesSelectableByClient', Array.isArray(services) ? services?.join(',') : services);
    }
    set startRecurrent(value: boolean) {
        this.set('startRecurrent', value);
    }
    getServiceList(): ServiceList | undefined {
        return this.get('services');
    }
    setServiceList(services: ServiceList | undefined) {
        return this.set('services', services);
    }
}
export class DataRequestData extends TransactionData {
    set additionalParameters(parameters: IAdditionalParameters) {
        this.set('additionalParameters', {
            List: DataFormatter.parametersMap(parameters),
        });
    }
}
export class SpecificationRequestData extends Model {
    constructor(data?: IService[]) {
        super({ services: data });
    }
    set services(data: IService[]) {
        this.set(
            'services',
            data.map((service) => {
                return {
                    Name: service.name,
                    Version: service.version,
                };
            })
        );
    }
}
