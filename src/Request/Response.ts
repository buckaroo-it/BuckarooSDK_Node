import {
    AxiosResponse,
} from 'axios'

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
}
