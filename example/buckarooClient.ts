import Buckaroo from '../src'

const buckaroo = Buckaroo.InitializeClient({
    secretKey: 'secret',
    websiteKey: 'website'
})
buckaroo.config = {
    mode: 'TEST',
    currency: 'EUR',
    returnURL: 'https://example.com/return',
    pushURL: 'https://example.com/push'
}
export default buckaroo
