import BankAccount from "./BankAccount";
export default class Verify {
  bankAccount = (data) => this.bankAccountFormat(data);

  bankAccountFormat(data) {
    return {
      data: new BankAccount(data),
      groupType: "",
      groupID: "",
    };
  }
}
