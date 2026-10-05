import net from 'net';

describe('Testing the offline boundary', () => {
    test('blocks sockets and fetch even if a test bypasses Axios', async () => {
        const socket = new net.Socket();
        expect(() => socket.connect(443, 'example.com')).toThrow('Network access is disabled');
        socket.destroy();
        await expect(fetch('https://example.com')).rejects.toThrow('Network access is disabled');
    });
});
