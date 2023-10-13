import { Model } from './Model';
import { Str } from '../Utils/Functions';

export interface IParameter {
    name: string;
    value: string | number | boolean;
    groupType?: string;
    groupID?: number;
}

export class Parameter extends Model implements IParameter {
    set name(value: string) {
        this.set('name', Str.ucfirst(value));
    }

    set value(value: ParameterTypes) {
        this.set('value', value);
    }

    set groupType(value: string) {
        this.set('groupType', value);
    }

    set groupID(value: number) {
        this.set('groupID', value);
    }
}

export type ParameterTypes = string | number | boolean;

export declare type IAdditionalParameters = {
    [name: string]: ParameterTypes;
};
export declare type ServiceParameterTypes = ParameterTypes | ParameterTypes[] | IServiceParameters;

export declare interface IServiceParameters {
    [name: keyof any]: ServiceParameterTypes | undefined;
}

export type IFormattedParameter = {
    name: string;
    value: string | number | boolean;
};
