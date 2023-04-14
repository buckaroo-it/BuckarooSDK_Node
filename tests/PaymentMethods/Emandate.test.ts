require('../BuckarooClient.test')
import Emandates from '../../src/PaymentMethods/Emandates'

const method = new Emandates()
describe('Testing Emandates methods', () => {
    test('GetIssuerList', async () => {
        method.issuerList().then((response) => {
            expect(response.data).toBeDefined()
        })
    })
    test('CreateMandate', async () => {
        method
            .createMandate({
                debtorReference: 'klant1234',
                language: 'nl',
                continueOnIncomplete: 1,
                purchaseId: 'purchaseid1234',
                sequenceType: 0
            })
            .then((response) => {
                expect(response.data).toBeDefined()
            })
    })
    test('GetStatus', async () => {
        method.status({ mandateId: '1DC014098EC5C1F40AD803B83A425153BBC' }).then((response) => {
            expect(response.data).toBeDefined()
        })
    })
    test('ModifyMandate', async () => {
        method
            .modifyMandate({
                originalMandateId: '1DC014098EC5C1F40AD803B83A425153BBC',
                continueOnIncomplete: 1
            })
            .then((response) => {
                expect(response.data).toBeDefined()
            })
    })
    test('CancelMandate', async () => {
        method
            .cancelMandate({
                mandateId: '1DC014098EC5C1F40AD803B83A425153BBC',
                purchaseId: 'purchaseid1234'
            })
            .then((response) => {
                expect(response).toBeDefined()
            })
    })
})
