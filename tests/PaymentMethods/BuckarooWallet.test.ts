import buckarooClientTest from '../BuckarooClient.test';
import { PaymentMethodInstance, uniqid } from '../../src';

let method: PaymentMethodInstance<'BuckarooWalletCollecting'>;

let walletId: string;
let reservationId: string;
let transactionKey: string;
let walletMutationGuid: string;

beforeEach(() => {
    method = buckarooClientTest.method('BuckarooWalletCollecting');
});

const getServiceParameter = (response: any, name: string): string => {
    const param = (response.getServices()?.[0]?.parameters as { name: string; value: any }[] | undefined)?.find(
        (p) => p.name === name
    );
    return String(param?.value ?? '');
};

const payload = {
    walletId: uniqid(),
    currency: 'EUR',
    customer: {
        firstName: 'Test',
        lastName: 'Acceptatie',
        email: 'test@buckaroo.nl',
    },
    bankAccount: {
        iban: 'NL13TEST0123456789',
    },
};

describe('BuckarooWallet methods', () => {
    test('Create Wallet', async () => {
        const response = await method.create(payload).request();

        expect(response.isSuccess()).toBeTruthy();
        walletId = getServiceParameter(response, 'WalletId');
    });

    test('Update', async () => {
        const response = await method
            .update({
                ...payload,
                status: 'Active',
            })
            .request();

        expect(response.isSuccess()).toBeTruthy();
    });

    test('GetInfo', async () => {
        const response = await method.getInfo({ walletId }).request();
        expect(response.isSuccess()).toBeTruthy();
    });

    test('Deposit', async () => {
        const response = await method
            .deposit({
                invoice: uniqid(),
                walletId,
                amountCredit: 50,
                originalTransactionKey: '288EC0C84DF24C5C8B34723E50782BD4',
            })
            .request();

        expect(response.isSuccess()).toBeTruthy();
    });

    test('Reservation', async () => {
        const response = await method
            .reserve({
                invoice: uniqid(),
                walletId,
                amountCredit: 40,
                originalTransactionKey: '288EC0C84DF24C5C8B34723E50782BD4',
            })
            .request();

        expect(response.isSuccess()).toBeTruthy();
        walletId = getServiceParameter(response, 'WalletId');
        walletMutationGuid = getServiceParameter(response, 'WalletMutationGuid');
        reservationId = response.getTransactionKey();
    });

    test('Release', async () => {
        const response = await method
            .release({
                amountCredit: 40,
                walletId,
                originalTransactionKey: '',
            })
            .request();

        expect(response.isSuccess()).toBeTruthy();
        walletId = getServiceParameter(response, 'WalletId');
    });

    test('CancelReservation', async () => {
        const response = await method
            .cancel({
                invoice: uniqid(),
                amountDebit: 30,
                walletMutationGuid: walletMutationGuid,
                originalTransactionKey: '',
                order: '',
            })
            .request();

        expect(response.isSuccess()).toBeTruthy();
    });

    test('Withdrawal', async () => {
        const response = await method
            .withdrawal({
                invoice: uniqid(),
                walletId,
                amountDebit: 10,
                originalTransactionKey: reservationId,
                order: '',
            })
            .request();

        expect(response.isSuccess()).toBeTruthy();
    });

    test('Pay', async () => {
        const response = await method
            .pay({
                invoice: uniqid(),
                amountDebit: 10,
                walletId,
            })
            .request();

        expect(response.isSuccess()).toBeTruthy();
        transactionKey = response.getTransactionKey();
    });

    test('Refund', async () => {
        const response = await method
            .refund({
                invoice: uniqid(),
                amountCredit: 0.01,
                originalTransactionKey: transactionKey,
            })
            .request();

        console.log(response.getStatusCode());
        expect(response.isSuccess()).toBeTruthy();
    }, 10000);
});
