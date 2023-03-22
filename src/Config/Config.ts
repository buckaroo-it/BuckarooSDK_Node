import { DefaultLogger } from '../Handlers/Logging/DefaultLogger';

export abstract class Config {
    readonly LIVE_MODE = 'live';
    readonly TEST_MODE = 'test';
    readonly nonUpdatableKeys = ['websiteKey', 'secretKey'];

    private websiteKey: string;
    private secretKey: string;
    private mode: string;
    private currency: string;
    private returnURL: string;
    private returnURLCancel: string;
    private pushURL: string;
    protected logger: DefaultLogger | undefined;

    constructor(
        websiteKey: string,
        secretKey: string,
        mode?: string,
        currency?: string,
        returnURL?: string,
        returnURLCancel?: string,
        pushURL?: string,
        logger?: DefaultLogger
    ) {
        this.websiteKey = websiteKey;
        this.secretKey = secretKey;

        this.mode = process.env.BPE_MODE || mode || 'test';
        this.currency = process.env.BPE_CURRENCY_CODE || currency || 'EUR';
        this.returnURL = process.env.BPE_RETURN_URL || returnURL || '';
        this.returnURLCancel = process.env.BPE_RETURN_URL_CANCEL || returnURLCancel || '';
        this.pushURL = process.env.BPE_PUSH_URL || pushURL || '';

        this.setLogger(logger || new DefaultLogger());
    }

    public getWebsiteKey(): string {
        return this.websiteKey;
    }

    public getSecretKey(): string {
        return this.secretKey;
    }

    public isLiveMode(): boolean {
        return this.mode === this.LIVE_MODE;
    }

    public getMode(mode?: string): string {
        if (mode && [this.LIVE_MODE, this.TEST_MODE].includes(mode)) {
            this.mode = mode;
        }

        return this.mode;
    }

    public getCurrency(): string {
        return this.currency;
    }

    public getReturnURL(): string {
        return this.returnURL;
    }

    public getReturnURLCancel(): string {
        return this.returnURLCancel;
    }

    public getPushURL(): string {
        return this.pushURL;
    }

    public merge(payload: object) {
        payload = this.filterNonUpdatableKeys(payload);
        for (const key in payload) {
            if (payload.hasOwnProperty(key)) {
                this[key] = payload[key];
            }
        }
        return this;
    }

    private filterNonUpdatableKeys(payload: object): object {
        return Object.keys(payload)
            .filter((key) => !this.nonUpdatableKeys.includes(key))
            .reduce((filtered, key) => {
                filtered[key] = payload[key];
                return filtered;
            }, {});
    }

    public get(properties: string[]) {
        const values = {};

        properties.forEach((property: string) => {
            if (typeof this[property] === 'function') {
                values[property] = this[property]();
            }
        });

        return values;
    }

    public setLogger(logger: DefaultLogger) {
        this.logger = logger;
        return this;
    }

    public getLogger(): DefaultLogger | undefined {
        return this.logger;
    }
}
