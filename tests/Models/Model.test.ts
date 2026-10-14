import { DataRequestData, JsonModel, Model, ServiceList, ServiceParameter, TransactionData } from '../../src';

describe('Testing models', () => {
    test('serializes only allowed request properties and supports model copies', () => {
        const original = new TransactionData({ amountDebit: 10, currency: 'EUR', unexpected: 'discard' });
        const copy = new TransactionData(original);
        original.amountDebit = 20;
        expect(copy.getData()).toMatchObject({ AmountDebit: 10, Currency: 'EUR' });
        expect(copy.getData()).not.toHaveProperty('Unexpected');
        expect(original.get('amountDebit')).toBe(20);
    });
    test('omits hidden properties and undefined values', () => {
        const model = new Model().set('visible', 1).set('secret', 'hidden', true).set('absent', undefined);
        expect(model.getData()).toEqual({ Visible: 1 });
        model.visible = 2;
        expect(model.get('visible')).toBe(2);
    });
    test('normalizes nested response objects and preserves scalar array values', () => {
        const model = new JsonModel({
            Status: { Code: 190 },
            Values: [1, 'EUR', false, { Name: 'ideal' }],
            Missing: null,
        });
        expect(model.status.code).toBe(190);
        expect(model.values).toEqual([1, 'EUR', false, { name: 'ideal' }]);
        expect(model.missing).toBeUndefined();
    });
    test('replaces an existing service regardless of name casing', () => {
        const services = new ServiceList({ name: 'ideal', action: 'Pay', version: 2 });
        services.addService({ name: 'IDEAL', action: 'Refund', version: 2 });
        expect(services.getData()).toEqual({ ServiceList: [{ Name: 'IDEAL', Action: 'Refund', Version: 2 }] });
        expect(services.getService('ideal')!.action).toBe('Refund');
    });
    test('formats custom and additional parameters and data requests', () => {
        const data = new TransactionData({
            customParameters: { orderId: '1' },
            additionalParameters: { source: 'shop' },
            continueOnIncomplete: true,
            servicesExcludedForClient: ['ideal', 'paypal'],
            servicesSelectableByClient: 'ideal',
            originalTransactionReference: { type: 'invoice', reference: '1' },
        });
        expect(data.getData()).toMatchObject({
            ContinueOnIncomplete: 1,
            ServicesExcludedForClient: 'ideal,paypal',
            ServicesSelectableByClient: 'ideal',
            CustomParameters: { List: [{ Name: 'OrderId', Value: '1' }] },
            AdditionalParameters: { AdditionalParameter: [{ Name: 'Source', Value: 'shop' }] },
        });
        expect(
            new DataRequestData({ additionalParameters: { source: 'shop' }, services: [{ name: 'ideal' }] }).getData()
        ).toMatchObject({
            AdditionalParameters: { List: [{ Name: 'Source', Value: 'shop' }] },
            Services: [{ name: 'ideal' }],
        });
        expect(new ServiceParameter().set('count', 0).toParameterList()).toEqual([{ name: 'Count', value: 0 }]);
    });
});
