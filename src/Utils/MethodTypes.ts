import * as AllRegisteredPaymentMethods from '../PaymentMethods/PaymentMethods';

type InstanceWithManualFlag<Method, Manually extends boolean> = Manually extends true
    ? Method & {
          _isManually: Manually;
      }
    : Method;

export type PaymentMethodTypeDictionary = typeof AllRegisteredPaymentMethods;
export type ServiceCode = keyof PaymentMethodTypeDictionary;

export type PaymentMethodInstanceType<
    Code extends ServiceCode,
    Manually extends boolean = false
> = InstanceWithManualFlag<InstanceType<PaymentMethodTypeDictionary[Code]>, Manually>;

export type PaymentMethodRegistryType<K extends ServiceCode, Manually extends boolean> = {
    [K in keyof PaymentMethodTypeDictionary]: PaymentMethodInstanceType<K, Manually>;
}[K];

export function getMethod<Code extends ServiceCode, Manually extends boolean>(
    code: Code
): PaymentMethodInstanceType<Code, Manually> {
    const methodClass = AllRegisteredPaymentMethods[code] as {
        new (code: Code): PaymentMethodInstanceType<Code, Manually>;
    };
    if (!methodClass) {
        throw new Error(`Invalid payment method code: ${code}`);
    }

    return new methodClass(code) as PaymentMethodInstanceType<Code, Manually>;
}