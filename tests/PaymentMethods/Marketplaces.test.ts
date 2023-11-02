import buckarooClientTest from '../BuckarooClient.test';
import { uniqid } from '../../src';

const marketplaces = buckarooClientTest.method('marketplaces');
const ideal = buckarooClientTest.method('ideal');

describe('Testing Marketplaces methods', () => {
    test('Split', async () => {
        const marketplacesResponse = marketplaces.manually().split({
            description: 'INV0001',
            daysUntilTransfer: 2,
            marketplace: {
                amount: 10,
                description: '',
            },
            sellers: [
                {
                    accountId: 'XXXXXXXXXXXXXXXXXXXXXXXX',
                    amount: 50,
                    description: '',
                },
                {
                    accountId: 'XXXXXXXXXXXXXXXXXXXXXXXX',
                    amount: 45,
                    description: '',
                },
            ],
        });
        return ideal
            .combine(marketplacesResponse.data)
            .pay({
                issuer: 'ABNANL2A',
                amountDebit: 100,
            })
            .then((response) => {
                expect(response.isValidationFailure()).toBeTruthy();
            });
    });
    test('transfer', async () => {
        marketplaces
            .transfer({
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                marketplace: {
                    amount: 10,
                    description: 'INV0001 Commission Marketplace',
                },
                sellers: [
                    {
                        accountId: 'XXXXXXXXXXXXXXXXXXXXXXXX',
                        amount: 50,
                        description: 'INV001 Payout Make-Up Products BV',
                    },
                ],
            })
            .then((response) => {
                expect(response.isValidationFailure()).toBeTruthy();
            });
    });
    test('refundSupplementary', async () => {
        const marketplacesResponse = marketplaces.manually().refundSupplementary({
            sellers: [
                {
                    accountId: 'XXXXXXXXXXXXXXXXXXXXXXXX',
                    description: 'INV001 Payout Make-Up Products BV',
                },
            ],
        });
        ideal
            .combine(marketplacesResponse.data)
            .refund({
                invoice: uniqid(),
                originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                amountCredit: 0.01,
            })
            .then((response) => {
                expect(response.isValidationFailure()).toBeTruthy();
            });
    });
});
