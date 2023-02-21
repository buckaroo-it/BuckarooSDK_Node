// import BuckarooClient from '../../BuckarooClient'
// import PaymentMethod from '../PaymentMethod'
// import SubscriptionsModel from './Models/Subscriptions'
//
// export default class Subscriptions extends PaymentMethod {
//   protected requiredConfigFields: string[] = []
//   public serviceVersion = 1
//   constructor (api: BuckarooClient) {
//     super(api)
//     this.paymentName = 'Subscriptions'
//     this.requiredConfigFields = this.requiredConfigFields.concat(
//       this.requiredFields
//     )
//   }
//
//   async create (model?) {
//     await this.api.client.post(
//       new Payload().setServices(
//         model,
//         this.paymentName,
//         this.serviceVersion,
//         'CreateSubscription',
//         new SubscriptionsModel()
//       ),
//       this.api.client.getDataRequestUrl()
//     )
//   }
//
//   async createCombined (model?) {
//     await this.api.client.post(
//       new Payload().setServices(
//         model,
//         this.paymentName,
//         this.serviceVersion,
//         'CreateCombinedSubscription',
//         new SubscriptionsModel()
//       ),
//       this.api.client.getDataRequestUrl()
//     )
//   }
//
//   async manually (model?) {
//     await this.api.client.post(
//       new Transaction(model, this, 'Pay', new SubscriptionsModel()),
//       this.api.client.getTransactionUrl()
//     )
//   }
//
//   async combine (model?) {
//     await this.api.client.post(
//       new Transaction(model, this, 'Pay', new SubscriptionsModel()),
//       this.api.client.getTransactionUrl()
//     )
//   }
//
//   async update (model?) {
//     await this.api.client.post(
//       new Transaction(model, this, 'Pay', new SubscriptionsModel()),
//       this.api.client.getTransactionUrl()
//     )
//   }
//
//   async stop (model?) {
//     await this.api.client.post(
//       new Transaction(model, this, 'Pay', new SubscriptionsModel()),
//       this.api.client.getTransactionUrl()
//     )
//   }
//
//   async info (model?) {
//     await this.api.client.post(
//       new Transaction(model, this, 'Pay', new SubscriptionsModel()),
//       this.api.client.getTransactionUrl()
//     )
//   }
//
//   async deletePaymentConfig (model?) {
//     await this.api.client.post(
//       new Transaction(model, this, 'Pay', new SubscriptionsModel()),
//       this.api.client.getTransactionUrl()
//     )
//   }
//
//   async pause (model?) {
//     await this.api.client.post(
//       new Transaction(model, this, 'Pay', new SubscriptionsModel()),
//       this.api.client.getTransactionUrl()
//     )
//   }
//
//   async resume (model?) {
//     await this.api.client.post(
//       new Transaction(model, this, 'Pay', new SubscriptionsModel()),
//       this.api.client.getTransactionUrl()
//     )
//   }
// }
