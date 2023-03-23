export declare class ServiceObject {
    [parameter: string]: any;
    constructor(data: object);
    addParameter(parameters: object, classType?: typeof ServiceObject): void;
    findParameter(param: string): any | undefined;
    find(param: string): any | undefined;
    findParameterParent(param: string): this | undefined;
    setParameterKeys(keys: {
        [key: string]: string;
    }): this;
    removeParameterKeys(keys: string[]): void;
    getParametersByName(param: string, parameters?: any): this[];
}
