import { PayForm } from '../Models/PayForm'
import client from '../Request/Client'
import { IConfig } from '../Utils/Types'
import { ITransactionData } from '../Models/TransactionData'

export default class PaymentMethod {
    protected readonly paymentName: string
    protected readonly serviceVersion: number
    protected readonly requiredFields: Array<keyof IConfig>

    protected constructor(config: {
        paymentName: string
        serviceVersion?: number
        requiredFields?: Array<keyof IConfig>
    }) {
        this.paymentName = config.paymentName
        this.serviceVersion = config.serviceVersion ?? 0
        this.requiredFields = config.requiredFields ?? ['currency', 'pushURL']
    }

    async pay(data: ITransactionData, services?, action = 'Pay'): Promise<any> {
        const Transaction = new PayForm(data)
            .setServices(this.paymentName, this.serviceVersion, action, services)
            .setRequired(this.requiredFields)

        return await client.post(Transaction, client.getTransactionUrl())
    }

    public static fromName(name: string) {
        return new PaymentMethod({
            paymentName: name
        })
    }
}
