import Buckaroo, {
    AuthenticationError,
    BuckarooApiError,
    BuckarooError,
    ClientIP,
    ParameterValidationError,
} from '../../src';
import { clientFor } from '../../src/Request/ClientBinding';
import { In3Recipient } from '../../src/PaymentMethods/In3/Models/Recipient';
import { BillinkCustomer } from '../../src/PaymentMethods/Billink/Models/Customer';

const thrownBy = (action: () => unknown) => {
    try {
        action();
    } catch (error) {
        return error as BuckarooError;
    }
    throw new Error('Expected the action to throw');
};

describe('Testing the error hierarchy', () => {
    test.each([
        [AuthenticationError, 'AuthenticationError'],
        [ParameterValidationError, 'ParameterValidationError'],
        [BuckarooApiError, 'BuckarooApiError'],
        [BuckarooError, 'BuckarooError'],
    ] as const)('%p is a named BuckarooError and Error', (ErrorClass, name) => {
        const cause = new Error('original');
        const error = new ErrorClass('failed', { httpStatus: 500, body: { Error: 'x' }, headers: { a: '1' }, cause });
        expect(error).toBeInstanceOf(ErrorClass);
        expect(error).toBeInstanceOf(BuckarooError);
        expect(error).toBeInstanceOf(Error);
        expect(error.name).toBe(name);
        expect(error.message).toBe('failed');
        expect(error.stack).toContain(`${name}: failed`);
        expect(error).toMatchObject({ httpStatus: 500, body: { Error: 'x' }, headers: { a: '1' }, cause });
    });

    test('keeps the parameter name on validation errors', () => {
        expect(new ParameterValidationError('missing', { parameterName: 'currency' }).parameterName).toBe('currency');
    });
});

describe('Testing typed errors at SDK throw sites', () => {
    beforeEach(() => {
        Buckaroo.InitializeClient({ websiteKey: 'test-store', secretKey: 'test-secret' }, { mode: 'TEST' } as any);
    });

    test('missing credentials throw AuthenticationError', () => {
        expect(thrownBy(() => new Buckaroo({ websiteKey: '', secretKey: '' }))).toBeInstanceOf(AuthenticationError);
    });

    test('a missing client throws BuckarooError', () => {
        (Buckaroo as any)._client = undefined;
        const error = thrownBy(() => clientFor({}));
        expect(error).toBeInstanceOf(BuckarooError);
        expect(error.message).toBe('Initialize a Buckaroo client before using this operation.');
    });

    test('a missing required config parameter throws ParameterValidationError', () => {
        const error = thrownBy(() => Buckaroo.Client.method('ideal').pay({ amountDebit: 10 }));
        expect(error).toBeInstanceOf(ParameterValidationError);
        expect(error).toMatchObject({ parameterName: 'currency' });
    });

    test.each([
        ['an unknown payment method', () => Buckaroo.Client.method('not-a-method' as any)],
        ['an invalid IP address', () => new ClientIP('not-an-ip')],
        ['an oversized IP address', () => new ClientIP('1'.repeat(257))],
        ['an In3 recipient category', () => new In3Recipient({ recipient: { category: 'unknown' } } as any)],
        ['a Billink recipient category', () => new BillinkCustomer({ recipient: { category: 'unknown' } } as any)],
    ])('%s throws ParameterValidationError', (_, action) => {
        expect(thrownBy(action)).toBeInstanceOf(ParameterValidationError);
    });
});
