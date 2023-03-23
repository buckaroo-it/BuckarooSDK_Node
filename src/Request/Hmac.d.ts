import HttpMethods from '../Constants/HttpMethods';
declare const hmacHeader: (method: HttpMethods, url?: string, data?: string | object) => string;
export default hmacHeader;
