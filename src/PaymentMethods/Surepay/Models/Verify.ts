import {ITransaction} from "../../../Models/ITransaction";
import IBankAccount from "../../../Models/Services/IBankAccount";

export interface IVerify extends ITransaction{
    bankAccount: Required<Omit<IBankAccount,'bic'>>
}
export const Verify = (data:IVerify) => {
  return {
      iban: data.bankAccount.iban,
      customeraccountname: data.bankAccount.accountName,
  }
}