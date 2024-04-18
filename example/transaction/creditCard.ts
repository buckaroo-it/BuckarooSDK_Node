import buckaroo from '../buckarooClient';

buckaroo.method('nexi').pay({
    invoice: 'test1',
    amountDebit: 12,
});
