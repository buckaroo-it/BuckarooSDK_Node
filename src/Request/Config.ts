import { ICredentials, IConfig } from '../Utils/Types'

export default class Config {
  readonly LIVE_MODE = 'live'
  readonly TEST_MODE = 'test'
  private websiteKey: string
  private secretKey: string
  private mode: string
  private currency: string
  private returnURL: string
  private returnURLCancel: string
  private pushURL: string
  constructor (
    credentials?: ICredentials,
    config?: IConfig
  ) {
    this.websiteKey = credentials?.websiteKey || process.env.BPE_WEBSITE_KEY || 'KEY'
    this.secretKey = credentials?.secretKey || process.env.BPE_SECRET_KEY || 'SECRET'
    this.mode = config?.mode || process.env.BPE_MODE || 'test'
    this.currency = config?.currency || process.env.BPE_CURRENCY_CODE || 'EUR'
    this.returnURL = config?.returnURL || process.env.BPE_RETURN_URL || ''
    this.returnURLCancel = config?.returnURLCancel ||
        process.env.BPE_RETURN_URL_CANCEL || ''
    this.pushURL = config?.pushURL || process.env.BPE_PUSH_URL || ''
  }

  setCredentials (credentials) {
    this.websiteKey = credentials.websiteKey || this.websiteKey
    this.secretKey = credentials.secretKey || this.secretKey
  }

  setConfig (config?: IConfig) {
    this.mode = config?.mode || this.mode
    this.currency = config?.currency || this.currency
    this.returnURL = config?.returnURL || this.returnURL
    this.returnURLCancel = config?.returnURLCancel ||
        this.returnURLCancel
    this.pushURL = config?.pushURL || this.pushURL
  }

  public getWebsiteKey (): string {
    return this.websiteKey
  }

  public getSecretKey (): string {
    return this.secretKey
  }

  public isLiveMode (): boolean {
    return this.mode === this.LIVE_MODE
  }

  public getCurrency (): string {
    return this.currency
  }

  public getReturnURL (): string {
    return this.returnURL
  }

  public getReturnURLCancel (): string {
    return this.returnURLCancel
  }

  public getPushURL (): string {
    return this.pushURL
  }
}
