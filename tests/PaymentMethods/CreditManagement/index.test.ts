import { CreditManagementInstallmentInterval, PaymentMethodInstance, uniqid } from '../../../src';
import buckarooClientTest from '../../Support/BuckarooClient';
import { formatDate, getServiceParameter } from '../../Support/Payloads';
import { creditManagementTestInvoice } from '../../Support/Payloads/CreditManagement';
import { mockResponse, recordedRequests, transactionResponse } from '../../Support/HttpMock';

let method: PaymentMethodInstance<'creditmanagement3'>;
let invoiceKey = 'test-invoiceKey';
let invoice = 'test-invoice';

beforeEach(() => {
    invoiceKey = 'test-invoiceKey';
    invoice = 'test-invoice';
    method = buckarooClientTest.method('creditmanagement3');
});
describe('Testing Credit Management', () => {
    test('CreateInvoice', async () => {
        mockResponse(transactionResponse(190), '/json/DataRequest');

        const response = await method.createInvoice(creditManagementTestInvoice()).request();
        invoiceKey = getServiceParameter(response, 'InvoiceKey');

        expect(response.isSuccess()).toBeTruthy();
    });
    test('Pause Invoice', async () => {
        mockResponse(transactionResponse(190), '/json/DataRequest');

        const response = await method.pauseInvoice({ invoice: invoice }).request();

        expect(response.isSuccess()).toBeTruthy();
    });
    test('UnPause Invoice', async () => {
        mockResponse(transactionResponse(190), '/json/DataRequest');

        const response = await method.unpauseInvoice({ invoice: invoice }).request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Invoice Info', async () => {
        mockResponse(transactionResponse(190), '/json/DataRequest');

        const response = await method
            .invoiceInfo({
                invoice: invoice,
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('Debtor Info', async () => {
        mockResponse(transactionResponse(190), '/json/DataRequest');

        const response = await method
            .debtorInfo({
                debtor: {
                    code: 'johnsmith4',
                },
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    test('AddOrUpdateProductLines', async () => {
        mockResponse(transactionResponse(190), '/json/DataRequest');

        expect(invoiceKey).toBeDefined();

        const response = await method
            .addOrUpdateProductLines({
                invoiceKey: invoiceKey,
                articles: [
                    {
                        type: 'Regular',
                        identifier: 'Articlenumber1',
                        description: 'Blue Toy Car',
                        vatPercentage: 21,
                        totalVat: 12,
                        totalAmount: 123,
                        quantity: 2,
                        price: 20.1,
                    },
                    {
                        type: 'Regular',
                        identifier: 'Articlenumber2',
                        description: 'Red Toy Car',
                        vatPercentage: 21,
                        totalVat: 12,
                        totalAmount: 123,
                        quantity: 1,
                        price: 10.1,
                    },
                ],
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
    // No DebtorFile available for testing.
    test('addOrUpdateDebtor', async () => {
        mockResponse(transactionResponse(190), '/json/DataRequest');

        const response = await method
            .addOrUpdateDebtor({
                debtor: {
                    code: 'johnsmith4',
                },
                person: {
                    culture: 'nl-NL',
                    lastName: 'Acceptatie',
                },
            })
            .request();

        expect(response.isSuccess()).toBeTruthy();
    });
    test('CreateCombinedInvoice', async () => {
        mockResponse(transactionResponse(791));

        const combinedInvoice = method.createCombinedInvoice(creditManagementTestInvoice());
        const response = await buckarooClientTest
            .method('sepadirectdebit')
            .combine(combinedInvoice.data)
            .pay({
                iban: 'NL13TEST0123456789',
                bic: 'TESTNL2A',
                mandateReference: '1DCtestreference',
                mandateDate: '2020-01-01',
                collectDate: '2030-07-03',
                amountDebit: 100,
                customer: {
                    name: 'Test Acceptatie',
                },
                invoice: uniqid('TestInvoice'),
            })
            .request();

        expect(response.isPendingProcessing()).toBeTruthy();
    });

    test('CreateCreditNote', async () => {
        mockResponse(transactionResponse(190), '/json/DataRequest');

        const response = await method
            .createCreditNote({
                invoice: uniqid(),
                originalInvoiceNumber: '6383cbc0498a24',
                invoiceDate: formatDate(new Date()),
                invoiceAmount: '0.01',
                invoiceAmountVAT: '1',
                sendCreditNoteMessage: 'Email',
            })
            .request();
        expect(response.isSuccess()).toBeTruthy();
    });
});

afterEach(() => {
    expect(recordedRequests()).toMatchSnapshot();
});

test('createPaymentPlan builds the CreatePaymentPlan request', async () => {
    mockResponse(transactionResponse(), '/json/DataRequest');
    const result = await method
        .createPaymentPlan({
            description: 'Two installments',
            includedInvoiceKey: 'test-invoice',
            dossierNumber: 'test-dossier',
            installmentCount: 2,
            initialAmount: 5,
            startDate: '2026-01-02',
            interval: CreditManagementInstallmentInterval.DAY,
            paymentPlanCostAmount: 0,
            paymentPlanCostAmountVat: 0,
            recipientEmail: 'test@example.com',
        })
        .request();
    expect(result.isSuccess()).toBe(true);
    expect(recordedRequests()).toEqual([
        expect.objectContaining({
            data: expect.objectContaining({
                Services: {
                    ServiceList: expect.arrayContaining([expect.objectContaining({ Action: 'CreatePaymentPlan' })]),
                },
            }),
        }),
    ]);
});

test('terminatePaymentPlan builds the TerminatePaymentPlan request', async () => {
    mockResponse(transactionResponse(), '/json/DataRequest');
    const result = await method.terminatePaymentPlan({ includedInvoiceKey: 'test-invoice' }).request();
    expect(result.isSuccess()).toBe(true);
    expect(recordedRequests()).toEqual([
        expect.objectContaining({
            data: expect.objectContaining({
                Services: {
                    ServiceList: expect.arrayContaining([expect.objectContaining({ Action: 'TerminatePaymentPlan' })]),
                },
            }),
        }),
    ]);
});

test('resumeDebtorFile builds the ResumeDebtorFile request', async () => {
    mockResponse(transactionResponse(), '/json/DataRequest');
    const result = await method.resumeDebtorFile({ debtorFileGuid: 'test-debtor' }).request();
    expect(result.isSuccess()).toBe(true);
    expect(recordedRequests()).toEqual([
        expect.objectContaining({
            data: expect.objectContaining({
                Services: {
                    ServiceList: expect.arrayContaining([expect.objectContaining({ Action: 'ResumeDebtorFile' })]),
                },
            }),
        }),
    ]);
});

test('pauseDebtorFile builds the PauseDebtorFile request', async () => {
    mockResponse(transactionResponse(), '/json/DataRequest');
    const result = await method.pauseDebtorFile({ debtorFileGuid: 'test-debtor' }).request();
    expect(result.isSuccess()).toBe(true);
    expect(recordedRequests()).toEqual([
        expect.objectContaining({
            data: expect.objectContaining({
                Services: {
                    ServiceList: expect.arrayContaining([expect.objectContaining({ Action: 'PauseDebtorFile' })]),
                },
            }),
        }),
    ]);
});
