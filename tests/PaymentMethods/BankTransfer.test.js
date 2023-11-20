import Gender from '../../src/Constants/Gender';
import buckarooClientTest from '../BuckarooClient.test';
const method = buckarooClientTest.method('transfer');
describe('Transfer methods', () => {
    test('Pay', async () => {
        await method
            .pay({
            amountDebit: 10,
            customer: {
                firstName: 'John',
                lastName: 'Doe',
                gender: Gender.MALE
            },
            email: 'test@hotmail.com',
            sendMail: true,
            dateDue: '2024-10-10'
        })
            .request()
            .then((res) => {
            expect(res.isAwaitingConsumer()).toBeDefined();
        });
    });
});
