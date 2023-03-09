import { ServiceParameterList } from '../../../Utils/ServiceParameter'
import { ITransaction } from '../../../Models/ITransaction'

export interface IPaymentPlan extends ITransaction {
    includedInvoiceKey: string
    dossierNumber: string
    installmentCount: Number
    installmentAmount: Number
    initialAmount?: Number
    startDate: string
    interval: string
    paymentPlanCostAmount: Number
    paymentPlanCostAmountVat?: Number
    recipientEmail: string
}
export const paymentPlan = (data) => {
    return new ServiceParameterList({
        dossierNumber: data.dossierNumber,
        includedInvoiceKey: data.includedInvoiceKey,
        initialAmount: data.initialAmount,
        installmentAmount: data.installmentAmount,
        installmentCount: data.installmentCount,
        interval: data.interval,
        paymentPlanCostAmount: data.paymentPlanCostAmount,
        paymentPlanCostAmountVat: data.paymentPlanCostAmountVat,
        recipientEmail: data.recipientEmail,
        startDate: data.startDate
    })
}
