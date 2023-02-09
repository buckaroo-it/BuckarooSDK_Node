import PersonModel from "../../../Models/Person";
import Model from "../../../Models/Model";

export default class Customer extends Model implements PersonModel {
  category?: string;
  gender?: string;
  culture?: string;
  careOf?: string;
  title?: string;
  initials?: string;
  name?: string;
  firstName?: string;
  lastNamePrefix?: string;
  lastName?: string;
  birthDate?: string;
  constructor(data) {
    super();
    this.category = data.category;
    this.gender = data.gender;
    this.culture = data.culture;
    this.careOf = data.careOf;
    this.title = data.title;
    this.initials = data.initials;
    this.name = data.name;
    this.firstName = data.firstName;
    this.PrefixLastName = data.lastNamePrefix;
    this.lastName = data.lastName;
    this.birthDate = data.birthDate;

    for (let dataKey in this) {
      if (!this[dataKey]) {
        delete this[dataKey];
      }
    }

    this.setKeys({
      lastNamePrefix: "PrefixLastName",
      birthDate: "DateOfBirth",
    });
  }
}
