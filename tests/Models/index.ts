import {
    Gender,
    getIPAddress,
    IAddress,
    IArticle,
    IBankAccount,
    ICompany,
    IPerson,
    IPhone,
    RecipientCategory,
    uniqid,
} from '../../src';

export const TestPerson: IPerson = {
    birthDate: '01-01-1990',
    category: RecipientCategory.PERSON,
    culture: 'nl-NL',
    firstName: 'John',
    gender: 'male',
    initials: 'R.T',
    lastName: 'Doe',
    // lastNamePrefix: 'van',
    placeOfBirth: 'Amsterdam',
    title: 'Mr.',
    customerNumber: uniqid(),
};
export const TestCompany: ICompany = {
    category: RecipientCategory.COMPANY,
    careOf: 'Test',
    chamberOfCommerce: '12345678',
    companyName: 'Test Company BV',
    culture: 'nl-NL',
    vatApplicable: false,
    vatNumber: 'NL123456789B01',
};
export const TestAddress: IAddress = {
    city: 'Amsterdam',
    country: 'NL',
    houseNumber: '123',
    houseNumberAdditional: 'A',
    // state: 'Netherland',
    street: 'Hoftstraat',
    zipcode: '1015CJ',
};
export const TestArticle: IArticle = {
    description: 'Test Product',
    identifier: 'ABC123',
    price: 40.10,
    quantity: 2,
    type: 'PhysicalArticle',
    unitCode: '123',
    vatCategory: '1',
    vatPercentage: 21,
};

export const TestPhone: IPhone = {
    // fax: '0207654321',
    landline: '0201234567',
    mobile: '0612345678',
};
export const TestEmail = 'test@buckaroo.nl';
export const TestBankAccount: IBankAccount = {
    accountName: 'John Doe',
    bic: 'ABNANL2A',
    iban: 'NL91ABNA0417164300',
};
export const TestBilling = {
    recipient: TestPerson,
    address: TestAddress,
    phone: TestPhone,
    email: TestEmail,
};

export const TestCustomer = {
    identificationNumber: uniqid(),
    gender: Gender.FEMALE,
    culture: TestPerson.culture,
    initials: TestPerson.initials,
    lastName: TestPerson.lastName,
    firstName: TestPerson.firstName,
    birthDate: TestPerson.birthDate,
};

export const TestIp = getIPAddress();
