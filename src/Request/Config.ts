import { ICredentials, IConfig } from '../Utils/Types'

export class Config {
  readonly LIVE_MODE = 'live'
  readonly TEST_MODE = 'test'
  private websiteKey: string
  private secretKey: string
  private mode: string
  private currency: string
  private returnURL: string
  private returnURLCancel: string
  private pushURL: string
  constructor () {
    this.websiteKey = 'KEY'
    this.secretKey = 'SECRET'
    this.mode = 'test'
    this.currency = 'EUR'
    this.returnURL =  ''
    this.returnURLCancel = ''
    this.pushURL = ''
  }

  setCredentials (credentials?:ICredentials) {
    this.websiteKey = credentials?.websiteKey || process.env.BPE_WEBSITE_KEY || this.websiteKey
    this.secretKey = credentials?.secretKey || process.env.BPE_SECRET_KEY || this.secretKey
  }

  setConfig (config?: IConfig) {
    this.mode = config?.mode ||  this.mode
    this.currency = config?.currency || this.currency
    this.returnURL = config?.returnURL || process.env.BPE_RETURN_URL || this.returnURL
    this.returnURLCancel = config?.returnURLCancel || process.env.BPE_RETURN_URL_CANCEL ||
        this.returnURLCancel
    this.pushURL = config?.pushURL || process.env.BPE_PUSH_URL ||  this.pushURL
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