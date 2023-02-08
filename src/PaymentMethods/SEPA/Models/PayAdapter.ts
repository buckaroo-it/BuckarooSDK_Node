import Model from "../../../Models/Model";
import BankAccount from "../../../Models/BankAccount";

export default class PayAdapter extends Model implements BankAccount {
  iban?: string;
  accountName?: string;
  bic?: string;
  constructor(data) {
    super();
    this.iban = data.iban;
    this.accountName = data.accountName;
    this.bic = data.bic;
    this.setKeys({
      bic: "customerbic",
      iban: "CustomerIBAN",
    });
  }
}
