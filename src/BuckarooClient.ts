import { IConfig, ICredentials } from './Utils/Types'
import dotenv from 'dotenv'
dotenv.config()

let _credentials: ICredentials

let _config: IConfig

export const initializeBuckarooClient = (credentials?: ICredentials, config?: IConfig) => {
    if(credentials) {
        _credentials = credentials
    }
    if(config) {
        _config = config
    }
    let defaultSetup = () => {
        _credentials = {
            websiteKey: process.env.BPE_WEBSITE_KEY || 'KEY',
            secretKey: process.env.BPE_SECRET_KEY || 'SECRET'
        }
        _config = {
            mode: process.env.BPE_MODE === 'live' ? "live" : 'test',
            currency: process.env.BPE_CURRENCY_CODE || 'EUR',
            returnURL: process.env.BPE_RETURN_URL || '',
            returnURLCancel: process.env.BPE_RETURN_URL_CANCEL || '',
            pushURL: process.env.BPE_PUSH_URL || ''
        }
    }
    return {
        _credentials,
        _config,
        defaultSetup
    }
}

export const buckarooClient = () => {
    const getCredentials = (): ICredentials => {
        return _credentials
    }
    const getConfig = (): IConfig => {
        return _config
    }
    return {
        getCredentials,
        getConfig
    }
}