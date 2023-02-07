import BankAccountModel from "../../../Models/BankAccount";
import Model from "../../../Models/Model";
export default class BankAccount extends Model implements BankAccountModel {
  iban?: string;
  accountName?: string;
  bic?: string;
  constructor(data) {
    super();
    this.iban = data.iban;
    this.accountName = data.accountName;
    this.bic = data.bic;

    this.setKeys({
      accountName: "customeraccountname",
    });
  }
}
