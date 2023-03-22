import { IParameter } from './Parameters'

export declare interface IServices {
    ServiceList: IServiceList[]
}
export declare interface IServiceList {
    name?: string
    action?: string
    version?: number
    parameters?: Array<IParameter>
}
