import {firstUpperCase} from "../Utils/Functions";

type ListItemDescription = {
    Value: string
    Description: string
    GroupName: string
}
type Attributes = {
    ListItemDescriptions: ListItemDescription[]
    Name: string
    DataType: number
    List: number
    MaxLength: number,
    Required: boolean
    Description: string
}
type BasicFields = {
    Attributes: Attributes[]
    ListItemDescriptions:ListItemDescription[],
    Name: string
    DataType: number
    MaxLength: number,
    Required: boolean
    Description: string
}

type SupportedCurrency = {
    IsoNumber: number;
    Code: string;
    Name: string;
}

type Action = {
    Name: string;
    Type: number;
    Default: boolean;
    Description: string;
    RequestParameters: RequestParameter[];
    ResponseParameters: RequestParameter[] ;
}
type RequestParameter = {
    ListItemDescriptions: ListItemDescription[];
    isRequestParameter: boolean;
    Name: string;
    DataType: number;
    MaxLength: number;
    MaxOccurs: number;
    Required: boolean;
    Global: boolean;
    Group: string;
    Description: string;
    ExplanationHTML: string;
    DisplayName: string;
    InputPattern: string;
    AutoCompleteType: string;
}
interface Services  {
    Actions?: Action[];
    SupportedCurrencies?: SupportedCurrency[];
    Name: string;
    Version: number;
    Description: string;
}
interface ISpecificationResponse {
    BasicFields:BasicFields[],
    Services: Services[]
}
export class SpecificationsResponse implements ISpecificationResponse {
    BasicFields: BasicFields[];
    Services: Services[];
    constructor(data: ISpecificationResponse) {
        this.BasicFields = data.BasicFields
        this.Services = data.Services
    }
}
export class SpecificationResponse implements Services {
    Actions?: Action[];
    Description: string;
    Name: string;
    SupportedCurrencies?: SupportedCurrency[];
    Version: number;
    constructor(data: Services) {
        this.Actions = data.Actions
        this.Description = data.Description
        this.Name = data.Name
        this.SupportedCurrencies = data.SupportedCurrencies
        this.Version = data.Version
    }
    getActionRequestParameters(actionName: string): RequestParameter[] | undefined {

        actionName = firstUpperCase(actionName)
        return this.Actions?.find(action => action.Name === actionName)?.RequestParameters
            .sort((a, b) => a.Name.localeCompare(b.Name))
            .sort((a, b) => a.Group.localeCompare(b.Group))
    }

}
