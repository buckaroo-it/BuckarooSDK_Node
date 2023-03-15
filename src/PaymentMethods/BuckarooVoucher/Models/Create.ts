import {ITransaction} from "../../../Models/ITransaction";

export interface ICreate extends ITransaction{
    groupReference?: string
    /**
     * 1 = Single
     * 2 = Multiple
     */
    usageType: 1 | 2
    validFrom: Date
    validUntil?:Date
    creationBalance:Number
}

export const handleDate = (data) => {
    for (const payloadKey in data) {
        if (data[payloadKey] instanceof Date) {
            data[payloadKey] =
                data[payloadKey].getFullYear() + '-' +
                (data[payloadKey].getMonth() + 1) + '-' +
                data[payloadKey].getDate()
        }
    }
    return data
}