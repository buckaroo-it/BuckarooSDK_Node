import RecipientCategory from "../../../Constants/RecipientCategory";

export interface Customer {
    birthDate?: string;
    careOf?: string;
    category: RecipientCategory
    city?: string;
    conversationLanguage?: 'Unknown' |'No'|'Sc'|'Se'|'Fi'|'Da'|'Dk'|'En'|'De'|'Nl'|'Fr'
    country?: 'Unknown' |'No'|'Se'|'Fi'|'De'|'Dk'|'At'|'Ch'|'Nl'|'Be'
    customerNumber?: string;
    email?: string;
    firstName?: string;
    identificationNumber?: string;
    lastName?: string;
    mobilePhone?: string;
    phone?: string;
    postalCode: string;
    salutation?: 'Unknown'|'Mr'|'Mrs'|'Miss'
    street?: string;
    streetNumber?: string;
    streetNumberAdditional?: string;
}