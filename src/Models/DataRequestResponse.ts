import { firstLowerCase, firstUpperCase } from '../Utils/Functions'
import {Response} from "../Request/Response";

export class DataRequestResponse extends Response {
    get data(): IDataRequestResponse {
        return <IDataRequestResponse>this._data
    }
    getActionRequestParameters(actionName: string): RequestParameter[] | undefined {
        actionName = firstUpperCase(actionName)
        let actions = this.data.Actions?.find((action) => action.Name === actionName)?.RequestParameters
        if (actions) {
            actions.sort((a, b) => a.Name.localeCompare(b.Name))
        }
        return actions
    }
    getServiceParameters(actionName: string) {
        actionName = firstUpperCase(actionName)
        let parameters = this.getActionRequestParameters(actionName)
        let data: { [key: string]: any } = {}
        if (parameters) {
            parameters.forEach((param) => {
                let current = data
                param.Group = param.Group ? firstLowerCase(param.Group) : ''
                if (param.Group) {
                    current = data[param.Group] = data[param.Group] ?? {}
                }
                current[firstLowerCase(param.Name)] = param.Required
            })
            return data
        }
    }
}

type ListItemDescription = {
    Value: string
    Description: string
    GroupName: string
}
type SupportedCurrency = {
    IsoNumber: number
    Code: string
    Name: string
}

type Action = {
    Name: string
    Type: number
    Default: boolean
    Description: string
    RequestParameters: RequestParameter[]
    ResponseParameters: RequestParameter[]
}
export type RequestParameter = {
    ListItemDescriptions: ListItemDescription[]
    isRequestParameter: boolean
    Name: string
    DataType: number
    MaxLength: number
    MaxOccurs: number
    Required: boolean
    Global: boolean
    Group?: string
    Description: string
    ExplanationHTML: string
    DisplayName: string
    InputPattern: string
    AutoCompleteType: string
}
export interface IDataRequestResponse {
    Actions?: Action[]
    SupportedCurrencies?: SupportedCurrency[]
    Name: string
    Version: number
    Description: string
}
