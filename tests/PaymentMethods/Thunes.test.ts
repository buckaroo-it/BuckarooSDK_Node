import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src';

const method = buckarooClientTest.method('thunes');

describe('Thunes methods', () => {
    test('authorize', async () => {
        return method
            .authorize({
                amountDebit: 100,
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
            .request()
            .then((res) => {
                expect(res.httpResponse.status).toEqual(200);
            });
    });
    test('capture', async () => {
        return method
            .capture({ amountDebit: 100, originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' })
            .request()
            .then((res) => {
                expect(res.httpResponse.status).toEqual(200);
            });
    });
    test('getStatus', async () => {
        return method
            .getStatus({ originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' })
            .request()
            .then((res) => {
                expect(res.httpResponse.status).toEqual(200);
            });
    });
    test('cancel', async () => {
        return method
            .cancel({ originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' })
            .request()
            .then((res) => {
                expect(res.httpResponse.status).toEqual(200);
            });
    });
});
