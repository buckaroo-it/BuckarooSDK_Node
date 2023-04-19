import { IParameter } from './Parameters'

export declare interface IServices {
    ServiceList: IServiceList[]
}
export declare interface IServiceList {
    Name?: string
    Action?: string
    Version?: number
    Parameters?: Array<IParameter>
}
