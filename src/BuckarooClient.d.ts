import { IConfig, ICredentials } from './Utils/Types';
import Client from './Request/Client';
export declare const initializeBuckarooClient: (credentials?: ICredentials, config?: IConfig) => {
    _credentials: ICredentials;
    _config: IConfig;
};
export declare const buckarooClient: () => Client;
