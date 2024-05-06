import buckarooClient from '../buckarooClient';
import { uniqid } from '../../src';

const thunes = buckarooClient.method('thunes');

//Authorize
thunes
    .authorize({
        amountDebit: 100,
        order: uniqid(),
        invoice: uniqid(),
        name: 'monizzeecovoucher',
        articles: [
            {
                identifier: 'Articlenumber1',
                description: 'Articledesciption1',
                price: '1',
            },
            {
                identifier: 'Articlenumber2',
                description: 'Articledesciption2',
                price: '2',
            },
        ],
    })
    .request();
//Capture
thunes
    .capture({
        originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        amountDebit: 100,
    })
    .request();
//GetStatus
thunes.getStatus({
    originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
});
//Cancel
thunes.cancel({
    originalTransactionKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
});
