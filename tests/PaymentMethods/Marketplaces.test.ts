import buckarooClientTest from '../BuckarooClient.test';

const marketplaces = buckarooClientTest.method('marketplaces');
const ideal = buckarooClientTest.method('ideal');

describe('Testing Marketplaces methods', () => {
    test('Split', async () => {
        marketplaces.split({
            description: 'INV0001',
            daysUntilTransfer: 2,
            marketplace: {
                amount: 10,
                description: '',
            },
            sellers: [
                {
                    accountId: '789C60F316D24B088ACD471',
                    amount: 50,
                    description: '',
                },
                {
                    accountId: '369C60F316D24B088ACD238',
                    amount: 45,
                    description: '',
                },
            ],
        });
        return ideal
            .combine(marketplaces.getPayload())
            .pay({
                issuer: 'ABNANL2A',
                amountDebit: 95,
            })
            .request()
            .then((response) => {
                expect(response.isValidationFailure()).toBeTruthy();
            });
    });
    test('transfer', async () => {
        marketplaces
            .transfer({
                originalTransactionKey: 'D3732474ED0',
                marketplace: {
                    amount: 10,
                    description: 'INV0001 Commission Marketplace',
                },
                sellers: [
                    {
                        accountId: '789C60F316D24B088ACD471',
                        amount: 50,
                        description: 'INV001 Payout Make-Up Products BV',
                    },
                ],
            })
            .request()
            .then((response) => {
                expect(response.isValidationFailure()).toBeTruthy();
            });
    });
    test('refundSupplementary', async () => {
        marketplaces.refundSupplementary({
            sellers: [
                {
                    accountId: '789C60F316D24B088ACD471',
                    description: 'INV001 Payout Make-Up Products BV',
                },
            ],
        });
        ideal
            .combine(marketplaces)
            .refund({ originalTransactionKey: 'dasda', amountCredit: 10 })
            .request()
            .then((response) => {
                expect(response.isValidationFailure()).toBeTruthy();
            });
    });
});
