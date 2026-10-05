import { PaymentMethod, ServiceCode } from '../../src';
import { initialize } from '../Support/Client';

class CustomPayment extends PaymentMethod {
    client = 'consumer-owned';
    defaultServiceCode(): ServiceCode {
        return 'ideal';
    }
}

describe('Testing payment method ownership', () => {
    test('a consumer client field does not replace the payment method owner', async () => {
        const { send } = initialize();
        const payment = new CustomPayment('ideal');
        initialize('another-store');
        await payment.specification().request();
        expect(payment.client).toBe('consumer-owned');
        expect(send).toHaveBeenCalledTimes(1);
    });
});
