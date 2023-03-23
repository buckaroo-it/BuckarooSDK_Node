import HttpMethods from '../Constants/HttpMethods';
import headers from './Headers';
type Options = {
    hostname: string;
    path: string;
    method: HttpMethods;
    headers: ReturnType<typeof headers.getHeaders>;
    data?: any;
};
declare const httpsCall: (options: Options) => Promise<any>;
export default httpsCall;
