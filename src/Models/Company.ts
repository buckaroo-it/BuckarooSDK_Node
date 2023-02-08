import Person from "./Person";

export default interface Company extends Person {
  companyName?: string;
  vatApplicable?: boolean;
  varNumber?: string;
  chamberOfCommerce?: string;
}
