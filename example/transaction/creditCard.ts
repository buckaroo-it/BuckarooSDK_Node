import buckaroo from '../buckarooClient';

buckaroo.method('nexi').pay({
    invoice: 'test1',
    amountDebit: 12,
});

buckaroo.method('visa').authorizeWithToken({
    invoice: 'test',
    amountDebit: 10,
    name: 'Visa',
    sessionId: 'hf_457vWCGGdZcWJzBY',
}).request();

buckaroo.method('visa').payWithToken({
    invoice: 'test',
    amountDebit: 10,
    name: 'Visa',
    sessionId: 'hf_457vWCGGdZcWJzBY',
}).request();
