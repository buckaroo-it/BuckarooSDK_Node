import { ITransaction } from '../../../Models/ITransaction'
import CreditManagementInstallmentInterval from '../../../Constants/CreditManagementInstallmentInterval'

export interface IPaymentPlan extends ITransaction {
    includedInvoiceKey: string
    dossierNumber: string
    installmentCount: number
    installmentAmount: number
    initialAmount?: number
    startDate: string
    interval: CreditManagementInstallmentInterval
    paymentPlanCostAmount: number
    paymentPlanCostAmountVat?: number
    recipientEmail: string
}
