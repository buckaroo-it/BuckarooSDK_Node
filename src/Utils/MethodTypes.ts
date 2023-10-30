import * as AllRegisteredPaymentMethods from '../PaymentMethods/PaymentMethods';

type InstanceWithManualFlag<T, B extends boolean> = B extends true ? T & { _isManually: B } : T;

export type PaymentMethodTypeDictionary = typeof AllRegisteredPaymentMethods;
export type ServiceCode = keyof PaymentMethodTypeDictionary;

export type PaymentMethodInstanceType<Code extends ServiceCode, B extends boolean = false> = InstanceWithManualFlag<
    InstanceType<PaymentMethodTypeDictionary[Code]>,
    B
>;

export type PaymentMethodRegistryType<K extends ServiceCode, B extends boolean> = {
    [K in keyof PaymentMethodTypeDictionary]: PaymentMethodInstanceType<K, B>;
}[K];

export function getMethod<Code extends ServiceCode, B extends boolean>(code: Code): PaymentMethodInstanceType<Code, B> {
    const methodClass = AllRegisteredPaymentMethods[code] as {
        new (code: Code): PaymentMethodInstanceType<Code, B>;
    };
    if (!methodClass) {
        throw new Error(`Invalid payment method code: ${code}`);
    }

    return new methodClass(code) as PaymentMethodInstanceType<Code, B>;
}