import PaymentMethod from "../PaymentMethod";
import {IConfig} from "../../Utils/Types";
import {ICreate} from "./Models/ICreate";
import {IModify} from "./Models/IModify";

export default class Emandates extends PaymentMethod{
    protected _paymentName = 'emandate'

    combinable = true
    _requiredFields:Array<keyof IConfig> = ['currency']

    issuerList(){
        this.action = 'GetIssuerList'
        return this.dataRequest()
    }
    createMandate(payload:ICreate){
        this.action = 'CreateMandate'
        return this.dataRequest(payload)
    }
    status(payload:{mandateId:string}){
        this.action = 'GetStatus'
        return this.dataRequest(payload)
    }
    modifyMandate(payload:IModify){
        this.action = 'ModifyMandate'
        return this.dataRequest(payload)
    }
    cancelMandate(payload:{mandateId:string, purchaseId:string}){
        this.action = 'CancelMandate'
        return this.dataRequest(payload)
    }
}