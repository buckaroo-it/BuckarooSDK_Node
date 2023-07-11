import crypto from "crypto";
import HttpMethods from "../../Constants/HttpMethods";
import {ICredentials} from "../../Utils/Types";
import {Hmac} from "../../Request/Hmac";
import buckarooClient from "../../BuckarooClient";

export class ReplyHandler {
    private readonly data: object
    private readonly uri?: string
    private readonly auth_header?: string
    private credentials: ICredentials;
    private _isValid: boolean = false

    constructor(credentials: ICredentials, data: string,auth_header?: string, uri?: string) {
        try {
            this.data = JSON.parse(data)
        } catch (e){
            let objData = {}
            new URLSearchParams(data).forEach((value, name)=>{
                objData[name] = value
            })
            this.data = objData
        }
        this.credentials = credentials
        this.uri = uri
        this.auth_header = auth_header
    }
    get isValid(){
        return this._isValid
    }
    validate() {
        if(this.data["Key"] && this.auth_header && this.uri) {
            this._isValid = this.validateJson(this.auth_header)
            return this
        }

        if (this.data["brq_signature"] || this.data["BRQ_SIGNATURE"]){
            let  { brq_signature , BRQ_SIGNATURE, ...data} = this.data as any
            this._isValid = this.validateHttp(data,brq_signature || BRQ_SIGNATURE)
            return this
        }

        throw new Error('Invalid reply data')
    }
    private validateJson(auth_header:string){
        let header = auth_header.split(':')
        let providedHash = header[1]

        let nonce = header[2]
        let time = header[3]
        let hmac = new Hmac(HttpMethods.POST,this.uri,this.data,nonce,time)

        let hash = hmac.hashData(hmac.getHashString())

        return crypto.timingSafeEqual(Buffer.from(hash),Buffer.from(providedHash))
    }
    private validateHttp(data:object,signature:string){
        let stringData = ''
        for (const key in data ) {
            stringData+= key + '=' + data[key]
        }
        stringData = stringData + buckarooClient().getCredentials().websiteKey

        let hash = crypto.createHash('sha1').update(stringData).digest('hex')

        return crypto.timingSafeEqual(Buffer.from(hash),Buffer.from(signature))
    }
}
