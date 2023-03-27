import * as IPAddress from 'ip-address'

export class IPProtocolVersion {
    public static readonly IPV4: number = 0
    public static readonly IPV6: number = 1

    public static getVersion(ipAddress: string = '0.0.0.0'): number {
        if (IPAddress.Address4.isValid(ipAddress)) {
            return IPProtocolVersion.IPV4
        }
        if (IPAddress.Address6.isValid(ipAddress)) {
            return IPProtocolVersion.IPV6
        }
        throw new Error(`Invalid IP address: ${ipAddress}`)

    }
}
