import { Str } from "../../Utils";
import { HttpClientResponse } from "./HttpClientResponse";

export class SpecificationRequestResponse extends HttpClientResponse {
    get data(): ISpecificationRequestResponse {
        return this._data as any;
    }

    getActionRequestParameters(actionName: string): RequestParameter[] | undefined {
        let actions = this.data.actions?.find((action) => {
            if (Str.ciEquals(action.name, actionName)) {
                return action;
            }
        })?.requestParameters;
        if (actions) {
            actions.sort((a, b) => a.name.localeCompare(b.name));
        }
        return actions;
    }
}

type ListItemDescription = {
    value: string;
    description: string;
    groupName: string;
};
type SupportedCurrency = {
    isoNumber: number;
    code: string;
    name: string;
};

type Action = {
    name: string;
    type: number;
    default: boolean;
    description: string;
    requestParameters: RequestParameter[];
    responseParameters: RequestParameter[];
};
export type RequestParameter = {
    listItemDescriptions?: ListItemDescription[];
    isRequestParameter: boolean;
    name: string;
    dataType: number;
    maxLength: number;
    maxOccurs: number;
    required: boolean;
    global: boolean;
    group?: string;
    description: string;
    explanationHTML: string;
    displayName: string;
    inputPattern: string;
    autoCompleteType: string;
};

export interface ISpecificationRequestResponse {
    name: string;
    version: number;
    description: string;
    actions?: Action[];
    supportedCurrencies?: SupportedCurrency[];
    customParameters?: Record<string, any>;
}
