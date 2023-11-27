import buckaroo from '../buckarooClient';

const subscription = buckaroo.method('subscriptions');

subscription
    .create({
        additionalParameters: {
            signature: 'XXXXXXXX'
        },
        ratePlans: {
            add: {
                startDate: '2024-07-23',
                ratePlanCode: 'XXXXXXXX'
            }
        },
        ratePlanCharges: {
            add: {
                ratePlanChargeCode: 'XXXXXXXX'
            }
        },
        configurationCode: 'XXXXXXXX',
        configuration: {
            name: 'XXXXXXXX'
        },
        debtor: {
            code: 'XXXXXXXX'
        }
    })
const getActiveSubscriptions = subscription.getActiveSubscriptions()