import {DataRequestData, Request} from "../Request";
import {HttpMethods, RequestTypes} from "../Constants";
import {ITransactionResponse, ServiceList, TransactionResponse} from "../Models";
export default class ActiveSubscriptions {
    private readonly _serviceCode: string = 'GetActiveSubscriptions';

    async get(){
        return this.buildRequest().request().then((response) => {
            return this.format(response.data);
        });
    }
    private buildRequest(){
        const data = new DataRequestData().setServiceList(new ServiceList({
            name: this._serviceCode,
            version: 1,
            action: this._serviceCode,
        }));
        return new Request(RequestTypes.Data, HttpMethods.POST,data,TransactionResponse)
    }
    private format(data:ITransactionResponse){
        let activeSubscriptions:IActiveSubscription[] = []
        const xmlData =  data.services?.[0].parameters[0].value;
        if(typeof xmlData === 'string'){
            let parseString = require('xml2js').parseString;

            parseString(xmlData,function (err:any, result:any) {
                activeSubscriptions = result['ServiceCurrencies'].map((service:any) => {
                    return {
                        serviceCode: service['ServiceCode'][0],
                        currencies: service['Currencies'][0]['string']
                    }
                });
            });
        }
        return activeSubscriptions
    }
}
export interface IActiveSubscription {
    serviceCode: string;
    currencies: string[];
}