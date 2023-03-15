import {ServiceParameters} from "../Utils/ServiceParameter";

export type Adapters = {
    keys?:{[key:string]:string},
    groupType?:string,
    groupId?:boolean | string | number
}
const handleModelAdapters = (model:ServiceParameters,adapters:Adapters) => {
    if (adapters.keys)
        model.setKeys(adapters.keys)
    if (adapters.groupType)
        model.groupType = adapters.groupType
    switch (typeof adapters.groupId) {
        case "undefined":
            break
        case "boolean":
            model.makeCountable()
            break;
        default:
            console.log(typeof adapters.groupId)
            model.setGroupId(<string>adapters.groupId)
    }
}
export function ServiceModel(model,adapters?:Adapters):ServiceParameters {
    model = new ServiceParameters(model)
    if (adapters){
        handleModelAdapters(model,adapters)
    }
    return model
}