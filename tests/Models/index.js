import RecipientCategory from '../../src/Constants/RecipientCategory';
import { getIPAddress } from '../../src/Utils/Functions';
export const TestPerson = {
    birthDate: '1990-01-01',
    category: RecipientCategory.PERSON,
    culture: '321',
    firstName: 'John',
    gender: 'male',
    initials: 'R.T',
    lastName: 'Do',
    lastNamePrefix: 'testlastprefix',
    placeOfBirth: 't',
    title: 'title'
};
export const TestCompany = {
    category: RecipientCategory.COMPANY,
    careOf: 'test',
    chamberOfCommerce: 'test',
    companyName: 'testCompany',
    culture: 'culture',
    vatApplicable: false,
    vatNumber: '321'
};
export const TestAddress = {
    city: 'city',
    country: 'NL',
    houseNumber: '2313432',
    houseNumberAdditional: '324',
    state: 'state',
    street: 'street',
    zipcode: '32323'
};
export const TestArticle = {
    description: 'test',
    identifier: 'identifier',
    price: 10,
    quantity: 2,
    type: 'PhysicalArticle',
    unitCode: '23',
    vatCategory: '323',
    vatPercentage: 1
};
export const TestPhone = {
    fax: '23232',
    landline: '323123',
    mobile: '21312332'
};
export const TestEmail = 'test@hotmail.com';
export const TestBankAccount = {
    accountName: 'accountName',
    bic: 'bic',
    iban: 'iban'
};
export const TestBilling = {
    recipient: TestPerson,
    address: TestAddress,
    phone: TestPhone,
    email: TestEmail
};
export const TestIp = getIPAddress();
