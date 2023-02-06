import PersonModel from "../../../Models/Person";

export default class Customer implements PersonModel {
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
  placeOfBirth?: string;
  constructor(data) {
    this.category = data.category;
    this.gender = data.gender;
    this.culture = data.culture;
    this.careOf = data.careOf;
    this.title = data.title;
    this.initials = data.initials;
    this.name = data.name;
    this.firstName = data.firstName;
    this.lastNamePrefix = data.lastNamePrefix;
    this.lastName = data.lastName;
    this.birthDate = data.birthDate;
    this.placeOfBirth = data.placeOfBirth;

    this.setKeys();
  }

  setKeys() {
    const keys: any = {
      lastNamePrefix: "PrefixLastName",
      birthDate: "DateOfBirth",
    };

    for (let dataKey in this) {
      if (keys[dataKey]) {
        this[keys[dataKey]] = this[dataKey];
        delete this[dataKey];
      }
      if (!this[dataKey]) {
        delete this[dataKey];
      }
    }
  }
}
