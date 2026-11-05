export interface BuckarooErrorDetails {
    httpStatus?: number;
    body?: unknown;
    headers?: Record<string, unknown>;
    cause?: unknown;
}

// Declared through interface merging so unset details do not become own properties.
export interface BuckarooError {
    readonly httpStatus?: number;
    readonly body?: unknown;
    readonly headers?: Record<string, unknown>;
    readonly cause?: unknown;
}

export class BuckarooError extends Error {
    name = 'BuckarooError';

    constructor(message: string, { cause, ...details }: BuckarooErrorDetails = {}) {
        super(message);
        Object.assign(this, details);
        if (cause !== undefined) {
            // Non-enumerable like a native cause, so serializing the error leaves out the request config.
            Object.defineProperty(this, 'cause', { value: cause, writable: true, configurable: true });
        }
    }
}

export class AuthenticationError extends BuckarooError {
    name = 'AuthenticationError';
}

export interface ParameterValidationError {
    readonly parameterName?: string;
}

export class ParameterValidationError extends BuckarooError {
    name = 'ParameterValidationError';

    constructor(message: string, details: BuckarooErrorDetails & { parameterName?: string } = {}) {
        super(message, details);
    }
}

export class BuckarooApiError extends BuckarooError {
    name = 'BuckarooApiError';
}
