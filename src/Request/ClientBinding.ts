import Buckaroo from '../buckaroo';
import type { ICredentials } from '../Utils/Types';

// Keep ownership out of consumer subclasses and serialized request data.
const bindings = new WeakMap<object, { client?: Buckaroo; credentials?: ICredentials }>();

export function bindClient<T extends object>(
    target: T,
    client: Buckaroo | undefined = Buckaroo.Client,
    credentials?: ICredentials
): T {
    bindings.set(target, { client, credentials });
    return target;
}

export function clientFor(target: object): Buckaroo {
    const binding = bindings.get(target);
    const client = binding?.client ?? Buckaroo.Client;
    if (!client) throw new Error('Initialize a Buckaroo client before using this operation.');
    if (!binding?.client) bindClient(target, client, binding?.credentials);
    return client;
}

export function credentialsFor(target: object): ICredentials {
    return bindings.get(target)?.credentials ?? clientFor(target).credentials;
}
