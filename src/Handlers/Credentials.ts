import { ICredentials } from '../Utils/Types'
import Request from '../Request/Request'
import { RequestTypes } from '../Constants/Endpoints'

export class Credentials implements ICredentials {
    secretKey: string
    websiteKey: string
    constructor(secretKey: string, websiteKey: string) {
        this.secretKey = secretKey
        this.websiteKey = websiteKey
    }
    confirm() {
        return Request.Specification(RequestTypes.Transaction, {
            name: 'ideal',
            version: 2
        })
            .request()
            .then((response) => {
                return response.httpResponse.statusCode === 200
            })
            .catch(() => {
                return false
            })
    }
}
