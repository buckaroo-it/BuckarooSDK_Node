import Person from "../../../Models/Person";
import Model from "../../../Models/Model";

export default class Customer extends Model implements Person {
  firstName?: string;
  lastName?: string;

  constructor(data) {
    super();
    this.firstName = data.firstName;
    this.lastName = data.lastName;

    this.setKeys({
      firstName: "CustomerFirstName",
      lastName: "CustomerLastName",
    });
  }
}
