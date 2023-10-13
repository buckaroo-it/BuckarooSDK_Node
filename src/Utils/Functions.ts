import { IAdditionalParameters, IFormattedParameter, IParameter, IServiceParameters, ServiceParameterTypes } from '../Models/IParameters';

export function uniqid(prefix: string = '', random: boolean = false) {
    const sec = Date.now() * 1000 + Math.random() * 1000;
    const id = sec.toString(16).replace(/\./g, '').padEnd(14, '0');
    return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}` : ''}`;
}
export class Str {
    private static replace(search: string[], replace: string, subject: string): string {
        let result: string = subject;
        for (let value of search) {
            result = result.split(value).join(replace);
        }
        return result;
    }
    public static ucfirst(value: string): string {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
    public static lcfirst(value: string): string {
        return value.charAt(0).toLowerCase() + value.slice(1);
    }
    public static ciEquals(a: string, b: string) {
        return a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0;
    }
}
export abstract class DataFormatter {
    static parametersMap(parameters: IAdditionalParameters, index1 = 'Name', index2 = 'Value'): IFormattedParameter[] {
        return Object.keys(parameters).map((key) => {
            return {
                [index1]: Str.ucfirst(key),
                [index2]: parameters[key],
            };
        }) as any;
    }
    static serviceParametersMap(
        parameters: IServiceParameters | ServiceParameterTypes | undefined,
        groups: { [key: string]: string } = {},
        countable: string[] = [],
        parameter: IParameter = { name: '', value: '' },
        parametersArray: IParameter[] = []
    ): IParameter[] {
        if (groups[parameter.name]) {
            parameter.groupType = Str.ucfirst(groups[parameter.name]);
        }
        if (parameters instanceof Array) {
            parameters.forEach((element) => {
                if (countable.includes(parameter.name)) {
                    parameter.groupID = (parameter.groupID || 0) + 1;
                }
                this.serviceParametersMap(element, groups, countable, { ...parameter }, parametersArray);
            });
        } else if (typeof parameters === 'object') {
            for (const key of Object.keys(parameters)) {
                this.serviceParametersMap(parameters[key], groups, countable, { ...parameter, name: key }, parametersArray);
            }
        } else if (parameters !== undefined) {
            parametersArray.push({ ...parameter, value: parameters });
        }
        return parametersArray;
    }

    static parametersReverseMap(parameter: IFormattedParameter[] = []): IAdditionalParameters {
        return parameter.reduce((total, currentValue) => {
            return { ...total, [Str.lcfirst(currentValue.name)]: currentValue.value };
        }, {});
    }
}
export function getIPAddress() {
    const interfaces = require('os').networkInterfaces();
    for (const devName in interfaces) {
        let iface = interfaces[devName];

        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) return alias.address;
        }
    }
    return '0.0.0.0';
}
