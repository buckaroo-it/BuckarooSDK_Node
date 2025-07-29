import buckarooClientTest from '../BuckarooClient.test';
import { PaymentMethodInstance, uniqid } from '../../src';

let method: PaymentMethodInstance<'thunes'>;

beforeEach(() => {
    method = buckarooClientTest.method('thunes');
});

// 'thunes' is not a valid service name.
describe('Thunes methods', () => {
    test.only('authorize', async () => {
        const response = await method
            .authorize({
                amountDebit: 10.0,
                order: uniqid(),
                invoice: uniqid(),
                name: 'monizzeecovoucher',
                articles: [
                    {
                        identifier: 'Articlenumber1',
                        description: 'Articledesciption1',
                        price: '1',
                    },
                    {
                        identifier: 'Articlenumber2',
                        description: 'Articledesciption2',
                        price: '2',
                    },
                ],
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('capture', async () => {
        const response = await method
            .capture({ amountDebit: 100, originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('getStatus', async () => {
        const response = await method
            .getStatus({ originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('cancel', async () => {
        const response = await method.cancel({ originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' }).request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
