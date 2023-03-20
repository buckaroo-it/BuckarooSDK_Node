import { Payload} from "../../../Models/ITransaction";

export interface IExtraInfo extends Payload{
    costumer:{
        name:string
    }
    phone:{
        mobile:string
    },
    address:{
        street:string
        street2:string
        city:string
        state:string
        country:string
        zipcode:string
    }
    noShipping?:number
    addressOverride:boolean
}

export const extraInfo = (data:IExtraInfo) => {
    return {
        name: data.costumer.name,
        street1: data.address.street,
        street2: data.address.street2,
        cityName: data.address.city,
        stateOrProvince: data.address.state,
        country: data.address.country,
        postalCode: data.address.zipcode,
        noShipping: data.noShipping,
        addressOverride: data.addressOverride,
        phone: data.phone.mobile
    }
}