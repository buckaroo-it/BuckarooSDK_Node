import { IParameter } from '../Models/Parameters';
import { ServiceObject } from '../Models/ServiceObject';
export declare class ServiceParameters extends ServiceObject {
    addParameter(value: object): void;
    private _groupId?;
    private _groupType?;
    set groupType(value: string);
    private set groupId(value);
    get groupType(): string;
    private get groupId();
    setGroupType(type: string, key?: string): ServiceParameters;
    setGroupId(id: string, key?: string): any;
    setMultipleGroupType(groupTypes: {
        [key: string]: string;
    }): void;
    makeCountable(param?: string): this;
    static toServiceParameterList(services: object | ServiceParameters, parameters?: IParameter[], groupType?: string, groupId?: groupIdType): IParameter[];
    findParameter(param: string): ServiceParameters | undefined;
}
type groupIdType = string | number | Generator;
export {};
