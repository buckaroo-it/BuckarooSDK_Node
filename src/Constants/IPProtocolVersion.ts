import * as IpAddress from 'ip-address';

import { getIPAddress } from '../Utils/Functions';
export class IPProtocolVersion {
    public static readonly IPV4: number = 0;
    public static readonly IPV6: number = 1;

    public static getVersion(ipAddress: string = '0.0.0.0'): number {
        if (IpAddress.Address4.isValid(ipAddress)) {
            return IPProtocolVersion.IPV4;
        }
        if (IpAddress.Address6.isValid(ipAddress)) {
            return IPProtocolVersion.IPV6;
        }
        throw new Error(`Invalid IP address: ${ipAddress}`);
    }
}

export class ClientIP {
    type: IPProtocolVersion;
    address: string;
    constructor(ipAddress: string = getIPAddress()) {
        this.type = IPProtocolVersion.getVersion(ipAddress);
        this.address = ipAddress;
    }
}
