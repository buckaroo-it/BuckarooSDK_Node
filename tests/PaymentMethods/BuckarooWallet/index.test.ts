import { IRefundRequest, PaymentMethodInstance, uniqid } from '../../../src';
import buckarooClientTest from '../../Support/BuckarooClient';
import { createRefundPayload, getServiceParameter } from '../../Support/Payloads';
import { mockResponse, recordedRequests, transactionResponse } from '../../Support/HttpMock';

let method: PaymentMethodInstance<'buckaroowalletcollecting'>;

let walletId = 'test-walletId';
let reservationId = 'test-reservationId';
let transactionKey = 'test-transactionKey';
let walletMutationGuid = 'test-walletMutationGuid';

beforeEach(() => {
    walletId = 'test-walletId';
    reservationId = 'test-reservationId';
    transactionKey = 'test-transactionKey';
    walletMutationGuid = 'test-walletMutationGuid';
    method = buckarooClientTest.method('buckaroowalletcollecting');
});

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
        mockResponse(transactionResponse(190), '/json/DataRequest');

        const response = await method.create(payload).request();

        expect(response.isSuccess()).toBeTruthy();
        walletId = getServiceParameter(response, 'WalletId');
    });

    test('Update', async () => {
        mockResponse(transactionResponse(190), '/json/DataRequest');

        const response = await method
            .update({
                ...payload,
                status: 'Active',
            })
            .request();

        expect(response.isSuccess()).toBeTruthy();
    });

    test('GetInfo', async () => {
        mockResponse(transactionResponse(190), '/json/DataRequest');

        const response = await method.getInfo({ walletId }).request();
        expect(response.isSuccess()).toBeTruthy();
    });

    test('Deposit', async () => {
        mockResponse(transactionResponse(190));

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
        mockResponse(transactionResponse(190));

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
        mockResponse(transactionResponse(190), '/json/DataRequest');

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
        mockResponse(transactionResponse(190));

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
        mockResponse(transactionResponse(190));

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
        mockResponse(transactionResponse(190));

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
        mockResponse(transactionResponse(190));

        const response = await method
            .refund(
                createRefundPayload<IRefundRequest>({
                    originalTransactionKey: transactionKey,
                })
            )
            .request();

        expect(response.isSuccess()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});
