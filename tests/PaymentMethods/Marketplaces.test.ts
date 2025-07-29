import buckarooClientTest from '../BuckarooClient.test';
import { IRefundRequest, PaymentMethodInstance, uniqid } from '../../src';
import { createRefundPayload } from '../Payloads';

let marketplaces: PaymentMethodInstance<'marketplaces'>;
let ideal: PaymentMethodInstance<'ideal'>;

beforeEach(() => {
    marketplaces = buckarooClientTest.method('marketplaces');
    ideal = buckarooClientTest.method('ideal');
});

describe('Testing Marketplaces methods', () => {
    test('Split', async () => {
        const marketplacesResponse = await marketplaces.split({
            description: 'INV0001',
            daysUntilTransfer: 5,
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
                {
                    accountId: '369C60F316D24B088ACD238',
                    amount: 35,
                    description: 'INV0001 Payout Beauty Products BV',
                },
            ],
        });
        const response = await ideal
            .combine(marketplacesResponse.data)
            .pay({
                invoice: uniqid(),
                issuer: 'ABNANL2A',
                amountDebit: 95,
            })
            .request();
        expect(response.isWaitingOnUserInput()).toBeTruthy();
    });
    test.only('transfer', async () => {
        const response = await marketplaces
            .transfer({
                originalTransactionKey: 'DD58418EBE124DEB9E887EC059C729D5',
                marketplace: {
                    amount: 10,
                    description: 'INV0001 Commission Marketplace',
                },
                sellers: [
                    {
                        accountId: '789C60F316D24B088ACD471',
                        amount: 10,
                        description: 'INV001 Payout Make-Up Products BV',
                    },
                ],
            })
            .request();

        expect(response.isSuccess()).toBeTruthy();
    });
    test('refundSupplementary', async () => {
        const marketplacesResponse = await marketplaces.refundSupplementary({
            sellers: [
                {
                    accountId: '789C60F316D24B088ACD471',
                    description: 'INV001 Payout Make-Up Products BV',
                },
            ],
        });
        const response = await ideal
            .combine(marketplacesResponse.data)
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: 'E933CC3B4CF9494294538935D297A03F',
                })
            )
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});
