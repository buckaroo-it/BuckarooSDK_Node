import { AxiosRequestConfig } from 'axios';

export type RequestHeaders = {
    'Content-Type'?: string;
    Accept?: string;
    Culture?: string;
    Authorization?: string;
    Software?: string;
    Channel?: string;
    [header: string]: any;
};

export interface RequestConfig extends AxiosRequestConfig {
    headers?: RequestHeaders;
}

export default class Headers {
    private _headers: RequestHeaders = this.getDefaultHeaders();
    get headers(): RequestHeaders {
        return this._headers;
    }

    setSoftwareHeader(
        value: {
            platformName?: string;
            platformVersion?: string;
            moduleSupplier?: string;
            moduleName?: string;
            moduleVersion?: string;
        } = {}
    ): this {
        this._headers.Software = JSON.stringify({
            PlatformName: value.platformName || 'Node SDK',
            PlatformVersion: value.platformVersion || '1.0',
            ModuleSupplier: value.moduleSupplier || 'Buckaroo',
            ModuleName: value.moduleName || 'BuckarooPayments',
            ModuleVersion: value.moduleVersion || '1.0',
        });
        return this;
    }

    setHeaders(headers: RequestHeaders) {
        Object.keys(headers).forEach((key) => {
            this._headers[key] = headers[key];
        });
        return this;
    }

    removeHeaders(headers: RequestHeaders) {
        Object.keys(headers).forEach((key) => {
            delete this._headers[key];
        });
        return this;
    }

    protected getDefaultHeaders(): RequestHeaders {
        return {
            'Content-type': 'application/json; charset=utf-8',
            Accept: 'application/json',
            Culture: 'nl-NL',
            Authorization: '',
            Channel: 'Web',
            Software: JSON.stringify({
                PlatformName: 'Node SDK',
                PlatformVersion: '1.0',
                ModuleSupplier: 'Buckaroo',
                ModuleName: 'BuckarooPayments',
                ModuleVersion: '1.0',
            }),
        };
    }
}
