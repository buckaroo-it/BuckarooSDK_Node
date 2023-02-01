import Config from "../request/config";
import BuckarooClient from "../BuckarooClient";
import Endpoints from "../Constants/Endpoints";

export default class PaymentMethod {

    private readonly _api: BuckarooClient;
    public paymentName: string = '';
    private _serviceVersion: number = 0;

    private _requiredConfigFields: string[] = ['currency', 'pushURL'];
    get requiredFields(): string[] {
        return this._requiredConfigFields;
    }
    get serviceVersion(): number {
        return this._serviceVersion;
    }

    constructor(api:BuckarooClient) {
        this._api = api;
    }
    get api(): BuckarooClient {
        return this._api;
    }

    getEndpoint(path: string): string {
        let baseUrl = this.api.config?.isLiveMode() ? Endpoints.LIVE : Endpoints.TEST;

        return baseUrl + path;
    }
}
