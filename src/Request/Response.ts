import {
    AxiosResponse,
} from 'axios'
import buckarooClient from "../BuckarooClient";
import {ReplyHandler} from "../Handlers/Reply/ReplyHandler";

export class Response {

    protected readonly _data: any
    protected readonly _axiosResponse: AxiosResponse
    get data(): any {
        return this._data
    }
    get axiosResponse(): AxiosResponse {
        return this._axiosResponse
    }
    constructor(response: AxiosResponse) {
        this._axiosResponse = response
        this._data = response.data
    }
    validate() {
        const replyHandler = new ReplyHandler(buckarooClient().getCredentials(),
            this.data,
            this.axiosResponse.headers["authorization"],
            this.axiosResponse.config.url
            )
        return replyHandler.validate().isValid

    }
}
