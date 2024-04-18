import * as AllPaymentMethods from "../PaymentMethods";

export type AvailablePaymentMethods = typeof AllPaymentMethods;
export type ServiceCode = keyof AvailablePaymentMethods;
export type PaymentMethodInstance<Code extends ServiceCode> = InstanceType<AvailablePaymentMethods[Code]>;

export function getMethod<Code extends ServiceCode>(code: Code): PaymentMethodInstance<Code> {
    const methodClass = AllPaymentMethods[code];
    if (!methodClass) {
        throw new Error(`Invalid payment method code: ${code}`);
    }

    return new methodClass(code as any) as PaymentMethodInstance<Code>;
}
