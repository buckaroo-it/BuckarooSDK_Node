import buckarooClient from '../buckarooClient';

const emandate = buckarooClient.method('emandate');

//CreateMandate
emandate
    .createMandate({
        debtorReference: 'XXXXXXXXX',
        language: 'nl',
        continueOnIncomplete: true,
        purchaseId: 'XXXXXXXXXXXXXX',
        sequenceType: 0,
    })
    .request();
//ModifyMandate
emandate
    .modifyMandate({
        originalmandateid: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        debtorbankid: 'ABNANL2A',
    })
    .request();

//Issuers
emandate.issuerList();

//CancelMandate
emandate
    .modifyMandate({
        mandateId: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        purchaseId: 'XXXXXXXXXXXXXX',
    })
    .request();
