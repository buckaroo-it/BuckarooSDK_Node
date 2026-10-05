import * as AllPaymentMethods from '../PaymentMethods';
import type Buckaroo from '../buckaroo';

export type AvailablePaymentMethods = typeof AllPaymentMethods;
export type ServiceCode = keyof AvailablePaymentMethods;
export type PaymentMethodInstance<Code extends ServiceCode> = InstanceType<AvailablePaymentMethods[Code]>;

export function getMethod<Code extends ServiceCode>(code: Code): PaymentMethodInstance<Code> {
    return createPaymentMethod(code);
}

export function createPaymentMethod<Code extends ServiceCode>(
    code: Code,
    client?: Buckaroo
): PaymentMethodInstance<Code> {
    const methodClass = AllPaymentMethods[code];
    if (!methodClass) {
        throw new Error(`Invalid payment method code: ${code}`);
    }

    return new methodClass(code as any, client) as PaymentMethodInstance<Code>;
}
