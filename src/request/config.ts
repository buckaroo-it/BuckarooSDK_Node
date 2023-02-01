export default class Config {
  readonly LIVE_MODE = "live";
  readonly TEST_MODE = "test";
  readonly nonUpdatableKeys = ["websiteKey", "secretKey"];

  private websiteKey: string;
  private secretKey: string;
  private mode: string;
  private currency: string;
  private returnURL: string;
  private returnURLCancel: string;
  private pushURL: string;
  constructor(
    websiteKey?: string,
    secretKey?: string,
    currency?: string,
    returnURL?: string,
    returnURLCancel?: string,
    pushURL?: string
  ) {
    this.websiteKey = websiteKey || process.env.BPE_WEBSITE_KEY || "KEY";

    this.secretKey = secretKey || process.env.BPE_SECRET_KEY || "SECRET";

    this.mode = process.env.BPE_MODE || "test";
    this.currency = process.env.BPE_CURRENCY_CODE || currency || "EUR";
    this.returnURL = process.env.BPE_RETURN_URL || returnURL || "";
    this.returnURLCancel =
      process.env.BPE_RETURN_URL_CANCEL || returnURLCancel || "";
    this.pushURL = process.env.BPE_PUSH_URL || pushURL || "";
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
}
