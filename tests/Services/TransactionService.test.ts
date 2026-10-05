import Buckaroo, { TransactionService } from '../../src';
import { initialize } from '../Support/Client';

class CustomTransaction extends TransactionService {
    client = 'consumer-owned';
}

describe('Testing transaction service ownership', () => {
    test('a consumer client field does not replace the service owner', async () => {
        const { send } = initialize();
        const transaction = new CustomTransaction('tx');
        initialize('another-store');
        await transaction.status();
        expect(transaction.client).toBe('consumer-owned');
        expect(send).toHaveBeenCalledTimes(1);
    });
    test('a service created before initialization binds once on first use', async () => {
        const previous = Buckaroo.Client;
        try {
            (Buckaroo as any)._client = undefined;
            const service = new TransactionService('tx');
            const { send } = initialize();
            await service.status();
            const other = initialize('another-store');
            await service.status();
            expect(send).toHaveBeenCalledTimes(2);
            expect(other.send).not.toHaveBeenCalled();
        } finally {
            (Buckaroo as any)._client = previous;
        }
    });
});
