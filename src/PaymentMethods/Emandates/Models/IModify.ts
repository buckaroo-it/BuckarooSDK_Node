import {ITransaction} from "../../../Models/ITransaction";

interface Modify extends Omit<ITransaction,'continueOnIncomplete'> {
    originalMandateId:string
    debtorBankId?:string
}
export type IModify = Modify & ({ debtorBankId:string } | Required<Pick<ITransaction, 'continueOnIncomplete'>>)