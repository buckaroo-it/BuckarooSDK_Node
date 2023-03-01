import { serviceParameterKeyOf } from '../Utils/Functions'

export interface IParameter {
    Name:string
    Value: any
    GroupType?: string
    GroupID?: string | number
}

export class ParameterList {

    private _parameterList: IParameter[] = []

    get parameterList(): IParameter[] {
        return this._parameterList;
    }
    setUpParameters (serviceModel, groupType: string = '', groupID: number | string = '') {
        for (const paramKey in serviceModel) {
            if (typeof serviceModel[paramKey] === 'object') {
                this.setUpParameters(serviceModel[paramKey],
                    serviceModel[paramKey].groupType?.() || groupType,
                    serviceModel[paramKey].groupID?.(paramKey) || groupID)

            } else if( typeof serviceModel[paramKey] !== 'undefined' && typeof serviceModel[paramKey] !== 'function') {
                this.setParamFormat(
                    paramKey,
                    serviceModel[paramKey],
                    groupType,
                    groupID
                )
            }
        }
    }

    setParamFormat (name, value, groupType, groupID) {

        this._parameterList.push({
            Name: serviceParameterKeyOf(name),
            Value: value,
            GroupType: groupType,
            GroupID: groupID
        })
    }

    addParameterList (pay) {
        this.setUpParameters(pay)
        return this._parameterList
    }
}
