import RecipientCategory from "../../Constants/RecipientCategory";
import IPerson from "./IPerson";

export default interface ICompany extends IPerson{
    category: RecipientCategory.COMPANY
    companyName: string
    vatApplicable: boolean
    vatNumber: string
    chamberOfCommerce: string
}
