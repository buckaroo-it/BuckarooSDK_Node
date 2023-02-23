import {TransactionRequest} from "../Models/Request";
import {IConfig} from "../Utils/Types";


export default abstract class PaymentMethod {
    // protected serviceParameters: Array<string> = []
    protected readonly requiredFields: Array<keyof IConfig> = ['currency', 'pushURL']
    protected _paymentName = ''
    protected _serviceVersion = 0
    protected request: TransactionRequest = new TransactionRequest

    private _action = ''
    get paymentName(): string {
        return this._paymentName;
    }

    get serviceVersion(): number {
        return this._serviceVersion;
    }
    get action(): string {
        return this._action;
    }
    set action(value: string) {
        this._action = value;
    }
}
