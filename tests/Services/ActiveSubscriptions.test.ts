import Buckaroo, { ActiveSubscriptions } from '../../src';
import { initialize } from '../Support/Client';

describe('Testing subscription service ownership', () => {
    test('a service created before initialization binds once on first use', async () => {
        const previous = Buckaroo.Client;
        try {
            (Buckaroo as any)._client = undefined;
            const subscriptions = new ActiveSubscriptions();
            const { send } = initialize();
            expect(await subscriptions.get()).toEqual([]);
            const other = initialize('another-store');
            expect(await subscriptions.get()).toEqual([]);
            expect(send).toHaveBeenCalledTimes(2);
            expect(other.send).not.toHaveBeenCalled();
        } finally {
            (Buckaroo as any)._client = previous;
        }
    });
});
