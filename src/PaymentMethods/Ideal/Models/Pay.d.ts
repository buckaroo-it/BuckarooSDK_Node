import { Payload } from '../../../Models/ITransaction';
import { ServiceParameterList } from "../../../Utils/ServiceParameter";
export interface IPay extends Payload {
    issuer: string;
}
export declare const Services: (data: any) => ServiceParameterList;
