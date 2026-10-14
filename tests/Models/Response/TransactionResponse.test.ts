import { AxiosResponse } from 'axios';
import { BatchRequestResponse, SpecificationRequestResponse, TransactionResponse } from '../../../src';
function response(data: object) {
    return new TransactionResponse({ data } as AxiosResponse);
}

describe('Testing transaction responses', () => {
    test.each([
        [190, 'isSuccess'],
        [490, 'isFailed'],
        [491, 'isValidationFailure'],
        [690, 'isRejected'],
        [790, 'isWaitingOnUserInput'],
        [791, 'isPendingProcessing'],
        [792, 'isAwaitingConsumer'],
        [794, 'isPendingApproval'],
        [890, 'isCanceled'],
        [891, 'isCanceled'],
    ] as const)('interprets status %i as %s', (code, method) => {
        expect(response({ Status: { Code: { Code: code } } })[method]()).toBe(true);
        expect(response({ Status: { Code: { Code: 999 } } })[method]()).toBe(false);
    });
    test('exposes transaction details, redirects and parameters', () => {
        const result = response({
            Key: 'tx',
            PaymentKey: 'payment',
            AmountDebit: 12,
            AmountCredit: 3,
            Status: { Code: { Code: 190, Description: 'Success' }, SubCode: { Code: 'S001' } },
            RequiredAction: { Name: 'Redirect', RedirectURL: 'https://example.com/pay' },
            Services: [{ Name: 'ideal', Action: 'Pay' }],
            CustomParameters: { List: [{ Name: 'OrderId', Value: '123' }] },
            AdditionalParameters: { List: [{ Name: 'Note', Value: 'hello' }] },
        });
        expect(result.getTransactionKey()).toBe('tx');
        expect(result.getPaymentKey()).toBe('payment');
        expect(result.getAmountDebit()).toBe(12);
        expect(result.getAmountCredit()).toBe(3);
        expect(result.getSubStatusCode()).toBe('S001');
        expect(result.getErrorMessage()).toBe('Success');
        expect(result.hasRedirect()).toBe(true);
        expect(result.getRedirectUrl()).toBe('https://example.com/pay');
        expect(result.getMethod()).toBe('ideal');
        expect(result.getServiceAction()).toBe('Pay');
        expect(result.getCustomParameters()).toEqual({ orderId: '123' });
        expect(result.getAdditionalParameters()).toEqual({ note: 'hello' });
        expect(response({}).getRedirectUrl()).toBe('');
        expect(response({}).getCustomParameters()).toEqual({});
        expect(
            response({
                AdditionalParameters: { AdditionalParameter: [{ Name: 'Extra', Value: 5 }] },
            }).getAdditionalParameters()
        ).toEqual({ extra: 5 });
    });
    test.each(['ChannelErrors', 'ServiceErrors', 'ActionErrors', 'ParameterErrors', 'CustomParameterErrors'])(
        'detects %s',
        (key) => {
            expect(response({ RequestErrors: { [key]: [{ Error: 'invalid' }] } }).hasError()).toBe(true);
            expect(response({ RequestErrors: { [key]: [] } }).hasError()).toBe(false);
        }
    );
    test('finds action parameters case-insensitively and sorts by name', () => {
        const result = new SpecificationRequestResponse({
            data: { Actions: [{ Name: 'Pay', RequestParameters: [{ Name: 'Z' }, { Name: 'A' }] }] },
        } as AxiosResponse);
        expect(result.getActionRequestParameters('pay')!.map((p) => p.name)).toEqual(['A', 'Z']);
        expect(result.getActionRequestParameters('refund')).toBeUndefined();
        expect(
            new BatchRequestResponse({
                data: { Message: 'queued', Errors: [{ Reference: '1', Message: 'bad' }] },
            } as AxiosResponse).data.errors![0].message
        ).toBe('bad');
    });
});
