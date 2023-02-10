// import Payload from "./Payload";

import PayForm from "./PayForm";

export default class Transaction {
  constructor(method, TransactionType) {
    this.setProperties( method, TransactionType);
  }

  setProperties(method, TransactionType:PayForm) {
    for (const datum of method.requiredConfigFields) {
      this[datum] = method.api.config[datum] ? method.api.config[datum] : "";
    }
    for (const methodKey in TransactionType) {
      this[methodKey] = TransactionType[methodKey]
    }
    console.log(this,TransactionType.services?.ServiceList[0].parameters)

    throw new Error('ASADASD')
    // this.setServices(
    //     this.paymentName,this.serviceVersion,action,modelObject
    // )

  }
}
