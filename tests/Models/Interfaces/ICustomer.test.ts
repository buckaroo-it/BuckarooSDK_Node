import { Article, BankAccount, Company, Customer, Debtor, Email, Person, Phone, RecipientCategory } from '../../../src';

describe('Testing shared customer models', () => {
    test('formats personal and company recipients inside a customer', () => {
        const customer = new Customer({
            email: 'test@example.com',
            address: { street: 'Main', houseNumber: '1', zipcode: '1234AB', city: 'City', country: 'NL' },
            phone: { mobile: '0612345678', fax: '0123', landline: '0456' },
            recipient: {
                category: RecipientCategory.PERSON,
                birthDate: '2000-01-01',
                careOf: 'Care',
                culture: 'nl-NL',
                firstName: 'Test',
                gender: 'male',
                initials: 'T',
                lastName: 'Person',
                lastNamePrefix: 'van',
                placeOfBirth: 'City',
                title: 'Mr',
            },
        });
        expect(customer.getData()).toEqual({
            Email: 'test@example.com',
            Address: { Street: 'Main', HouseNumber: '1', Zipcode: '1234AB', City: 'City', Country: 'NL' },
            Phone: { Mobile: '0612345678', Fax: '0123', Landline: '0456' },
            Recipient: {
                Category: RecipientCategory.PERSON,
                BirthDate: '2000-01-01',
                CareOf: 'Care',
                Culture: 'nl-NL',
                FirstName: 'Test',
                Gender: 'male',
                Initials: 'T',
                LastName: 'Person',
                LastNamePrefix: 'van',
                PlaceOfBirth: 'City',
                Title: 'Mr',
            },
        });
        customer.recipient = {
            category: RecipientCategory.COMPANY,
            companyName: 'Shop',
            culture: 'en-US',
            vatApplicable: false,
            vatNumber: 'NL123',
            chamberOfCommerce: '123',
        };
        expect(customer.getData().Recipient).toEqual({
            Category: RecipientCategory.COMPANY,
            CompanyName: 'Shop',
            Culture: 'en-US',
            VatApplicable: false,
            VatNumber: 'NL123',
            ChamberOfCommerce: '123',
        });
    });
    test('preserves bank, contact and article fields', () => {
        expect(new BankAccount({ iban: 'NL00TEST', bic: 'TESTNL2A', accountName: 'Test' }).getData()).toEqual({
            Iban: 'NL00TEST',
            Bic: 'TESTNL2A',
            AccountName: 'Test',
        });
        expect(new Email({ email: 'test@example.com' }).getData()).toEqual({ Email: 'test@example.com' });
        expect(new Phone({ mobile: '012', landline: '034', fax: '056' }).getData()).toEqual({
            Mobile: '012',
            Landline: '034',
            Fax: '056',
        });
        expect(new Debtor({ code: 'debtor-1' }).getData()).toEqual({ Code: 'debtor-1' });
        expect(new Person({ firstName: 'Test' }).set('name', 'Test Person').getData()).toMatchObject({
            FirstName: 'Test',
            Name: 'Test Person',
        });
        expect(new Company({ companyName: 'Shop' }).getData()).toEqual({ CompanyName: 'Shop' });
        expect(
            new Article({
                identifier: 'SKU',
                type: 'PhysicalArticle',
                brand: 'Brand',
                manufacturer: 'Maker',
                unitCode: 'pcs',
                price: 10,
                quantity: 2,
                vatPercentage: 21,
                vatCategory: 'High',
                description: 'Test item',
            }).getData()
        ).toEqual({
            Identifier: 'SKU',
            Type: 'PhysicalArticle',
            Brand: 'Brand',
            Manufacturer: 'Maker',
            UnitCode: 'pcs',
            Price: 10,
            Quantity: 2,
            VatPercentage: 21,
            VatCategory: 'High',
            Description: 'Test item',
        });
    });
});
