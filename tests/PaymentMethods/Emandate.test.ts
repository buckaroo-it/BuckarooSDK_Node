import buckarooClientTest from '../BuckarooClient.test'
const method = buckarooClientTest.method('emandate')
describe('Testing Emandates methods', () => {
    test('GetIssuerList', async () => {
        await method
            .issuerList()
            .request()
            .then((response) => {
                expect(response.isSuccess()).toBeTruthy()
            })
    })
    test('CreateMandate', async () => {
        method
            .createMandate({
                debtorReference: 'klant1234',
                language: 'nl',
                continueOnIncomplete: true,
                purchaseId: 'purchaseid1234',
                sequenceType: 0
            })
            .request()
            .then((response) => {
                expect(response.isPendingProcessing()).toBeTruthy()
            })
    })
    test('GetStatus', async () => {
        method
            .status({ mandateId: '1DC014098EC5C1F40AD803B83A425153BBC' })
            .request()
            .then((response) => {
                expect(response.isSuccess()).toBeTruthy()
            })
    })
    test('ModifyMandate', async () => {
        method
            .modifyMandate({
                originalMandateId: '1DC014098EC5C1F40AD803B83A425153BBC',
                continueOnIncomplete: true
            })
            .request()
            .then((response) => {
                expect(response.isFailed()).toBeTruthy()
            })
    })
    test('CancelMandate', async () => {
        method
            .cancelMandate({
                mandateId: '1DC014098EC5C1F40AD803B83A425153BBC',
                purchaseId: 'purchaseid1234'
            })
            .request()
            .then((response) => {
                expect(response.isValidationFailure()).toBeTruthy()
            })
    })
})
