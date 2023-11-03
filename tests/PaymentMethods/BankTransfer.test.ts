import { Gender } from '../../src';
import buckarooClientTest from '../BuckarooClient.test';

const method = buckarooClientTest.method('transfer');

describe('Transfer methods', () => {
    test('Pay', async () => {
        await method
            .pay({
                amountDebit: 100,
                customer: {
                    firstName: 'Test',
                    lastName: 'Acceptatie',
                    gender: Gender.MALE,
                },
                email: 'test@buckaroo.nl',
                sendMail: true,
                dateDue: '2024-10-10',
            })
            .request()
            .then((res) => {
                expect(res.isAwaitingConsumer()).toBeDefined();
            });
    });
});
