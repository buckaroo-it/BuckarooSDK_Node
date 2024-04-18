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
    birthDate: '1990-01-01',
    category: RecipientCategory.PERSON,
    culture: '321',
    firstName: 'John',
    gender: 'male',
    initials: 'R.T',
    lastName: 'Do',
    lastNamePrefix: 'testlastprefix',
    placeOfBirth: 't',
    title: 'title',
};
export const TestCompany: ICompany = {
    category: RecipientCategory.COMPANY,
    careOf: 'test',
    chamberOfCommerce: 'test',
    companyName: 'testCompany',
    culture: 'culture',
    vatApplicable: false,
    vatNumber: '321',
};
export const TestAddress: IAddress = {
    city: 'city',
    country: 'NL',
    houseNumber: '2313432',
    houseNumberAdditional: '324',
    state: 'state',
    street: 'street',
    zipcode: '32323',
};
export const TestArticle: IArticle = {
    description: 'test',
    identifier: 'identifier',
    price: 10,
    quantity: 2,
    type: 'PhysicalArticle',
    unitCode: '23',
    vatCategory: '323',
    vatPercentage: 1,
};

export const TestPhone: IPhone = {
    fax: '23232',
    landline: '323123',
    mobile: '21312332',
};
export const TestEmail = 'test@hotmail.com';
export const TestBankAccount: IBankAccount = {
    accountName: 'accountName',
    bic: 'bic',
    iban: 'iban',
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
    birthDate: '1990-01-01',
};

export const TestIp = getIPAddress();
