import buckaroo from '../buckarooClient';
import CreditCard from '../../src/PaymentMethods/CreditCard';

const paymentMethod = new CreditCard('nexi');
(async () => {
    try {
        const info = await paymentMethod.pay({
            invoice: 'test1',
            amountDebit: 12
        });
        console.log(info);
    }
    catch (error) {
        console.warn(error);
    }
})();

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
